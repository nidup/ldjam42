
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
    private starting: boolean = false;

    public create ()
    {
        this.keyboardController = new KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
        this.game.stage.backgroundColor = '#050505';

        const titleX = 160;
        const titleY = 0;

        this.background = this.game.add.sprite(titleX, titleY, 'splash');
        this.background.scale.set(1.2, 1.2);

        const storyX = titleX - 90;
        const storyY = titleY + 320;
        const storyText =
            "Johnny Kilmister is a huge fan of Motor Raid.\n" +
            "He never went to any concert because he’s not comfortable in a crowd.\n" +
            "Motor Raid just announced their very last show, Johnny decided to go.\n" +
            "Help Johnny to level up his metal concert skills!";
        this.game.add.text(storyX, storyY, storyText, STORY_TEXT_STYLE);

        const controlX = storyX;
        const controlY = storyY + 190;
        const controlText =
            "> Controls:\n" +
            "- Press arrow keys to move\n" +
            "- Spam space key to pass through the crowd\n\n" +
            "> Increase your concert skills by staying\nas much as possible in blue action area!\n";
        this.game.add.text(controlX, controlY, controlText, STORY_TEXT_STYLE);

        const startX = controlX + 110;
        const startY = controlY + 190;
        this.startText = this.game.add.text(startX, startY, 'Press space key to start', STORY_TEXT_STYLE);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);

        const tutoX = controlX + 660;
        const tutoY = storyY + 170;
        const tuto = this.game.add.sprite(tutoX, tutoY, 'tuto');
        tuto.scale.set(0.5, 0.5);
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
        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            const wwwwwooowwwwAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
            wwwwwooowwwwAudio.play();
            wwwwwooowwwwAudio.onStop.addOnce(
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
