import {BigText} from "./BigText";

export class BigTextPositionner {
    private bigTexts: BigText[];
    private game: Phaser.Game;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.bigTexts = [];
    }

    push(text: string) {
        let i = 0;
        while (i <= 6) {
            if (this.bigTexts[i] === null || this.bigTexts[i] === undefined) {
                this.bigTexts[i] = new BigText(this.game, text, i);
                return true;
            }
            i++;
        }
    }

    update() {
        for (let i = 0; i < this.bigTexts.length; i++) {
            if (this.bigTexts[i] !== null) {
                if (!this.bigTexts[i].update()) {
                    this.bigTexts[i] = null;
                }
            }
        }
    }
}