
import {Controller, KeyBoardController} from "../Controller";

export const STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};

export default class Score extends Phaser.State {

    private startText : Phaser.Text;
    private keyboardController: KeyBoardController;
    private chosenController: Controller;
    private background;
    private starting: boolean = false;
    private score: number;

    public init (
        controllerType: string,
        score: number
    ) {
        this.score = score;
    }

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
            "AAAAAA Kilmister is a huge fan of Motor Raid.\n" + this.score+
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
