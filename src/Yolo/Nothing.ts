import {BLINKCOLOR, MetalMovement} from "./MetalMovement";

export class Nothing extends MetalMovement {
    public start(graphics: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.drawRect(840, 350, 70, 150);
    }
}
