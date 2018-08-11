
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
        this.toRest();
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
        if (this.vision.playerIsClose()) {
            this.fsm.pushState(new State('reactToProximity', this.reactToProximity));
        }
    }

    private isTooFar() {
        const distance = Phaser.Math.distance(this.host.x, this.host.y, this.host.startingPosition.x, this.host.startingPosition.y);

        return distance > 1;
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
        if (this.vision.playerIsClose()) {
            this.fsm.pushState(new State('reactToProximity', this.reactToProximity));
        }
        if (this.isTooFar()) {
            console.log('too far');
            this.steering.walk();
        }
        /*if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAggressive()) {
            this.reactToProximity();

        } else {
            this.energy.increase();
            if (this.energy.minimalAmountToMoveIsReached()) {
                this.fromRestToWalk();
            }
        }*/
    }

    private fromRestToWalk()
    {
        this.energy.resetWithRandomAmount();
        this.steering.walkToARandomDirection();
        this.host.walk();
        this.fsm.popState();
    }

    public reactToProximity = () =>
    {

        if (this.vision.playerIsClose()) {
            if (this.steering.blockedToTheLeft()) {
                this.steering.runToTheRight();
            }
            if (this.steering.blockedToTheRight()) {
                this.steering.runToTheLeft();
            }

        } else {
            this.toRest();
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
        if (this.fsm.getCurrentState()) {
            return this.fsm.getCurrentState().getName();
        }
        return null;
    }
}
