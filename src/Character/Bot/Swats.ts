
import {Swat} from "./Swat";

export class Swats
{
    private items : Swat[];

    public constructor()
    {
        this.items = [];
    }

    public all(): Swat[]
    {
        return this.items;
    }

    public allAlive(): Swat[]
    {
        return this.items.filter(function (swat: Swat) {
            return swat.health > 0;
        });
    }

    public add(swat: Swat): void
    {
        this.items.push(swat);
    }

    public remove(swat: Swat): void
    {
        const index = this.items.indexOf(swat);
        this.items.splice(index, 1);
    }

    public length(): number
    {
        return this.items.length;
    }
}
