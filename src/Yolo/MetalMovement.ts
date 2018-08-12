export const BLINKCOLOR = 0x3333FF;

export abstract class MetalMovement {
    abstract start(graphics: Phaser.Graphics);
    abstract isIn(position: Phaser.Point);
}
