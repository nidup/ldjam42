
import {Cops} from "../Character/Bot/Cops";
import {Citizens} from "../Character/Bot/Citizens";
import {Hero} from "../Character/Player/Hero";
import {Swats} from "../Character/Bot/Swats";
import {CharactersGenerator} from "../Character/CharactersGenerator";
import {AlienQueen} from "../Character/Bot/AlienQueen";

export class Street
{
    private copRepository: Cops;
    private swatRepository: Swats;
    private citizenRepository: Citizens;
    private hero: Hero;
    private queen: AlienQueen;

    constructor(generator: CharactersGenerator, lastLevel: boolean = false)
    {
        this.copRepository = new Cops();
        this.citizenRepository = new Citizens();
        this.swatRepository = new Swats();

        generator.generateBots(this, this.cops(), this.citizens(), this.swats());

        this.hero = generator.generateHero(this);
        if (lastLevel) {
            this.queen = generator.generateAlienQueen(this.hero);
        }
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
