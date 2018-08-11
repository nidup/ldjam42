
import {
    BaseEvent, CitizenKilled, CopKilled, GameEvents, HeroKilled, HeroNursed, MachineGunPicked, MoneyPicked,
    ShotGunPicked
} from "../Character/Player/Events";
import {Hero} from "../Character/Player/Hero";

export class FlashMessages
{
    private group: Phaser.Group;
    private gameEvents: GameEvents;
    private hero: Hero;

    constructor(group: Phaser.Group, gameEvents: GameEvents, hero: Hero)
    {
        this.group = group;
        this.gameEvents = gameEvents;
        this.gameEvents.addListener(this.buildMessages, this);
        this.hero = hero;
    }

    private buildMessages(raisedEvent: BaseEvent, callbackContext: any): void
    {
        const messages = [];
        if (raisedEvent instanceof CopKilled) {
            callbackContext.buildCarnageMessage(messages);
        }

        if (raisedEvent instanceof CitizenKilled) {
            callbackContext.buildCarnageMessage(messages);
        }

        if (raisedEvent instanceof ShotGunPicked) {
            callbackContext.buildFirstShotgunMessage(messages);
        }

        if (raisedEvent instanceof MachineGunPicked) {
            callbackContext.buildFirstMachinegunMessage(messages);
        }

        if (raisedEvent instanceof MoneyPicked) {
            callbackContext.buildPickedMoneyMessage(messages, raisedEvent);
        }

        if (raisedEvent instanceof HeroNursed) {
            messages.push(new Message("Got nursed :)"));
        } else if (raisedEvent instanceof HeroKilled) {
            messages.push(new Message("Got killed :("));
        }

        const x = callbackContext.hero.x - 130;
        const fromY = 500;
        let startDelay = 0;
        messages.forEach(function(message: Message) {
            const newMessage = callbackContext.group.game.add.bitmapText(x, fromY, 'cowboy', message.content(), 20);
            const duration = 3000;
            const tweenAlpha = callbackContext.group.game.add.tween(newMessage).to( { alpha: 0 }, duration, "Linear", true, startDelay);
            callbackContext.group.game.add.tween(newMessage).to( { y: newMessage.y - 400 }, duration, "Linear", true, startDelay);
            tweenAlpha.onComplete.addOnce(function () {newMessage.destroy();});
            startDelay = startDelay + 350;
        });
    }

    private buildCarnageMessage(messages: Message[])
    {
        const lastSeconds = this.group.game.time.now - 10000;
        const lastKilledEvents = this.gameEvents.all()
            .filter(function(event: BaseEvent) {
                return event instanceof CitizenKilled || event instanceof CopKilled;
            }).filter(function(event: BaseEvent) {
                return event.time() >= lastSeconds;
            });

        if (lastKilledEvents.length >= 10) {
            messages.push(new Message("Rampage! " + "more than ten kills in ten seconds!"));
        } else if (lastKilledEvents.length >= 6) {
            messages.push(new Message("Carnage! " + "more than six killed in ten seconds!"));
        } else if (lastKilledEvents.length >= 3) {
            messages.push(new Message("Butchery! " + "more than three killed in ten seconds!"));
        }
    }

    private buildFirstShotgunMessage(messages: Message[])
    {
        const shotgunPickedEvents = this.gameEvents.all().filter(function(event: BaseEvent) {
            return event instanceof ShotGunPicked;
        });
        if (shotgunPickedEvents.length === 1) {
            messages.push(new Message("Got a shotgun, hell yeah!"));
        }
    }

    private buildFirstMachinegunMessage(messages: Message[])
    {
        const machinePickedEvents = this.gameEvents.all().filter(function(event: BaseEvent) {
            return event instanceof MachineGunPicked;
        });
        if (machinePickedEvents.length === 1) {
            messages.push(new Message("Got a machinegun, hell yeah!"));
        }
    }

    private buildPickedMoneyMessage(messages: Message[], raisedEvent: MoneyPicked)
    {
        const moneyPickedEvents = this.gameEvents.all().filter(function(event: BaseEvent) {
            return event instanceof MoneyPicked;
        });
        if (raisedEvent.totalAmount() >= 100 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 100) {
            messages.push(new Message("Money! Hundred bucks picked!"));
        } else if (raisedEvent.totalAmount() >= 500 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 500) {
            messages.push(new Message("Money! Five hundred bucks picked!"));
        } else if (raisedEvent.totalAmount() >= 1000 && raisedEvent.totalAmount() - raisedEvent.pickedAmount() <= 1000) {
            messages.push(new Message("Money! Thousand bucks picked!"));
        } else if (moneyPickedEvents.length === 1) {
            messages.push(new Message("Money! "+raisedEvent.pickedAmount()+" bucks picked!"));
        }
    }
}

class Message
{
    private text: string;

    constructor(content: string)
    {
        this.text = content;
    }

    content()
    {
        return this.text;
    }
}
