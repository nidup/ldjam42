import {TEXT_STYLE_SCORE} from "../Character/Bot/Citizen";

const SPECIAL_RATIO = 3;

export class ScoreDisplay {
    private game: Phaser.Game;
    private power: Phaser.Sprite;
    private combo: Phaser.TileSprite;
    private pointsDisplay: Phaser.Text;
    private playerMini: Phaser.TileSprite;
    private stopAnim = null;
    private background: Phaser.TileSprite;

    constructor(game: Phaser.Game) {
        this.game = game;

    }

    display() {
        const position = new PIXI.Point(880, 550);

        this.background = this.game.add.tileSprite(position.x, position.y, 96, 65, 'score_main');
        this.background.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);
        this.background.animations.add('blink', [0, 1], 12);
        this.background.animations.add('normal', [0]);
        this.background.animations.play('normal', 12, true);

        this.power = this.game.add.sprite(position.x + 6 * SPECIAL_RATIO, position.y + 48 * SPECIAL_RATIO, 'score_power');
        this.power.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.combo = this.game.add.tileSprite(position.x + SPECIAL_RATIO, position.y + SPECIAL_RATIO, 94, 28, 'score_combo', 9);
        this.combo.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);

        this.pointsDisplay = this.game.add.text(position.x + 8 * SPECIAL_RATIO, position.y + 34 * SPECIAL_RATIO, '', TEXT_STYLE_SCORE);
        this.pointsDisplay.rotation = -0.12;

        this.playerMini = this.game.add.tileSprite(position.x + 73 * SPECIAL_RATIO, position.y + 21 * SPECIAL_RATIO, 16, 19,  'player_mini', 2);
        this.playerMini.scale.set(SPECIAL_RATIO * 2, SPECIAL_RATIO * 2);
        this.playerMini.animations.add('push', [0, 1], 12);
        this.playerMini.animations.add('normal', [2]);
    }

    setIsIn(value: boolean) {
        if (value && this.background.animations.currentAnim.name !== 'blink') {
            this.background.animations.play('blink', 12, true);
        } else {
            if (!value && this.background.animations.currentAnim.name === 'blink') {
                this.background.animations.play('normal', 12, true);
            }
        }
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
        this.power.visible = false;
        this.game.time.events.add(0.15 * Phaser.Timer.SECOND, () => {
            this.power.visible = true;
        });
        this.playerMini.animations.play('push', 12, true);
        const now = window.performance.now();
        this.stopAnim = now + 500;
    }
}