
export class FearStatus
{
    private afraid: boolean = false;

    frighten()
    {
        this.afraid = true;
    }

    reassure()
    {
        this.afraid = false;
    }

    isAfraid(): boolean
    {
        return this.afraid;
    }
}
