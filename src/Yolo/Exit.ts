import {BLINKCOLOR, MetalMovement} from "./MetalMovement";
import {Citizens} from "../Character/Bot/Citizens";

export class Exit extends MetalMovement {

    private citizens: Citizens;
    private player;

    constructor(citizens: Citizens, player) {
        super();
        this.citizens = citizens;
        this.player = player;
    }

    public start(graphics: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.drawRect(100, 300, 70, 150);
        this.citizens.all().forEach(citizen => citizen.exit(this));
        this.player.exit(this);
    }

    isIn(position: Phaser.Point) {
        return position.x > 100 && position.x < 100 + 70 && position.y > 300 && position.y < 300+150;
    }
}
