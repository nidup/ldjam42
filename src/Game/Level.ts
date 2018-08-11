
export class Level
{
    private num: number;
    private nbSaneCitizens: number;
    private nbInfectedCitizens: number;
    private nbSaneCowboysWithGun: number;
    private nbInfectedCowboysWithGun: number;
    private nbSaneCowboysWithShotgun: number;
    private nbInfectedCowboysWithShotgun: number;
    private nbSaneCowboysWithMachinegun: number;
    private nbInfectedCowboysWithMachinegun: number;
    private tutorialText: string;
    private buildings: string[];

    constructor(num: number, data: any)
    {
        this.num = num;
        this.tutorialText = data['tutorial'];
        this.buildings = data['buildings'];
        const characters = data['characters'];
        this.nbSaneCitizens = characters['citizens']['sane'];
        this.nbInfectedCitizens = characters['citizens']['infected'];
        this.nbSaneCowboysWithGun = characters['cowboy_with_gun']['sane'];
        this.nbInfectedCowboysWithGun = characters['cowboy_with_gun']['infected'];
        this.nbSaneCowboysWithShotgun = characters['cowboy_with_shotgun']['sane'];
        this.nbInfectedCowboysWithShotgun = characters['cowboy_with_shotgun']['infected'];
        this.nbSaneCowboysWithMachinegun = characters['cowboy_with_machinegun']['sane'];
        this.nbInfectedCowboysWithMachinegun = characters['cowboy_with_machinegun']['infected'];
    }

    public number(): number
    {
        return this.num;
    }

    public saneCitizens(): number
    {
        return this.nbSaneCitizens;
    }

    public infectedCitizens(): number
    {
        return this.nbInfectedCitizens;
    }

    public saneCowboysWithGun(): number
    {
        return this.nbSaneCowboysWithGun;
    }

    public infectedCowboysWithGun(): number
    {
        return this.nbInfectedCowboysWithGun;
    }

    public saneCowboysWithShotgun(): number
    {
        return this.nbSaneCowboysWithShotgun;
    }

    public infectedCowboysWithShotgun(): number
    {
        return this.nbInfectedCowboysWithShotgun;
    }

    public saneCowboysWithMachinegun(): number
    {
        return this.nbSaneCowboysWithMachinegun;
    }

    public infectedCowboysWithMachinegun(): number
    {
        return this.nbInfectedCowboysWithMachinegun;
    }

    public tutorial(): string
    {
        return this.tutorialText;
    }

    public orderedBuildingTypes(): string[]
    {
        return this.buildings;
    }
}
