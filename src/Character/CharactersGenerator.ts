
import {StreetLimits} from "../Game/StreetLimits";
import {Hero} from "./Player/Hero";
import {Level} from "../Game/Level";
import {BackBag} from "./Player/BackBag";
import {Controller} from "../Game/Controller";
import {Street} from "../Game/Street";
import {Citizen} from "./Bot/Citizen";
import {Citizens} from "./Bot/Citizens";
import {ScoreDisplay} from "../Yolo/ScoreDisplay";

export class CharactersGenerator
{
    private limits: StreetLimits;
    private characterGroup: Phaser.Group;
    private backbag: BackBag;
    private level: Level;
    private controller: Controller;
    private heroGunType: string;
    private heroPosition: Phaser.Point;
    
    constructor(
        characterGroup: Phaser.Group,
        limits: StreetLimits,
        level: Level,
        backbag: BackBag,
        heroController: Controller,
        heroGunType: string,
        heroPosition: Phaser.Point
    ) {
        this.limits = limits;
        this.characterGroup = characterGroup;
        this.level = level;
        this.backbag = backbag;
        this.controller = heroController;
        this.heroGunType = heroGunType;
        this.heroPosition = heroPosition;
    }

    generateHero(street: Street, scoreDisplay: ScoreDisplay): Hero
    {
        const x = (this.heroPosition) ? this.heroPosition.x : 100;
        const y = (this.heroPosition) ? this.heroPosition.y : 370;

        return new Hero(
            this.characterGroup,
            x,
            y,
            'hero',
            street,
            this.backbag,
            this.controller,
            this.heroGunType,
            scoreDisplay
        );
    }

    generateRandomPosition(citizens: Citizens)
    {
        const sceneCenter = new PIXI.Point(1000, 400);
        const radiusMax = 950;
        const radiusMin = 100;
        const radiusMed = 400;

        let circlesTries = 500;
        while (circlesTries > 0) {
            const randForCircle = Math.random();
            const radius = (-4*radiusMin+4*radiusMed) * randForCircle * randForCircle
                + (radiusMax + 3*radiusMin - 4*radiusMed) * randForCircle
                + radiusMin;

            let angleTries = 500;
            while (angleTries > 0) {
                const randomAngle = Math.random() * Math.PI * 2;
                const pos = new PIXI.Point(
                    sceneCenter.x + Math.cos(randomAngle) * radius,
                    sceneCenter.y + Math.sin(randomAngle) * radius
                );

                if (pos.x > 0 && pos.x < 900 && pos.y > 20 && pos.y < 770
                    && this.thereIsNoCitizenUnder(citizens, pos)) {
                    return pos;
                }
                angleTries--;
            }
            circlesTries--;
        }

        return null;
    }

    generateBots(street: Street, citizens: Citizens, num = null, outOfBounds = false): void
    {

        for (let indCiv = 0; indCiv < (num || this.level.saneCitizens()); indCiv++) {
            const position = this.generateRandomPosition(citizens);
            if (position) {
                let citizen = new Citizen(this.characterGroup, position.x, position.y, Math.random() > 0.5 ? 'citizen1' : 'citizen2', street, false);
                citizens.add(citizen);
                if (outOfBounds) {
                    citizen.x = -15;
                    citizen.body.setCircle(4, -20, 18);
                    citizen.y = Math.random() * 800;
                }
            }
        }
    }

    private thereIsNoCitizenUnder(citizens: Citizens, pos: PIXI.Point) {
        return citizens.all().find((citizen: Citizen) => {
            const dist = Phaser.Math.distance(citizen.x, citizen.y, pos.x, pos.y);

            return dist < 20;
        }) == null;
    }
}
