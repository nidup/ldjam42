
export default class Preload extends Phaser.State
{
    private skipMenu = false;
    private skipToLevel = 1;
    private testScoreScreen = false;

    public preload ()
    {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }

    public create ()
    {
        if (this.testScoreScreen) {
            this.game.state.start('Score', true, false, 'keyboard', 1234);
        } else if (this.skipMenu) {
            this.game.state.start('Play', true, false, 'keyboard', this.skipToLevel);
        } else {
            this.game.state.start('Menu');
        }
    }

    private loadAudio()
    {
        // day one records
        this.load.audio('allezla', 'assets/sounds/day1/allezla.ogg');
        this.load.audio('clapclap', 'assets/sounds/day1/clapclap.ogg');
        this.load.audio('fuckyou2', 'assets/sounds/day1/fuckyou2.ogg');
        this.load.audio('fuckyou1', 'assets/sounds/day1/fuckyou.ogg');
        this.load.audio('gueulage', 'assets/sounds/day1/gueulage.ogg');
        this.load.audio('huuuuum', 'assets/sounds/day1/huuuuum.ogg');
        this.load.audio('i-want-a-circlepit', 'assets/sounds/day1/i-want-a-cirxlepit.ogg');
        this.load.audio('oups-sorry', 'assets/sounds/day1/oups-sorry.ogg');
        this.load.audio('stap-go-away', 'assets/sounds/day1/stap-go-away.ogg');
        this.load.audio('what-de', 'assets/sounds/day1/what-de.ogg');
        this.load.audio('a-poil', 'assets/sounds/day1/a-poil.ogg');
        this.load.audio('dont-touch-my-boobs', 'assets/sounds/day1/dont-touch-my-boobs.ogg');
        this.load.audio('fuckyou4', 'assets/sounds/day1/fuckyou4.ogg');
        this.load.audio('fuckyou3', 'assets/sounds/day1/fuxkyou3.ogg');
        this.load.audio('heyman-want-some', 'assets/sounds/day1/heyman-want-some.ogg');
        this.load.audio('iaaaam-so-sorry', 'assets/sounds/day1/iaaaam-so-sorry.ogg');
        this.load.audio('no-worries-mates', 'assets/sounds/day1/no-worries-mates.ogg');
        this.load.audio('ouuuufffw', 'assets/sounds/day1/ouuuufffw.ogg');
        this.load.audio('tchin', 'assets/sounds/day1/tchin.ogg');
        this.load.audio('wwwwwwwoooooooww', 'assets/sounds/day1/wwwwwwwoooooooww.ogg');
        this.load.audio('calm-down', 'assets/sounds/day1/calm-down.ogg');
        this.load.audio('dude', 'assets/sounds/day1/dude.ogg');
        this.load.audio('fuckyou5', 'assets/sounds/day1/fuckyou5.ogg');
        this.load.audio('gueulage2', 'assets/sounds/day1/gueulage2.ogg');
        this.load.audio('hey', 'assets/sounds/day1/hey.ogg');
        this.load.audio('i-want-a-circle-pif', 'assets/sounds/day1/i-want-a-circle-pif.ogg');
        this.load.audio('ouaouaouaoua', 'assets/sounds/day1/ouaouaouaoua.ogg');
        this.load.audio('sorry-o-sorry', 'assets/sounds/day1/sorry-o-sorry.ogg');
        this.load.audio('the-wall-of-death', 'assets/sounds/day1/the-whale-of-dearh.ogg');
        this.load.audio('youwannadance', 'assets/sounds/day1/youwannadance.ogg');
        this.load.audio('music', 'assets/sounds/day1/BeepBox-Song.ogg');
        // day2 records
        this.load.audio('bruitdegerb', 'assets/sounds/day2/bruitdegerb.ogg');
        this.load.audio('bruitedegerb2', 'assets/sounds/day2/bruitedegerb2.ogg');
        this.load.audio('bruitdegerbe3', 'assets/sounds/day2/bruitdegerbe3.ogg');
        this.load.audio('dude2', 'assets/sounds/day2/dude2.ogg');
        this.load.audio('hey1', 'assets/sounds/day2/hey1.ogg');
        this.load.audio('hey3', 'assets/sounds/day2/hey3.ogg');
        this.load.audio('hey2', 'assets/sounds/day2/hey2.ogg');
        this.load.audio('hey4', 'assets/sounds/day2/hey4.ogg');
        this.load.audio('noworries2', 'assets/sounds/day2/noworries2.ogg');
        this.load.audio('ouuuuuffff2', 'assets/sounds/day2/ouuuuuffff2.ogg');
        this.load.audio('rototo', 'assets/sounds/day2/rototo.ogg');
        this.load.audio('rototo2', 'assets/sounds/day2/rototo2.ogg');
        this.load.audio('stap2', 'assets/sounds/day2/stap2.ogg');
        this.load.audio('singer-amazing', 'assets/sounds/day2/singer-amazing.ogg');
        this.load.audio('singer-motherfocka', 'assets/sounds/day2/singer-motherfocka.ogg');
        this.load.audio('singer-yourock', 'assets/sounds/day2/singer-yourock.ogg');
        this.load.audio('singer-thank-you', 'assets/sounds/day2/singer-thank-you.ogg');
        this.load.audio('singer-comon', 'assets/sounds/day2/singer-comon.ogg');
        this.load.audio('singer-yourawesome', 'assets/sounds/day2/singer-yourawesome.ogg');
        this.load.audio('sorry1', 'assets/sounds/day2/sorry1.ogg');
        this.load.audio('sorry3', 'assets/sounds/day2/sorry3.ogg');
        this.load.audio('sorry6', 'assets/sounds/day2/sorry6.ogg');
        this.load.audio('sorry9', 'assets/sounds/day2/sorry9.ogg');
        this.load.audio('sorry2', 'assets/sounds/day2/sorry2.ogg');
        this.load.audio('sorry5', 'assets/sounds/day2/sorry5.ogg');
        this.load.audio('sorry8', 'assets/sounds/day2/sorry8.ogg');
        this.load.audio('sorry4', 'assets/sounds/day2/sorry4.ogg');
        this.load.audio('sorry7', 'assets/sounds/day2/sorry7.ogg');
        this.load.audio('sorry10', 'assets/sounds/day2/sorry10.ogg');
        this.load.audio('wantsome2', 'assets/sounds/day2/wantsome2.ogg');
    }

    private loadLevels()
    {
        this.load.text('levels', 'assets/data/levels.json');
    }

    private loadGameImages() {
        this.load.spritesheet('citizen1', 'assets/sprites/citizen4.png', 24, 24);
        this.load.spritesheet('citizen2', 'assets/sprites/citizen5.png', 24, 24);
        this.load.spritesheet('hero', 'assets/sprites/citizen4.png', 24, 24);

        this.load.spritesheet('main', 'assets/sprites/main.png', 600, 400);
        this.load.spritesheet('scene', 'assets/sprites/scene.png', 106, 291);
        this.load.spritesheet('splash', 'assets/sprites/splash.png', 600, 400);
        this.load.spritesheet('lamp1', 'assets/sprites/lamp1.png', 106, 291);
        this.load.spritesheet('lamp2', 'assets/sprites/lamp2.png', 106, 291);
        this.load.spritesheet('lamp3', 'assets/sprites/lamp3.png', 106, 291);
        this.load.spritesheet('lamp4', 'assets/sprites/lamp4.png', 106, 291);
        this.load.spritesheet('lamp5', 'assets/sprites/lamp5.png', 106, 291);
        this.load.spritesheet('lamp6', 'assets/sprites/lamp6.png', 106, 291);

        this.load.spritesheet('tuto', 'assets/sprites/tuto.png', 816, 521);

        this.load.spritesheet('score_combo', 'assets/sprites/score_combo.png', 94, 28);
        this.load.spritesheet('score_main', 'assets/sprites/score_main.png', 96, 65);
        this.load.spritesheet('score_power', 'assets/sprites/score_power.png', 82, 16);
        this.load.spritesheet('player_mini', 'assets/sprites/player_mini.png', 16, 19);
    }

    private loadFonts()
    {
    }
}
