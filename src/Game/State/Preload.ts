
export default class Preload extends Phaser.State
{
    private skipMenu = false;
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
        this.load.audio('far-west', 'assets/sounds/far-west2.ogg');
        this.load.audio('shoot', 'assets/sounds/single-shoot.ogg');
        this.load.audio('pick-money', 'assets/sounds/pick-money.ogg');
        this.load.audio('pick-weapon', 'assets/sounds/pick-weapon.ogg');
        this.load.audio('alien-dying', 'assets/sounds/alien-dying.ogg');
        this.load.audio('human-dying', 'assets/sounds/human-dying.ogg');
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
        this.load.spritesheet('citizen1', 'assets/sprites/citizen1.png', 32, 32);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('enemy-machinegun', 'assets/sprites/enemy-machinegun.png', 32, 32);
        this.load.spritesheet('hero', 'assets/sprites/hero.png', 32, 32);
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
    }

    private loadFonts()
    {
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.load.bitmapFont('cowboy', 'assets/fonts/cowboy.png', 'assets/fonts/cowboy.fnt');
    }
}
