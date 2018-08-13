
import {Cops} from "../Character/Bot/Cops";
import {Citizens} from "../Character/Bot/Citizens";
import {Hero} from "../Character/Player/Hero";
import {Swats} from "../Character/Bot/Swats";
import {CharactersGenerator} from "../Character/CharactersGenerator";
import {AlienQueen} from "../Character/Bot/AlienQueen";
import {ScoreDisplay} from "../Yolo/ScoreDisplay";

export class Street
{
    private copRepository: Cops;
    private swatRepository: Swats;
    private citizenRepository: Citizens;
    private hero: Hero;
    private queen: AlienQueen;
    private generator;

    constructor(generator: CharactersGenerator, lastLevel: boolean = false, scoreDisplay: ScoreDisplay)
    {
        this.copRepository = new Cops();
        this.citizenRepository = new Citizens();
        this.swatRepository = new Swats();

        this.generator = generator;

        this.addPeople();


        this.hero = generator.generateHero(this, scoreDisplay);
        if (lastLevel) {
            this.queen = generator.generateAlienQueen(this.hero);
        }
    }

    addPeople(num = null, outOfBounds = false)
    {
        this.generator.generateBots(this, this.citizens(), num, outOfBounds);
    }

    isEmpty(): boolean
    {
        return this.cops().allAlive().length === 0 && this.citizens().allAlive().length === 0 && this.swats().allAlive().length === 0;
    }

    player(): Hero
    {
        return this.hero;
    }

    alienQueen(): AlienQueen
    {
        return this.queen;
    }

    cops(): Cops
    {
        return this.copRepository;
    }

    swats(): Swats
    {
        return this.swatRepository;
    }

    citizens(): Citizens
    {
        return this.citizenRepository;
    }
}
