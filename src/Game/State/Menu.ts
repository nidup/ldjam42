
import {Controller, KeyBoardController} from "../Controller";

export const STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};

export const LDJAM_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '10px PICO-8'
};

export default class Menu extends Phaser.State {

    private startText : Phaser.Text;
    private background;
    private keyboardController: KeyBoardController;
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
            "Johnny Kilmister is a huge fan of Motor Raid.\n".toUpperCase() +
            "He never went to any concert because he’s not comfortable in a crowd.\n".toUpperCase() +
            "Motor Raid just announced their very last show, Johnny decided to go.\n".toUpperCase() +
            "Help Johnny to level up his metal concert skills!".toUpperCase();
        this.game.add.text(storyX, storyY, storyText, STORY_TEXT_STYLE);

        const controlX = storyX;
        const controlY = storyY + 170;
        const controlText =
            "> Controls:\n".toUpperCase() +
            "- Press arrow keys to move\n".toUpperCase() +
            "- Spam space key to pass through the crowd\n\n".toUpperCase() +
            "> Increase your concert skills by staying\nas much as possible in blue action area!\n".toUpperCase();
        this.game.add.text(controlX, controlY, controlText, STORY_TEXT_STYLE);

        const startX = controlX + 110;
        const startY = controlY + 190;
        this.startText = this.game.add.text(startX, startY, 'Press space key to start'.toUpperCase(), STORY_TEXT_STYLE);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to( { alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);

        const tutoX = controlX + 680;
        const tutoY = storyY + 150;
        const tuto = this.game.add.sprite(tutoX, tutoY, 'tuto');
        tuto.scale.set(0.5, 0.5);

        const ldjamX = tutoX +60;
        const ldjamY = tutoY + 280;
        const ldjamText = this.game.add.text(ldjamX, ldjamY, 'Hand-crafted with ❤️ for LDJAM 42'.toUpperCase(), LDJAM_TEXT_STYLE);
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
