
import {Config} from "../../Config";
import {Controller, KeyBoardController} from "../Controller";

export default class Menu extends Phaser.State {

    private startText : Phaser.BitmapText;
    private keyboardController: KeyBoardController;
    private controlsKeyboardText: string;
    private controlsText: Phaser.BitmapText;
    private chosenController: Controller;
    private shootAudio: Phaser.Sound;
    private music: Phaser.Sound;
    private starting: boolean = false;

    public create ()
    {
        const verySmallFontSize = 10;
        const smallFontSize = 14;
        const mediumFontSize = 20;
        const largeFontSize = 34;
        this.game.stage.backgroundColor = '#1b1128';

        //this.background = this.game.add.sprite(0, 0, 'Menu');
        //this.background.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        let titleX = 260;
        const titleY = 113;
        this.game.add.bitmapText(titleX, titleY, 'cowboy','Cowboys vs Aliens', largeFontSize);

        const storyX = titleX - 150;
        const storyY = titleY + 150;
        const storyText = "Hey Rick MacMorty,\n\n"
            +"Aliens are infesting citizens in our town, you\n"
            +"can't distinguish who is sane or contaminated.\n"
            +"You have only one option... kill them all to stop\n"
            +"this plague and save the far west.\n";
        this.game.add.bitmapText(storyX, storyY, 'cowboy',storyText, mediumFontSize);

        const controlsChoiceX = storyX;
        const controlsChoiceY = storyY + 350;
        this.setupForComputer(controlsChoiceX, controlsChoiceY, smallFontSize);

        const startX = storyX + 250;
        const startY = storyY + 220;
        this.startText = this.game.add.bitmapText(startX, startY, 'cowboy','', mediumFontSize);
        this.startText.alpha = 1;
        //const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        //tweenAlpha.repeat(10000, 400);

        const gunSprite = this.game.add.sprite(startX - 50, startY , 'Gun', 1);
        gunSprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        gunSprite.animations.add('selected', [0, 1], 1, true);
        gunSprite.play('selected');

        const gunSprite2 = this.game.add.sprite(startX + 550, startY , 'Gun', 1);
        gunSprite2.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        gunSprite2.scale.x = -Config.pixelScaleRatio();
        gunSprite2.animations.add('selected', [0, 1], 1, true);
        gunSprite2.play('selected');

        const authorX = 860;
        const authorY = 740;
        this.game.add.bitmapText(authorX, authorY, 'carrier-command','LDJAM #41 by Nidup', verySmallFontSize);

        const heroSprite = this.game.add.sprite(authorX - 5, authorY - 45 , 'hero', 1);
        heroSprite.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        heroSprite.scale.x = -Config.pixelScaleRatio();
        heroSprite.animations.add('selected', [0, 1, 2, 3, 4], 4, true);
        heroSprite.play('selected')

        this.music = this.game.add.audio('far-west');
        this.music.loopFull();

        this.shootAudio = this.game.add.audio('shoot');
    }

    private setupForComputer(controlsChoiceX: number, controlsChoiceY:number, smallFontSize: number)
    {
        this.controlsKeyboardText = "Keyboard Controls:\n"
            +" - Move: arrows\n"
            +" - Shoot: space bar\n"
            +" - Switch weapon: S\n";
        this.controlsText = this.game.add.bitmapText(controlsChoiceX, controlsChoiceY, 'cowboy',this.controlsKeyboardText, smallFontSize);
        this.keyboardController = new KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
    }

    public update()
    {
        this.startText.setText('Press space key to start');

        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            this.shootAudio.play('', 0, 0.5, false);
            this.shootAudio.onStop.addOnce(
                function() {
                    this.game.state.start('Play', true, false, this.chosenController.identifier());
                },
                this
            );
        }
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
