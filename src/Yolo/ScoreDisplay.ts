import {Config} from "../Config";
import {TEXT_STYLE_SCORE} from "../Character/Bot/Citizen";

const SPECIAL_RATIO = 3;

export class ScoreDisplay {
    private game: Phaser.Game;
    private power: Phaser.Sprite;
    private combo: Phaser.TileSprite;
    private pointsDisplay: Phaser.Text;

    constructor(game: Phaser.Game) {
        const position = new PIXI.Point(900, 550);
        this.game = game;

        const background = this.game.add.sprite(position.x, position.y, 'score_main');
        background.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.power = this.game.add.sprite(position.x + 5 * SPECIAL_RATIO, position.y + 47 * SPECIAL_RATIO, 'score_power');
        this.power.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.combo = this.game.add.tileSprite(position.x, position.y, 94, 28, 'score_combo', 9);
        this.combo.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.pointsDisplay = this.game.add.text(position.x + 7 * SPECIAL_RATIO, position.y + 33 * SPECIAL_RATIO, '', TEXT_STYLE_SCORE);
        this.pointsDisplay.rotation = -0.12;
    }

    /**
     * Energy is 0..100
     * Sprite is 82 px large
     * Palier is 1..10 -> 9..0
     */
    update(points: number, energy: number, palier: number) {
        this.pointsDisplay.text = Math.ceil(points).toString()['padStart'](7, '.');
        this.power.crop(new Phaser.Rectangle(
            0, 0, energy * 0.82, 100
        ), false);
        this.combo.loadTexture('score_combo', -palier+10);
    }

    isInFuryMode() {
        return this.pointsDisplay.fill !== '#fff';
    }

    setFuryMode(value) {
        this.pointsDisplay.fill = value ? '#ff0000' : '#fff';
    }
}