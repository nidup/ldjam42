
import {Controller, KeyBoardController} from "../Controller";
import {TEXT_STYLE_BIG} from "../../Character/Bot/Citizen";

export const STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};

export const SCORE_TEXT_STYLE = {
    align: 'center',
    fill: '#fff',
    font: '32px PICO-8'
};

export default class Score extends Phaser.State {

    private startText : Phaser.Text;
    private keyboardController: KeyBoardController;
    private chosenController: Controller;
    private background;
    private starting: boolean = false;
    private score: number;

    private tweetIt: Phaser.Text;

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

        this.background = this.game.add.sprite(titleX + 400, titleY + 250, 'splash');
        this.background.anchor.set(0.5, 0.5);
        this.background.scale.set(1.2, 1.2);
        const tweenScale = this.game.add.tween(this.background.scale)
            .to( { x: 1.25, y:1.25 }, 100, "Linear", true);
        tweenScale.repeat(10000, 200);

        const singerAudio = this.game.add.audio('singer-yourock', 1, false);
        singerAudio.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, () => {
            const singerAudio = this.game.add.audio('gueulage', 1, false);
            singerAudio.play();
        });
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            const singerAudio = this.game.add.audio('clapclap', 1, false);
            singerAudio.play();
        });

        const storyX = titleX + 220;
        const storyY = titleY + 430;
        const storyText =
            "Score:" + this.score+"";
        this.game.add.text(storyX, storyY, storyText, SCORE_TEXT_STYLE);

        const startX = titleX + 230;
        const startY = storyY + 150;
        this.startText = this.game.add.text(startX, startY, 'Press space key to restart', STORY_TEXT_STYLE);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);

        this.tweetIt = this.game.add.text(titleX + 200, titleY + 630, 'Share you score', SCORE_TEXT_STYLE);
        this.tweetIt.alpha = 1;
        this.tweetIt.inputEnabled = true;
        this.tweetIt.events.onInputOver.add(() => {
            document.body.style.cursor = 'pointer';
            this.tweetIt.alpha = 0.7;
        });
        this.tweetIt.events.onInputOut.add(() => {
            document.body.style.cursor = 'default';
            this.tweetIt.alpha = 1;
        });
        this.tweetIt.events.onInputDown.add(() => {
            window.open(
                'https://twitter.com/intent/tweet?text=I helped Johnny to survive a Metal Concert! ' +
                'Try to beat my ' + this.score + ' points 🤘! %23LDJAM42 %23sorryohsorry ' + 'https://ldjam.com/events/ludum-dare/42/sorry-oh-sorry-hellfest-simulator'
            );
        }, this);
    }

    public update()
    {
        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            const wwwwwooowwwwAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
            wwwwwooowwwwAudio.play();
            wwwwwooowwwwAudio.onStop.addOnce(
                function() {
                    this.game.state.start('Menu', true, false, this.chosenController.identifier());
                },
                this
            );

            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
                this.camera.shake(0.006, 2000);
                this.camera.flash(0xffffff, 100, true, 0.3);
            });
        }
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
