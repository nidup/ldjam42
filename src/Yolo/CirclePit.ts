import {Citizens} from "../Character/Bot/Citizens";
import {Citizen} from "../Character/Bot/Citizen";

export class CirclePit {
    private citizens: Citizen[];
    private center: PIXI.Point;
    private radiusMin: number;
    private radiusMax: number;
    private time: number;
    private game: Phaser.Game;

    constructor(game: Phaser.Game, citizens: Citizens) {
        this.game = game;
        this.center = new PIXI.Point(700, 400);
        this.radiusMin = 100;
        this.radiusMax = 200;
        this.citizens = citizens.all().filter((citizen: Citizen) => {
            const dist = Phaser.Math.distance(this.center.x, this.center.y, citizen.x, citizen.y);
            return dist > this.radiusMin && dist < this.radiusMax;
        });

        this.time = 20 * Phaser.Timer.SECOND;
    }

    public start() {
        this.citizens.forEach((citizen) => {
            citizen.setCirclePitCenter(this.center);
        });

        this.citizens.forEach((citizen) => {
            this.game.time.events.add(this.time * Math.random(), () => {
                citizen.setCirclePitCenter(null);
            });
        });
    }
}
