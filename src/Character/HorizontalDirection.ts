
export class HorizontalDirection
{
    private body: Phaser.Physics.Arcade.Body;
    public static LEFT: number = -1;
    public static RIGHT: number = 1;

    constructor(body: Phaser.Physics.Arcade.Body)
    {
        this.body = body;
    }

    public direction(): number
    {
        return this.body.facing == 2 ? HorizontalDirection.LEFT : HorizontalDirection.RIGHT;
    }
}
