
import {Citizens} from "../Character/Bot/Citizens";
import {Hero} from "../Character/Player/Hero";
import {CharactersGenerator} from "../Character/CharactersGenerator";
import {ScoreDisplay} from "../Yolo/ScoreDisplay";

export class Street
{
    private citizenRepository: Citizens;
    private hero: Hero;
    private generator;

    constructor(generator: CharactersGenerator, lastLevel: boolean = false, scoreDisplay: ScoreDisplay)
    {
        this.citizenRepository = new Citizens();
        this.generator = generator;
        this.addPeople();

        this.hero = generator.generateHero(this, scoreDisplay);
    }

    addPeople(num = null, outOfBounds = false)
    {
        this.generator.generateBots(this, this.citizens(), num, outOfBounds);
    }

    player(): Hero
    {
        return this.hero;
    }

    citizens(): Citizens
    {
        return this.citizenRepository;
    }
}
