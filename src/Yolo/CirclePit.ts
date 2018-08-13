import {Citizens} from "../Character/Bot/Citizens";
import {Citizen} from "../Character/Bot/Citizen";
import {BLINKCOLOR, BLINKINCOLOR, MetalMovement} from "./MetalMovement";

export class CirclePit extends MetalMovement {
    private citizens: Citizen[];
    private center: PIXI.Point;
    private radiusMin: number;
    private radiusMax: number;
    private time: number;
    private game: Phaser.Game;

    constructor(game: Phaser.Game, citizens: Citizens, duration: number, radiusMin: number, radiusMax: number) {
        super();
        this.game = game;
        this.center = new PIXI.Point(900 - radiusMax / 2 - 130, 400);
        this.radiusMin = radiusMin;
        this.radiusMax = radiusMax;
        this.citizens = citizens.all().filter((citizen: Citizen) => {
            const dist = Phaser.Math.distance(this.center.x, this.center.y, citizen.x, citizen.y);
            return dist > this.radiusMin && dist < this.radiusMax;
        });
        this.time = duration;
    }

    public start(graphics: Phaser.Graphics, graphicsIn: Phaser.Graphics) {
        this.citizens.forEach((citizen) => {
            citizen.setCirclePitCenter(this.center);
        });

        this.citizens.forEach((citizen) => {
            this.game.time.events.add(this.time / 2 + this.time / 2 * Math.random(), () => {
                citizen.setCirclePitCenter(null);
            });
        });

        graphics.lineStyle(this.radiusMax - this.radiusMin, BLINKCOLOR);
        graphics.drawCircle(this.center.x, this.center.y, (this.radiusMin + this.radiusMax));

        graphicsIn.lineStyle(this.radiusMax - this.radiusMin, BLINKINCOLOR);
        graphicsIn.drawCircle(this.center.x, this.center.y, (this.radiusMin + this.radiusMax));
    }

    isIn(position: Phaser.Point) {
        const distFromCenter = Phaser.Math.distance(this.center.x, this.center.y, position.x, (position.y + 10));

        return distFromCenter < this.radiusMax && distFromCenter > this.radiusMin;
    }
}
