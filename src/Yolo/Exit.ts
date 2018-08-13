import {BLINKCOLOR, BLINKINCOLOR, MetalMovement} from "./MetalMovement";
import {Citizens} from "../Character/Bot/Citizens";

export class Exit extends MetalMovement {

    private citizens: Citizens;
    private player;

    constructor(citizens: Citizens, player) {
        super();
        this.citizens = citizens;
        this.player = player;
    }

    public start(graphics: Phaser.Graphics, graphicsIn: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.lineStyle(5, BLINKCOLOR);
        graphics.drawRect(0, 300, 70, 150);

        graphicsIn.beginFill(BLINKINCOLOR);
        graphics.lineStyle(5, BLINKINCOLOR);
        graphicsIn.drawRect(0, 300, 70, 150);

        this.citizens.all().forEach(citizen => citizen.exit(this));
        this.player.exit(this);
    }

    isIn(position: Phaser.Point) {
        return position.x > 0 && position.x < 0 + 70 && (position.y + 10) > 300 && (position.y + 10) < 300+150;
    }
}
