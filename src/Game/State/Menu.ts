
import {Config} from "../../Config";
import {Controller, KeyBoardController} from "../Controller";
import {TEXT_STYLE, TEXT_STYLE_BIG, TEXT_STYLE_MIDDLE} from "../../Character/Bot/Citizen";

export const STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};

export default class Menu extends Phaser.State {

    private startText : Phaser.Text;
    private background;
    private keyboardController: KeyBoardController;
    private controlsKeyboardText: string;
    private controlsText: Phaser.BitmapText;
    private chosenController: Controller;
    private shootAudio: Phaser.Sound;
    private music: Phaser.Sound;
    private starting: boolean = false;

    public create ()
    {
        this.keyboardController = new KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
        this.game.stage.backgroundColor = '#050505';

        const titleX = 160;
        const titleY = 0;

        this.background = this.game.add.sprite(titleX, titleY, 'splash');
//        this.background.scale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.background.scale.set(1.2, 1.2);

        const storyX = titleX - 100;
        const storyY = titleY + 320;
        const storyText =
            "Johnny Kilmister is a huge fan of Motor Raid.\n" +
            "He never went to any concert because he’s not comfortable in a crowd.\n" +
            "Motor Raid just announced their very last show, Johnny decided to go.\n" +
            "Help Johnny to level up his metal concert skills!";
        this.game.add.text(storyX, storyY, storyText, STORY_TEXT_STYLE);

        const startX = storyX + 310;
        const startY = storyY + 130;
        this.startText = this.game.add.text(startX, startY, 'Press space key to start', STORY_TEXT_STYLE);
        //this.startText = this.game.add.bitmapText(startX, startY, 'cowboy','', mediumFontSize);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);
/*
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
        */

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

        //this.startText.setText('Press space key to start');

        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            this.game.state.start('Play', true, false, this.chosenController.identifier());
            /*
            this.shootAudio.play('', 0, 0.5, false);
            this.shootAudio.onStop.addOnce(
                function() {
                    this.game.state.start('Play', true, false, this.chosenController.identifier());
                },
                this
            );*/
        }
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
