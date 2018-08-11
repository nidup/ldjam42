import {Citizen} from "../Character/Bot/Citizen";
import {Citizens} from "../Character/Bot/Citizens";

export class WallOfDeath {
    private game: Phaser.Game;
    private citizenTop: Citizen[];
    private citizenBottom: Citizen[];
    private left: number;
    private right: number;
    private height: number;
    
    constructor(game: Phaser.Game, citizens: Citizens) {
        this.game = game;
        this.left = 300;
        this.right = 800;
        this.height = 300;
        const middle = 400;
        this.citizenTop = citizens.all().filter((citizen: Citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y < middle && citizen.y > (middle - this.height);
        });
        this.citizenBottom = citizens.all().filter((citizen: Citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y > middle && citizen.y < (middle + this.height);
        });
    }

    public start() {
        this.citizenTop.forEach((citizen: Citizen) => {
            citizen.goTopForWallOfDeath(this.height);
        });
        this.citizenBottom.forEach((citizen: Citizen) => {
            citizen.goBottomForWallOfDeath(this.height);
        });

        this.game.time.events.add(10 * Phaser.Timer.SECOND, () => {
            this.citizenTop.forEach((citizen) => {
                citizen.fight();
            });
            this.citizenBottom.forEach((citizen) => {
                citizen.fight();
            });
        });

        this.game.time.events.add(20 * Phaser.Timer.SECOND, () => {
            this.citizenTop.forEach((citizen) => {
                citizen.stopFight();
            });
            this.citizenBottom.forEach((citizen) => {
                citizen.stopFight();
            });
        });
    }
}
