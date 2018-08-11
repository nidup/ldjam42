
export class Energy
{
    private amount: number;
    private randomGenerator: Phaser.RandomDataGenerator;

    constructor(randomGenerator: Phaser.RandomDataGenerator)
    {
        this.randomGenerator = randomGenerator;
        this.resetWithRandomAmount();
    }

    increase()
    {
        this.amount++;
    }

    decrease()
    {
        this.amount--;
    }

    empty(): boolean
    {
        return this.amount <= 0;
    }

    minimalAmountToMoveIsReached(): boolean
    {
        return this.amount >= 1000;
    }

    resetWithRandomAmount()
    {
        this.amount = this.randomGenerator.integerInRange(50, 5000);
    }
}
