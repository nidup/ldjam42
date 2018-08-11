
import {Config} from "../../Config";
import {BaseGun} from "../../Weapon/BaseGun";

export class Steering
{
    private bot: Phaser.Sprite;
    private botGun: BaseGun;
    private left = -1;
    private right = 1;
    private directionX;
    private walkSpeed: number = 50;
    private runSpeed: number = 150;
    private randomGenerator: Phaser.RandomDataGenerator;

    constructor(randomGenerator: Phaser.RandomDataGenerator, host: Phaser.Sprite, hostGun: BaseGun = null)
    {
        this.randomGenerator = randomGenerator;
        this.bot = host;
        this.botGun = hostGun;
        this.walkToARandomDirection();
    }

    blockedToTheLeft(): boolean
    {
        return (this.bot.body.blocked.left || this.bot.body.touching.left) && this.directionX === this.left;
    }

    blockedToTheRight(): boolean
    {
        return (this.bot.body.blocked.right || this.bot.body.touching.right) && this.directionX === this.right;
    }

    stop()
    {
        this.bot.body.velocity.x = 0;
        this.bot.body.velocity.y = 0;
    }

    walkToTheRight()
    {
        this.turnToTheRight();
        this.bot.body.velocity.x = this.walkSpeed;
    }

    walkToTheLeft()
    {
        this.turnToTheLeft();
        this.bot.body.velocity.x = -this.walkSpeed;
    }

    runToTheRight()
    {
        this.turnToTheRight();
        this.bot.body.velocity.x = this.runSpeed;
    }

    runToTheLeft()
    {
        this.turnToTheLeft();
        this.bot.body.velocity.x = -this.runSpeed;
    }

    walkToARandomDirection()
    {
        this.directionX = this.bot.game.rnd.sign();
        if (this.directionX === -1) {
            this.walkToTheLeft();
        } else {
            this.walkToTheRight();
        }
    }

    stopAndTurnToTheSprite(sprite: Phaser.Sprite)
    {
        this.stop();
        if (sprite.x > this.bot.x) {
            this.turnToTheRight();
        } else {
            this.turnToTheLeft();
        }
    }

    runFromTheSprite(sprite: Phaser.Sprite)
    {
        if (sprite.x < this.bot.x) {
            this.runToTheRight();
        } else {
            this.runToTheLeft();
        }
    }

    private turnToTheRight()
    {
        this.directionX = this.right;
        if (this.botGun) {
            this.botGun.turnToTheRight();
        }
        this.bot.scale.x = Config.pixelScaleRatio();
    }

    private turnToTheLeft()
    {
        this.directionX = this.left;
        if (this.botGun) {
            this.botGun.turnToTheLeft();
        }
        this.bot.scale.x = -Config.pixelScaleRatio();
    }
}
