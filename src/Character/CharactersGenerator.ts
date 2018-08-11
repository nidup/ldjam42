
import {StreetLimits} from "../Game/StreetLimits";
import {Hero} from "./Player/Hero";
import {Level} from "../Game/Level";
import {BackBag} from "./Player/BackBag";
import {Controller} from "../Game/Controller";
import {Street} from "../Game/Street";
import {Cop} from "./Bot/Cop";
import {Cops} from "./Bot/Cops";
import {Swat} from "./Bot/Swat";
import {Citizen} from "./Bot/Citizen";
import {Citizens} from "./Bot/Citizens";
import {Swats} from "./Bot/Swats";
import {AlienQueen} from "./Bot/AlienQueen";
import {PickableItem} from "./Player/PickableItem";

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

    generateHero(street: Street): Hero
    {
        const x = (this.heroPosition) ? this.heroPosition.x : this.limits.minX();
        const y = (this.heroPosition) ? this.heroPosition.y : this.limits.maxY();

        return new Hero(
            this.characterGroup,
            x,
            y,
            'hero',
            street,
            this.backbag,
            this.controller,
            this.heroGunType
        );
    }

    generateAlienQueen(hero: Hero): AlienQueen
    {
        const queenX = 700;
        const queenY = 620;
        const firstWeaponX = queenX - 450;
        const firstWeaponY = queenY - 20;
        new PickableItem(this.characterGroup, firstWeaponX, firstWeaponY, 'MachineGun', hero);
        new PickableItem(this.characterGroup, firstWeaponX, firstWeaponY+50, 'MachineGun', hero);
        new PickableItem(this.characterGroup, firstWeaponX, firstWeaponY+100, 'MachineGun', hero);
        new PickableItem(this.characterGroup, firstWeaponX, firstWeaponY+150, 'MachineGun', hero);
        return new AlienQueen(this.characterGroup, queenX, queenY, 'AlienQueen');
    }

    generateRandomMescouilles(citizens: Citizens)
    {
        const center = new PIXI.Point(1000, 400);
        const radiusMax = 1000;
        const radiusMin = 100;
        const radiusMed = 350;

        const a = -4*radiusMin+4*radiusMed;
        const b = radiusMax + 3*radiusMin - 4*radiusMed;
        const c = radiusMin;

        let j = 0;
        while (j < 500) {
            const rand = Math.random();
            const radius = a * rand * rand + b * rand + c;

            let i = 0;
            while (i < 500) {
                const randCircle = Math.random() * Math.PI * 2;

                const pos = new PIXI.Point(
                    center.x + Math.cos(randCircle) * radius,
                    center.y + Math.sin(randCircle) * radius
                );

                if (pos.x > 0 && pos.x < 900 && pos.y > 20 && pos.y < 800 && this.thereIsNoCitizenUnder(citizens, pos)) {
                    return pos;
                }
                i++;
            }
            j++;
        }

        return null;
    }

    generateBots(street: Street, cops: Cops, citizens: Citizens, swats: Swats): void
    {

        for (let indCiv = 0; indCiv < this.level.saneCitizens(); indCiv++) {
        //for (let indCiv = 0; indCiv < 500; indCiv++) {
            const mescouilles = this.generateRandomMescouilles(citizens);
            if (mescouilles) {
                //let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
                citizens.add(new Citizen(this.characterGroup, mescouilles.x, mescouilles.y, 'citizen1', street, false));
            }
        }
        /*
        for (let indCiv = 0; indCiv < this.level.infectedCitizens(); indCiv++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            citizens.add(new Citizen(this.characterGroup, randX, randY, 'citizen1', street, true));
        }

        for (let indCop = 0; indCop < this.level.saneCowboysWithGun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop(this.characterGroup, randX, randY, 'cop', street, false));
        }
        for (let indCop = 0; indCop < this.level.infectedCowboysWithGun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop(this.characterGroup, randX, randY, 'cop', street, true));
        }

        for (let indCop = 0; indCop < this.level.saneCowboysWithShotgun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop(this.characterGroup, randX, randY, 'cop-shotgun', street, false));
        }
        for (let indCop = 0; indCop < this.level.infectedCowboysWithShotgun(); indCop++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            cops.add(new Cop(this.characterGroup, randX, randY, 'cop-shotgun', street, true));
        }

        for (let indSwat = 0; indSwat < this.level.saneCowboysWithMachinegun(); indSwat++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            swats.add(new Swat(this.characterGroup, randX, randY, 'enemy-machinegun', street, false));
        }
        for (let indSwat = 0; indSwat < this.level.infectedCowboysWithMachinegun(); indSwat++) {
            let randX = this.characterGroup.game.rnd.integerInRange(this.limits.minX(), this.limits.maxX());
            let randY = this.characterGroup.game.rnd.integerInRange(this.limits.minY(), this.limits.maxY());
            swats.add(new Swat(this.characterGroup, randX, randY, 'enemy-machinegun', street, true));
        }
        */
    }

    private thereIsNoCitizenUnder(citizens: Citizens, pos: PIXI.Point) {
        return citizens.all().find((citizen: Citizen) => {
            const dist = Phaser.Math.distance(citizen.x, citizen.y, pos.x, pos.y);

            return dist < 18;
        }) == null;
    }
}
