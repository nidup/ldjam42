
import {Building} from "./Building";
import {Hospital} from "./Hospital";

export class Buildings
{
    private items : Building[];

    public constructor()
    {
        this.items = [];
    }

    public all(): Building[]
    {
        return this.items;
    }

    public add(citizen: Building): void
    {
        this.items.push(citizen);
    }

    public hospital(): Hospital
    {
        const hospitals = this.items.filter(function(building: Building) {
            return building instanceof Hospital;
        });
        return hospitals.length > 0 ? <Hospital>hospitals[0] : null;
    }

    public length(): number
    {
        return this.items.length;
    }
}
