import {TEXT_STYLE_SCORE} from "../Character/Bot/Citizen";

const SPECIAL_RATIO = 3;

export class ScoreDisplay {
    private game: Phaser.Game;
    private power: Phaser.Sprite;
    private combo: Phaser.TileSprite;
    private pointsDisplay: Phaser.Text;
    private playerMini: Phaser.TileSprite;
    private stopAnim = null;

    constructor(game: Phaser.Game) {
        this.game = game;

    }

    display() {
        const position = new PIXI.Point(880, 550);

        const background = this.game.add.sprite(position.x, position.y, 'score_main');
        background.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.power = this.game.add.sprite(position.x + 5 * SPECIAL_RATIO, position.y + 47 * SPECIAL_RATIO, 'score_power');
        this.power.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.combo = this.game.add.tileSprite(position.x, position.y, 94, 28, 'score_combo', 9);
        this.combo.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.pointsDisplay = this.game.add.text(position.x + 7 * SPECIAL_RATIO, position.y + 33 * SPECIAL_RATIO, '', TEXT_STYLE_SCORE);
        this.pointsDisplay.rotation = -0.12;

        this.playerMini = this.game.add.tileSprite(position.x + 72 * SPECIAL_RATIO, position.y + 20 * SPECIAL_RATIO, 16, 19,  'player_mini', 2);
        this.playerMini.scale.set(SPECIAL_RATIO * 2, SPECIAL_RATIO * 2);
        this.playerMini.animations.add('push', [0, 1], 12);
        this.playerMini.animations.add('normal', [2]);
    }

    /**
     * Energy is 0..100
     * Sprite is 82 px large
     * Palier is 1..10 -> 9..0
     */
    update(points: number, energy: number, palier: number) {
        this.pointsDisplay.text = Math.ceil(points).toString()['padStart'](7, '.');
        this.power.crop(new Phaser.Rectangle(
            0, 0, energy * 0.78, 100
        ), false);
        this.combo.loadTexture('score_combo', -palier+10);


        if (this.stopAnim) {
            const now = window.performance.now();
            if (this.stopAnim < now) {
                this.playerMini.animations.play('normal');
                this.stopAnim = null;
            }
        }
    }

    isInFuryMode() {
        return this.pointsDisplay.fill !== '#fff';
    }

    setFuryMode(value) {
        this.pointsDisplay.fill = value ? '#ff0000' : '#fff';
    }

    animPushing() {
        this.playerMini.animations.play('push', 12, true);
        const now = window.performance.now();
        this.stopAnim = now + 500;
    }
}