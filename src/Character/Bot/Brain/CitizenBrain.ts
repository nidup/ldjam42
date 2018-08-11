
import {StackFSM} from "./FSM/StackFSM";
import {State} from "./FSM/State";
import {Citizen} from "../Citizen";
import {Street} from "../../../Game/Street";
import {PickableItem} from "../../Player/PickableItem";
import {Energy} from "../Energy";
import {Steering} from "../Steering";
import {Vision} from "../Vision";
import {FearStatus} from "../FearStatus";

export class CitizenBrain
{
    private host: Citizen;
    private fsm: StackFSM;
    private street: Street;
    private group: Phaser.Group;
    private energy: Energy;
    private steering: Steering;
    private vision: Vision;
    private fearStatus: FearStatus;

    public constructor(citizen: Citizen, street: Street, group: Phaser.Group, fearStatus: FearStatus)
    {
        this.fsm = new StackFSM();
        this.host = citizen;
        this.street = street;
        this.group = group;
        this.energy = new Energy(this.host.game.rnd);
        this.steering = new Steering(this.host.game.rnd, this.host);
        this.vision = new Vision(this.host, this.street);
        this.fearStatus = fearStatus;
        this.toWalk();
    }

    public think()
    {
        this.fsm.update();
    }

    private toWalk()
    {
        this.host.walk();
        this.fsm.pushState(new State('walk', this.walk));
    }

    public walk = () =>
    {
        this.energy.decrease();

        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAggressive()) {
            this.toFlee();

        } else if (this.energy.empty()) {
            this.toRest();

        } else {
            if (this.steering.blockedToTheLeft()) {
                this.steering.walkToTheRight();
            }
            if (this.steering.blockedToTheRight()) {
                this.steering.walkToTheLeft();
            }
        }
    }

    private toFlee()
    {
        this.steering.runFromTheSprite(this.street.player());
        this.fearStatus.frighten();
        this.host.run();
        this.fsm.pushState(new State('flee', this.flee));
    }

    private toRest()
    {
        this.steering.stop();
        this.host.rest();
        this.fsm.pushState(new State('resting', this.resting));
    }

    private toDie()
    {
        this.steering.stop();
        this.host.die();
        this.fsm.pushState(new State('dying', this.dying));
    }

    public resting = () =>
    {
        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAggressive()) {
            this.toFlee();

        } else {
            this.energy.increase();
            if (this.energy.minimalAmountToMoveIsReached()) {
                this.fromRestToWalk();
            }
        }
    }

    private fromRestToWalk()
    {
        this.energy.resetWithRandomAmount();
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }

    public flee = () =>
    {
        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsClose()) {

            if (this.steering.blockedToTheLeft()) {
                this.steering.runToTheRight();
            }
            if (this.steering.blockedToTheRight()) {
                this.steering.runToTheLeft();
            }

        } else {
            this.fromFleeToWalk();
        }
    }

    private fromFleeToWalk()
    {
        this.steering.walkToARandomDirection();
        this.fearStatus.reassure();
        this.host.walk();
        this.fsm.popState();
    }

    public dying = () =>
    {
    }

    public currentStateName(): string
    {
        return this.fsm.getCurrentState().getName();
    }
}
