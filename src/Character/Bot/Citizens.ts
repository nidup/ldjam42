
import {Citizen} from "./Citizen";

export class Citizens
{
    private items : Citizen[];

    public constructor()
    {
        this.items = [];
    }

    public all(): Citizen[]
    {
        return this.items;
    }

    public allAlive(): Citizen[]
    {
        return this.items.filter(function (citizen: Citizen) {
            return citizen.health > 0;
        });
    }

    public add(citizen: Citizen): void
    {
        this.items.push(citizen);
    }

    public remove(citizen: Citizen): void
    {
        const index = this.items.indexOf(citizen);
        this.items.splice(index, 1);
    }

    public length(): number
    {
        return this.items.length;
    }
}
