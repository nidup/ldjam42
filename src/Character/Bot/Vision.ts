
import {Street} from "../../Game/Street";

export class Vision
{
    private scope: number = 300;
    private bot: Phaser.Sprite;
    private street: Street;

    constructor(host: Phaser.Sprite, street: Street)
    {
        this.bot = host;
        this.street = street;
    }

    playerIsCloseAndAggressive(): boolean
    {
        return this.street.player().isAggressive() && this.playerIsClose();
    }

    playerIsClose(): boolean
    {
        const player = this.street.player();

        return Phaser.Math.distance(player.x, player.y, this.bot.x, this.bot.y) < this.scope;
    }

    playerIsCloseAndAlive(): boolean
    {
        const player = this.street.player();

        return !player.isDead() && Phaser.Math.distance(player.x, player.y, this.bot.x, this.bot.y) < this.scope;
    }

    playerIsCloseAndAliveAndAggressive(): boolean
    {
        return this.street.player().isAggressive() && this.playerIsCloseAndAlive();
    }

}
