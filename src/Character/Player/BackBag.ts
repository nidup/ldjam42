
export class BackBag
{
    private gunAmnoAmount: number;
    private shotgunAmnoAmount: number;
    private machinegunAmnoAmount: number;
    private moneyAmount: number;

    public constructor(data: {'gunAmno': number, 'shotgunAmno': number, 'machinegunAmno': number, 'money': number})
    {
        this.gunAmnoAmount = data.gunAmno;
        this.shotgunAmnoAmount = data.shotgunAmno;
        this.machinegunAmnoAmount = data.machinegunAmno;
        this.moneyAmount = data.money;
    }

    public gunAmno(): number
    {
        return this.gunAmnoAmount;
    }

    public shotgunAmno(): number
    {
        return this.shotgunAmnoAmount;
    }

    public machinegunAmno(): number
    {
        return this.machinegunAmnoAmount;
    }

    public money(): number
    {
        return this.moneyAmount;
    }
}
