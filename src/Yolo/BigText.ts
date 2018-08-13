import {TEXT_STYLE_HUGE} from "../Character/Bot/Citizen";

export class BigText {
    private game: Phaser.Game;
    private text: string;
    private phaserText: Phaser.Text;
    private phaserTextShadow: Phaser.Text;
    private shouldDisappear: boolean = false;

    constructor(game: Phaser.Game, text: string) {
        this.game = game;
        this.text = text;
        this.phaserText = null;
        this.phaserTextShadow = null;
    }

    private display() {
        this.phaserTextShadow = this.game.add.text(0, 0, this.text, TEXT_STYLE_HUGE);
        this.phaserTextShadow.fill = '#800';
        this.phaserTextShadow.scale.set(2);
        this.phaserTextShadow.rotation = (Math.random() - 0.5) * 0.3;
        this.phaserTextShadow.alpha = 0;

        this.phaserText = this.game.add.text(0, 0, this.text, TEXT_STYLE_HUGE);
        this.phaserText.scale.set(2);
        this.phaserText.rotation = this.phaserTextShadow.rotation;
        this.phaserText.alpha = 0;

        this.centerTexts();
    }

    update() {
        if (this.phaserText === null) {
            this.display();

            this.game.time.events.add(Phaser.Timer.SECOND * 1.7, () => {
                this.shouldDisappear = true;
            });
        } else {
            if (this.shouldDisappear) {
                if (this.phaserText.alpha > 0) {
                    this.phaserText.alpha = Math.max(this.phaserText.alpha - 0.1, 0);
                    this.phaserTextShadow.alpha = Math.max(this.phaserTextShadow.alpha - 0.1, 0);
                } else {
                    this.phaserText.destroy(true);
                    this.phaserTextShadow.destroy(true);
                    return false;
                }
            } else {
                if (this.phaserText.scale.x > 1) {
                    this.phaserText.scale.set(this.phaserText.scale.x - 0.08);
                    this.phaserText.alpha = -this.phaserText.scale.x + 2;
                    this.phaserTextShadow.scale.set(this.phaserText.scale.x - 0.08);
                    this.phaserTextShadow.alpha = (-this.phaserText.scale.x + 2) / 2;
                } else {
                    this.phaserText.alpha = 1;
                    this.phaserTextShadow.alpha = 0.5;
                }
            }
        }

        this.centerTexts();

        return true;
    }

    private centerTexts() {
        this.phaserText.x = 600 - this.phaserText.width / 2;
        this.phaserText.y = 300 - this.phaserText.height / 2;
        this.phaserTextShadow.x = 600 - this.phaserText.width / 2 + 50;
        this.phaserTextShadow.y = 300 - this.phaserText.height / 2 + 50;
    }
}