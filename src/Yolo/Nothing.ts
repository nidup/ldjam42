import {BLINKCOLOR, MetalMovement} from "./MetalMovement";

export class Nothing extends MetalMovement {

    public start(graphics: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.drawRect(840, 350, 70, 150);
    }

    isIn(position: Phaser.Point) {
        return position.x > 840 && position.x < 840 + 70 && (position.y + 10) > 350 && (position.y + 10) < 350+150;
    }
}
