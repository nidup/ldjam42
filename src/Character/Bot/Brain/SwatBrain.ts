
import {Street} from "../../../Game/Street";
import {PickableItem} from "../../Player/PickableItem";
import {BaseGun} from "../../../Weapon/BaseGun";
import {StackFSM} from "./FSM/StackFSM";
import {State} from "./FSM/State";
import {Swat} from "../Swat";
import {Energy} from "../Energy";
import {Steering} from "../Steering";
import {Vision} from "../Vision";
import {Brain} from "./Brain";

export class SwatBrain implements Brain
{
    private host: Swat;
    private fsm: StackFSM;
    private gun: BaseGun;
    private street: Street;
    private group: Phaser.Group;
    private energy: Energy;
    private steering: Steering;
    private vision: Vision;

    public constructor(swat: Swat, gun: BaseGun, street: Street, group: Phaser.Group)
    {
        this.fsm = new StackFSM();
        this.host = swat;
        this.gun = gun;
        this.street = street;
        this.group = group;
        this.energy = new Energy(this.host.game.rnd);
        this.steering = new Steering(this.host.game.rnd, this.host, this.gun);
        this.vision = new Vision(this.host, this.street);
        this.toPatrol();
    }

    public think()
    {
        this.fsm.update();
    }

    private toPatrol()
    {
        this.host.walk();
        this.fsm.pushState(new State('patrol', this.patrol));
    }

    public patrol = () =>
    {
        this.energy.decrease();

        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
            this.toAttack();

        } else if (this.energy.empty()) {
            this.toRest();

        } else {
            if (this.steering.blockedToTheLeft()) {
                this.steering.walkToTheRight();
            } else if (this.steering.blockedToTheRight()) {
                this.steering.walkToTheLeft();
            }
        }
    }

    private toDie()
    {
        this.steering.stop();
        this.host.die();
        this.fsm.pushState(new State('dying', this.dying));
    }

    private toRest()
    {
        this.steering.stop();
        this.host.rest();
        this.fsm.pushState(new State('resting', this.resting));
    }

    private toAttack()
    {
        this.fsm.pushState(new State('attack', this.attack));
    }

    public resting = () =>
    {
        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAliveAndAggressive()) {
            this.toAttack();

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

    public attack = () =>
    {
        if (this.host.health <= 0) {
            this.toDie();

        } else if (this.vision.playerIsCloseAndAlive()) {
            this.steering.stopAndTurnToTheSprite(this.street.player());
            this.host.shot();
            this.gun.fire();

        } else {
            this.fromAttackToWalk();
        }
    }

    private fromAttackToWalk()
    {
        this.steering.walkToARandomDirection();
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
