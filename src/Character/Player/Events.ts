
export class GameEvents
{
    private items: BaseEvent[];
    private listeners: Listener[];

    constructor ()
    {
        this.items = [];
        this.listeners = [];
    }

    register (event: BaseEvent) {
        this.items.push(event);
        this.listeners.map(function (listener: Listener) {
            listener.callback()(event, listener.context());
        });
    }

    addListener(callback: Function, callbackContext: any)
    {
        this.listeners.push(new Listener(callback, callbackContext));
    }

    all(): BaseEvent[]
    {
        return this.items;
    }
}

class Listener
{
    private callbackFunction: Function;
    private callbackContext: any;

    constructor(callback:Function, context: any)
    {
        this.callbackFunction = callback;
        this.callbackContext = context;
    }

    public callback(): Function
    {
        return this.callbackFunction;
    }

    public context(): any
    {
        return this.callbackContext;
    }
}

export class BaseEvent
{
    private gameTime: number;

    constructor (time: number)
    {
        this.gameTime = time;
    }

    time(): number
    {
        return this.gameTime;
    }
}

export class CopKilled extends BaseEvent
{
}

export class CitizenKilled extends BaseEvent
{
}

export class HeroKilled extends BaseEvent
{
}

export class HeroNursed extends BaseEvent
{
}

export class MoneyPicked extends BaseEvent
{
    private picked: number;
    private total: number;

    constructor (time: number, amount: number, total: number)
    {
        super(time);
        this.picked = amount;
        this.total = total;
    }

    pickedAmount(): number
    {
        return this.picked;
    }

    totalAmount(): number
    {
        return this.total;
    }
}

export class GunPicked extends BaseEvent
{
}

export class ShotGunPicked extends BaseEvent
{
}

export class MachineGunPicked extends BaseEvent
{
}