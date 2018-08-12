import {BLINKCOLOR, MetalMovement} from "./MetalMovement";

export class Exit extends MetalMovement {

    public start(graphics: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.drawRect(100, 350, 70, 150);
    }

    isIn(position: Phaser.Point) {
        return position.x > 100 && position.x < 100 + 70 && position.y > 350 && position.y < 350+150;
    }
}
