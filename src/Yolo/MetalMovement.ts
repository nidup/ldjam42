export const BLINKCOLOR = 0x3333FF;
export const BLINKINCOLOR = 0x05FE73;

export abstract class MetalMovement {
    abstract start(graphics: Phaser.Graphics, graphicsIn: Phaser.Graphics);
    abstract isIn(position: Phaser.Point);
}
