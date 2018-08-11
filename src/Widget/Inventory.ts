
import {Config} from "../Config";
import {Hero} from "../Character/Player/Hero";
import {HeroCamera} from "../Character/SFX/HeroCamera";
import {
    BaseEvent, GunPicked, MachineGunPicked, MoneyPicked,
    ShotGunPicked
} from "../Character/Player/Events";

export class Inventory extends Phaser.Sprite
{
    private player: Hero;
    private statusText: Phaser.BitmapText;
    private gunText: Phaser.BitmapText;
    private gunSprite: Phaser.Sprite;
    private shotgunText: Phaser.BitmapText;
    private shotgunSprite: Phaser.Sprite;
    private machinegunText: Phaser.BitmapText;
    private machinegunSprite: Phaser.Sprite;
    private moneyText: Phaser.BitmapText;
    private moneySprite: Phaser.Sprite;
    private cameraFX: HeroCamera;

    constructor(group: Phaser.Group, x: number, y: number, key: string, player: Hero)
    {
        super(group.game, x, y, key, 0);
        this.player = player;
        group.add(this);

        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.fixedToCamera = true;

        const statusX = this.x + 435;
        const statusY = 60;
        this.statusText = this.game.add.bitmapText(statusX, statusY, 'cowboy','0', 17);
        this.statusText.fixedToCamera = true;
        this.statusText.align = 'right';

        const fontSize = 13;
        const marginLeftAmountToImage = 80;
        const marginTopAmountToImage = 15;

        const gunX = this.x + 527;
        const gunY = 145;
        this.gunSprite = group.game.add.sprite(gunX, gunY, 'Gun', 1, group);
        this.gunSprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.gunSprite.fixedToCamera = true;
        this.gunSprite.animations.add('unselected', [0]);
        this.gunSprite.animations.add('selected', [0, 1], 1, true);
        this.gunSprite.play('selected');
        this.gunText = this.game.add.bitmapText(gunX - marginLeftAmountToImage, gunY + marginTopAmountToImage, 'carrier-command','0', fontSize);
        this.gunText.fixedToCamera = true;
        this.gunText.align = 'right';

        const shotgunX = gunX - 16;
        const shotgunY = gunY + 70;
        this.shotgunSprite = group.game.add.sprite(shotgunX, shotgunY, 'ShotGun', 1, group);
        this.shotgunSprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.shotgunSprite.fixedToCamera = true;
        this.shotgunSprite.animations.add('unselected', [0]);
        this.shotgunSprite.animations.add('selected', [0, 1], 1, true);
        this.shotgunSprite.play('unselected');
        this.shotgunText = this.game.add.bitmapText(shotgunX - marginLeftAmountToImage, shotgunY + marginTopAmountToImage, 'carrier-command','0', fontSize);
        this.shotgunText.fixedToCamera = true;
        this.shotgunText.align = 'right';

        const machinegunX = shotgunX;
        const machinegunY = shotgunY + 70;
        this.machinegunSprite = group.game.add.sprite(machinegunX, machinegunY, 'MachineGun', 1, group);
        this.machinegunSprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.machinegunSprite.fixedToCamera = true;
        this.machinegunSprite.animations.add('unselected', [0]);
        this.machinegunSprite.animations.add('selected', [0, 1], 1, true);
        this.machinegunSprite.play('unselected');
        this.machinegunText = this.game.add.bitmapText(machinegunX - marginLeftAmountToImage, machinegunY + marginTopAmountToImage, 'carrier-command','0', fontSize);
        this.machinegunText.fixedToCamera = true;
        this.machinegunText.align = 'right';

        const moneyX = machinegunX;
        const moneyY = machinegunY + 70;
        this.moneySprite = group.game.add.sprite(moneyX, moneyY, 'Money', 0, group);
        this.moneySprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.moneySprite.fixedToCamera = true;
        this.moneyText = this.game.add.bitmapText(moneyX - marginLeftAmountToImage, moneyY + marginTopAmountToImage, 'carrier-command','0', fontSize);
        this.moneyText.fixedToCamera = true;

        this.cameraFX = new HeroCamera(group.game.camera);
        player.pastGameEvents().addListener(this.collectItem, this);
    }

    public update()
    {
        if (this.player.isDead()) {
            this.statusText.setText('  Dead');
            this.cameraFX.dyingEffect();
        } else if (this.player.isAggressive()) {
            this.statusText.setText('Wanted');
            this.cameraFX.warningEffect();
        } else {
            this.statusText.setText(' Alive');
        }

        if (this.player.isEquipedWithGun()) {
            this.gunSprite.play('selected');
            this.shotgunSprite.play('unselected');
            this.machinegunSprite.play('unselected');
        } else if (this.player.isEquipedWithShotgun()) {
            this.gunSprite.play('unselected');
            this.shotgunSprite.play('selected');
            this.machinegunSprite.play('unselected');
        } else {
            this.gunSprite.play('unselected');
            this.shotgunSprite.play('unselected');
            this.machinegunSprite.play('selected');
        }

        this.moneyText.setText(this.alignText(this.player.money()));
        this.gunText.setText(this.alignText(this.player.gunAmno()));
        this.shotgunText.setText(this.alignText(this.player.shotgunAmno()));
        this.machinegunText.setText(this.alignText(this.player.machinegunAmno()));
    }

    private alignText(amount: number): string
    {
        let text = "" + amount;
        if (amount < 10) {
            text = "  " + amount;
        } else if (amount < 100) {
            text = " " + amount;
        }

        return text;
    }

    private collectItem(raisedEvent: BaseEvent, callbackContext: any): void
    {
        let itemSpriteToShake = null;
        if (raisedEvent instanceof GunPicked) {
            itemSpriteToShake = callbackContext.gunSprite;
        } else if (raisedEvent instanceof ShotGunPicked) {
            itemSpriteToShake = callbackContext.shotgunSprite;
        } else if (raisedEvent instanceof MachineGunPicked) {
            itemSpriteToShake = callbackContext.machinegunSprite;
        } else if (raisedEvent instanceof MoneyPicked) {
            itemSpriteToShake = callbackContext.moneySprite;
        }

        if (itemSpriteToShake) {
            const formerAngle = itemSpriteToShake.angle;
            const newAngle = formerAngle - 15;
            const formerY = itemSpriteToShake.y;
            const newY = formerY - 5;
            const tween = callbackContext.game.add.tween(itemSpriteToShake).to({y: newY, angle: newAngle}, 100, Phaser.Easing.Bounce.Out);
            const nextTween = callbackContext.game.add.tween(itemSpriteToShake).to({y: formerY, angle: formerAngle}, 100, Phaser.Easing.Bounce.Out);
            tween.chain(nextTween).start();
        }
    }
}
