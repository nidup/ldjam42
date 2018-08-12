
export default class Preload extends Phaser.State
{
    private skipMenu = true;
    private skipToLevel = 1;

    public preload ()
    {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }

    public create ()
    {
        if (this.skipMenu) {
            this.game.state.start('Play', true, false, 'keyboard', this.skipToLevel);
        } else {
            this.game.state.start('Menu');
        }
    }

    private loadAudio()
    {
        //this.load.audio('far-west', 'assets/sounds/far-west2.ogg');
        //this.load.audio('shoot', 'assets/sounds/single-shoot.ogg');
        //this.load.audio('pick-money', 'assets/sounds/pick-money.ogg');
        //this.load.audio('pick-weapon', 'assets/sounds/pick-weapon.ogg');
        //this.load.audio('alien-dying', 'assets/sounds/alien-dying.ogg');
        //this.load.audio('human-dying', 'assets/sounds/human-dying.ogg');

        this.load.audio('allezla', 'assets/sounds/allezla.ogg');
        this.load.audio('clapclap', 'assets/sounds/clapclap.ogg');
        this.load.audio('fuckyou2', 'assets/sounds/fuckyou2.ogg');
        this.load.audio('fuckyou1', 'assets/sounds/fuckyou.ogg');
        this.load.audio('gueulage', 'assets/sounds/gueulage.ogg');
        this.load.audio('huuuuum', 'assets/sounds/huuuuum.ogg');
        this.load.audio('i-want-a-circlepit', 'assets/sounds/i-want-a-cirxlepit.ogg');
        this.load.audio('oups-sorry', 'assets/sounds/oups-sorry.ogg');
        this.load.audio('stap-go-away', 'assets/sounds/stap-go-away.ogg');
        this.load.audio('what-de', 'assets/sounds/what-de.ogg');
        this.load.audio('a-poil', 'assets/sounds/a-poil.ogg');
        this.load.audio('dont-touch-my-boobs', 'assets/sounds/dont-touch-my-boobs.ogg');
        this.load.audio('fuckyou4', 'assets/sounds/fuckyou4.ogg');
        this.load.audio('fuckyou3', 'assets/sounds/fuxkyou3.ogg');
        this.load.audio('heyman-want-some', 'assets/sounds/heyman-want-some.ogg');
        this.load.audio('iaaaam-so-sorry', 'assets/sounds/iaaaam-so-sorry.ogg');
        this.load.audio('no-worries-mates', 'assets/sounds/no-worries-mates.ogg');
        this.load.audio('ouuuufffw', 'assets/sounds/ouuuufffw.ogg');
        this.load.audio('tchin', 'assets/sounds/tchin.ogg');
        this.load.audio('wwwwwwwoooooooww', 'assets/sounds/wwwwwwwoooooooww.ogg');
        this.load.audio('calm-down', 'assets/sounds/calm-down.ogg');
        this.load.audio('dude', 'assets/sounds/dude.ogg');
        this.load.audio('fuckyou5', 'assets/sounds/fuckyou5.ogg');
        this.load.audio('gueulage2', 'assets/sounds/gueulage2.ogg');
        this.load.audio('hey', 'assets/sounds/hey.ogg');
        this.load.audio('i-want-a-circle-pif', 'assets/sounds/i-want-a-circle-pif.ogg');
        this.load.audio('ouaouaouaoua', 'assets/sounds/ouaouaouaoua.ogg');
        this.load.audio('sorry-o-sorry', 'assets/sounds/sorry-o-sorry.ogg');
        this.load.audio('the-wall-of-death', 'assets/sounds/the-whale-of-dearh.ogg');
        this.load.audio('youwannadance', 'assets/sounds/youwannadance.ogg');
        this.load.audio('music', 'assets/sounds/BeepBox-Song.ogg');
    }

    private loadLevels()
    {
        this.load.text('levels', 'assets/data/levels.json');
    }

    private loadGameImages() {
        this.load.spritesheet('Top', 'assets/sprites/top.png', 1, 1);
        this.load.spritesheet('Side', 'assets/sprites/side.png', 12, 12);
        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('Inventory', 'assets/sprites/inventory.png', 300, 300);
        this.load.spritesheet('LevelInstructions', 'assets/sprites/level.png', 400, 300);
        this.load.spritesheet('citizen1', 'assets/sprites/citizen4.png', 24, 24);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('enemy-machinegun', 'assets/sprites/enemy-machinegun.png', 32, 32);
        this.load.spritesheet('hero', 'assets/sprites/citizen4.png', 24, 24);
        this.load.spritesheet('Bullet', 'assets/sprites/bullets.png', 10, 10);
        this.load.spritesheet('Marker', 'assets/sprites/markers.png', 20, 20);
        this.load.spritesheet('Gun', 'assets/sprites/gun.png', 20, 20);
        this.load.spritesheet('ShotGun', 'assets/sprites/shotgun.png', 30, 20);
        this.load.spritesheet('MachineGun', 'assets/sprites/machinegun.png', 30, 20);
        this.load.spritesheet('Money', 'assets/sprites/money.png', 20, 20);
        this.load.spritesheet('Menu', 'assets/sprites/menu.png', 800, 600);
        this.load.spritesheet('Street', 'assets/sprites/street.png', 80, 110);
        this.load.spritesheet('BuildingHostel', 'assets/sprites/building-hostel.png', 180, 240);
        this.load.spritesheet('BuildingMedium', 'assets/sprites/building-medium.png', 180, 240);
        this.load.spritesheet('BuildingSmall', 'assets/sprites/building-small.png', 120, 240);
        this.load.spritesheet('AlienQueen', 'assets/sprites/alien-queen.png', 128, 128);

        this.load.spritesheet('main', 'assets/sprites/main.png', 600, 400);
        this.load.spritesheet('scene', 'assets/sprites/scene.png', 106, 291);
    }

    private loadFonts()
    {
    }
}
