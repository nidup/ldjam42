
export class StreetLimits
{
    private streetPositionX: number;
    private streetWidth: number;

    constructor(streetPositionX: number, streetWidth: number)
    {
        this.streetPositionX = streetPositionX;
        this.streetWidth = streetWidth;
    }

    minY(): number
    {
        return 570;
    }

    maxY(): number
    {
        return 750;
    }

    minX(): number
    {
        return this.streetPositionX + 20;
    }

    maxX(): number
    {
        return this.streetWidth - 40;
    }
}
