
import {HorizontalDirection} from "../HorizontalDirection";

export class CharacterHurt
{
    blinkHumanOrReplicant(host: Phaser.Sprite, fromDirection: HorizontalDirection, replicant: boolean)
    {
        let tint = 0xb43232;
        if (replicant) {
            tint = 0xaabcff;
        }
        this.blink(host, fromDirection, tint);
    }

    blinkHero(host: Phaser.Sprite, fromDirection: HorizontalDirection)
    {
        this.blink(host, fromDirection, 0xb43232);
    }

    private blink(host: Phaser.Sprite, fromDirection: HorizontalDirection, tint: number)
    {
        const tintTween = host.game.add.tween(host).to({
            tint: tint,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
        tintTween.onComplete.addOnce(
            function() {
                host.tint = 0xffffff;
            }
        );

        const shiftDistance = 5;
        const shiftX = fromDirection.direction() === HorizontalDirection.LEFT ? shiftDistance : -shiftDistance;
        host.game.add.tween(host).to({
            x: host.x + shiftX,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
    }
}
