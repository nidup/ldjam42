
import {Street} from "../Street";
import {Citizen} from "../../Character/Bot/Citizen";
import {Cop} from "../../Character/Bot/Cop";
import {Inventory} from "../../Widget/Inventory";
import {BackBag} from "../../Character/Player/BackBag";
import {LevelInstructions} from "../../Widget/LevelInstructions";
import {FlashMessages} from "../../Widget/FlashMessages";
import {BuildingLayout} from "../../Building/BuildingLayout";
import {Config} from "../../Config";
import {LevelLoader} from "../LevelLoader";
import {GamePadController, KeyBoardController, VirtualPadController} from "../Controller";
import {DeviceDetector} from "../DeviceDetector";
import {StreetLimits} from "../StreetLimits";
import {CharactersGenerator} from "../../Character/CharactersGenerator";
import {Buildings} from "../../Building/Buildings";
import {HeroNursed} from "../../Character/Player/Events";
import {AlienQueen} from "../../Character/Bot/AlienQueen";

export default class Play extends Phaser.State
{
    private sky: Phaser.TileSprite;
    private background: Phaser.TileSprite;
    private street: Street;
    private buildings: Buildings;
    private characterLayer: Phaser.Group;
    private levelNumber: number = 1;
    private switchingLevel: boolean = false;
    private previousInventory: {'gunAmno': number, 'shotgunAmno': number, 'machinegunAmno': number, 'money': number} = null;
    private previousGunType: string;
    private controllerType: string = null;
    private playerPosition: Phaser.Point;
    private leftBoundMargin: Phaser.TileSprite;
    private rightBoundMargin: Phaser.TileSprite;
    private topBoundMargin: Phaser.TileSprite;
    private isFinalLevel: boolean = false;

    public init (
        controllerType: string,
        level: number = 1,
        previousInventory = {'gunAmno': 100, 'shotgunAmno': 0, 'machinegunAmno': 0, 'money': 0},
        currentGunType: string = 'Gun',
        playerPosition: Phaser.Point = null
    ) {
        this.levelNumber = level;
        this.previousInventory = previousInventory;
        this.switchingLevel = false;
        this.controllerType = controllerType;
        this.previousGunType = currentGunType;
        this.playerPosition = playerPosition;
        if (level == 12) {
            this.isFinalLevel = true;
        }
    }

    public create()
    {
        if (Config.debug()) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';

        const levelLoader = new LevelLoader();
        const level = levelLoader.load(this.game, this.levelNumber);

        const skyLayer = this.game.add.group();
        skyLayer.name = 'Sky';

        const backgroundLayer = this.game.add.group();
        backgroundLayer.name = 'Background';

        const buildingsLayer = this.game.add.group();
        buildingsLayer.name = 'Buildings';

        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';

        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';

        let streetPositionX = 0;
        let sideMarginWidth = 1;
        let rightCameraMarginX = this.game.width;
        const detector = new DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            streetPositionX += Config.mobileExtraSidePadding();
            sideMarginWidth = Config.mobileExtraSidePadding();
            rightCameraMarginX -= Config.mobileExtraSidePadding();
        }

        const leftCameraMargin = this.game.add.tileSprite(0, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        leftCameraMargin.fixedToCamera = true;

        this.leftBoundMargin = this.game.add.tileSprite(-1, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.leftBoundMargin, Phaser.Physics.ARCADE);
        this.leftBoundMargin.body.immovable = true;
        this.leftBoundMargin.body.allowGravity = false;

        const rightCameraMargin = this.game.add.tileSprite(rightCameraMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        rightCameraMargin.fixedToCamera = true;

        const layout = new BuildingLayout(level, buildingsLayer, streetPositionX);
        const streetWidth = layout.streetWidth();

        let worldWidth = streetWidth;
        let rightBoundMarginX = streetWidth;
        if (detector.isMobile()) {
            worldWidth += Config.mobileExtraSidePadding();
        }

        this.rightBoundMargin = this.game.add.tileSprite(rightBoundMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.rightBoundMargin, Phaser.Physics.ARCADE);
        this.rightBoundMargin.body.immovable = true;
        this.rightBoundMargin.body.allowGravity = false;

        const streetPositionY = 580;
        let topBoundMarginY = streetPositionY - 40;
        this.topBoundMargin = this.game.add.tileSprite(0, topBoundMarginY, worldWidth, 1, 'Top', 0, interfaceLayer);
        this.game.physics.enable(this.topBoundMargin, Phaser.Physics.ARCADE);
        this.topBoundMargin.body.immovable = true;
        this.topBoundMargin.body.allowGravity = false;

        const height = 1200;
        const heightPosition = -400;

        this.sky = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height,'sky',0, skyLayer);
        this.sky.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        this.background = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height,'background',0, backgroundLayer);
        this.background.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        const streetHeight = 220;
        const street = this.game.add.tileSprite(streetPositionX, streetPositionY, streetWidth, streetHeight,'Street',0, buildingsLayer);
        street.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());

        let controller = null;
        if (this.controllerType === 'keyboard') {
            controller = new KeyBoardController(this.game);
        } else if (this.controllerType === 'gamepad') {
            controller = new GamePadController(this.game);
        } else if (this.controllerType === 'virtualpad') {
            controller = new VirtualPadController(this.game);
        } else {
            throw new Error('Unknown controller '+ this.controllerType);
        }

        const backbag = new BackBag(this.previousInventory);
        const limits = new StreetLimits(streetPositionX, streetWidth);
        const generator = new CharactersGenerator(
            this.characterLayer,
            limits,
            level,
            backbag,
            controller,
            this.previousGunType,
            this.playerPosition
        );
        this.street = new Street(generator, this.isFinalLevel);
        this.buildings = layout.buildings();

        new LevelInstructions(interfaceLayer, streetPositionX, 0, 'LevelInstructions', level);
        new Inventory(interfaceLayer, streetPositionX + 600, 0, 'Inventory', this.street.player());
        new FlashMessages(interfaceLayer, this.street.player().pastGameEvents(), this.street.player());

        const worldBoundX = 0;
        const worldBoundY = 0;
        const worldHeight = 800;
        this.game.world.setBounds(worldBoundX, worldBoundY, worldWidth, worldHeight);

        this.game.camera.follow(this.street.player());
    }

    public update()
    {
        if (this.isFinalLevel) {
            if (this.street.alienQueen().isDead()) {
                const levelText = this.game.add.bitmapText(100, 300, 'cowboy','Congratz, you defeat the aliens!', 30);
                levelText.alpha = 1;
                const tweenAlpha = this.game.add.tween(levelText).to( { alpha: 0 }, 0, "Linear", true);
                this.game.time.events.add(
                    Phaser.Timer.SECOND * 10,
                    function(){
                        this.nextLevel();
                    },
                    this
                );
            }
        } else {
            if (this.street.isEmpty()) {
                this.nextLevel();
            }
        }

        this.game.physics.arcade.collide(this.topBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.swats().all());

        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.swats().all());

        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.cops().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.swats().all());

        const skyParallaxSpeed = 0.03;
        this.sky.tilePosition.x -= skyParallaxSpeed;

        const backgroundParallaxSpeed = 0.05;
        if (this.street.player().movingToTheRight()) {
            this.background.tilePosition.x -= backgroundParallaxSpeed;
        } else if (this.street.player().movingToTheLeft()) {
            this.background.tilePosition.x += backgroundParallaxSpeed;
        }

        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);

        if (this.street.player().isDead()) {
            const hospital = this.buildings.hospital();
            if (hospital && this.street.player().money() >= hospital.nurseCost()) {
                this.street.player().nurse(hospital);
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier(),
                        new Phaser.Point(hospital.entranceX(), hospital.entranceY())
                    );
                    this.street.player().pastGameEvents().register(new HeroNursed(this.game.time.now));
                }, this);
            } else {
                this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier()
                    );
                }, this);
            }
        }
    }

    public render()
    {
        if (Config.debug()) {
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );

            this.game.debug.body(this.street.player());
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteInfo(this.street.player(), 32, 200);

            //this.game.debug.body(this.alienQueen);
            //this.game.debug.body(this.street.citizens().all()[0]);
            //this.game.debug.spriteInfo(this.street.citizens().all()[0], 32, 300);
            //this.game.debug.bodyInfo(this.street.citizens().all()[0], 32, 300);
        }
    }

    public shutdown()
    {
        this.sky.destroy();
        this.background.destroy();
        this.street.player().destroy();
        this.street.citizens().all().map(function(citizen: Citizen) { citizen.destroy()});
        this.street.cops().all().map(function(cop: Cop) { cop.destroy()});
        this.street = null;
    }

    public nextLevel()
    {
        if (this.switchingLevel === false) {
            this.switchingLevel = true;
            const levelsData = JSON.parse(this.game.cache.getText('levels'));
            const lastLevelNumber = levelsData.length;
            this.levelNumber++;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                if (this.levelNumber <= lastLevelNumber) {
                    this.game.state.start(
                        'Play',
                        true,
                        false,
                        this.controllerType,
                        this.levelNumber,
                        this.buildInventory(),
                        this.street.player().equippedGun().identifier()
                    );
                } else {
                    this.game.state.start('Menu');
                }
            }, this);
        }
    }

    private buildInventory()
    {
        return {
            'gunAmno': this.street.player().gunAmno(),
            'shotgunAmno': this.street.player().shotgunAmno(),
            'machinegunAmno': this.street.player().machinegunAmno(),
            'money': this.street.player().money(),
        };
    }
}
