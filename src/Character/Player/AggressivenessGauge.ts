
export class AggressivenessGauge
{
    private aggressiveRating : number = 0;
    private time: Phaser.Time;

    constructor(time: Phaser.Time)
    {
        this.time = time;
    }

    increase()
    {
        this.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
            this.aggressiveRating++;
        }, this);
        this.time.events.add(Phaser.Timer.SECOND * 4, function () {
            this.aggressiveRating--;
        }, this);
    }

    isAggressive()
    {
        return this.aggressiveRating > 0;
    }
}
