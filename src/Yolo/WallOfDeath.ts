import {Citizen} from "../Character/Bot/Citizen";
import {Citizens} from "../Character/Bot/Citizens";

export class WallOfDeath {
    private game: Phaser.Game;
    private citizenTop: Citizen[];
    private citizenBottom: Citizen[];
    private left: number;
    private right: number;
    private height: number;
    private waitDuration: number;
    private fightDuration: number;

    constructor(game: Phaser.Game, citizens: Citizens, waitDuration: number, fightDuration: number, length: number, height: number) {
        this.game = game;
        this.right = 830;
        this.left = 830 - length;
        this.height = height;
        this.waitDuration = waitDuration;
        this.fightDuration = fightDuration;
        const middle = 400;
        const gap = 20;
        this.citizenTop = citizens.all().filter((citizen: Citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y < middle - gap && citizen.y > (middle - this.height);
        });
        this.citizenBottom = citizens.all().filter((citizen: Citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y > middle + gap && citizen.y < (middle + this.height);
        });
    }

    public start() {
        this.citizenTop.forEach((citizen: Citizen) => {
            citizen.goTopForWallOfDeath(this.height);
        });
        this.citizenBottom.forEach((citizen: Citizen) => {
            citizen.goBottomForWallOfDeath(this.height);
        });

        this.game.time.events.add(this.waitDuration, () => {
            this.citizenTop.forEach((citizen) => {
                citizen.fight();
            });
            this.citizenBottom.forEach((citizen) => {
                citizen.fight();
            });

            this.citizenTop.forEach((citizen) => {
                this.game.time.events.add(this.fightDuration / 2 + this.fightDuration / 2 * Math.random(), () => {
                    citizen.stopFight();
                });
            });
            this.citizenBottom.forEach((citizen) => {
                this.game.time.events.add(this.fightDuration / 2 + this.fightDuration / 2 * Math.random(), () => {
                    citizen.stopFight();
                });
            });
        });
    }
}
