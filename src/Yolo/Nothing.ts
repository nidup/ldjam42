import {BLINKCOLOR, BLINKINCOLOR, MetalMovement} from "./MetalMovement";

export class Nothing extends MetalMovement {

    public start(graphics: Phaser.Graphics, graphicsIn: Phaser.Graphics) {
        graphics.beginFill(BLINKCOLOR);
        graphics.lineStyle(5, BLINKCOLOR);
        graphics.drawRect(840, 350, 70, 150);

        graphicsIn.beginFill(BLINKINCOLOR);
        graphics.lineStyle(5, BLINKINCOLOR);
        graphicsIn.drawRect(840, 350, 70, 150);
    }

    isIn(position: Phaser.Point) {
        return position.x > 840 && position.x < 840 + 70 && (position.y + 10) > 350 && (position.y + 10) < 350+150;
    }
}
