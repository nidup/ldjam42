
import {Hero} from "../Player/Hero";
import {HorizontalDirection} from "../HorizontalDirection";
import {CitizenKilled, CopKilled} from "./Events";
import {Street} from "../../Game/Street";
import {Cop} from "../Bot/Cop";
import {Swat} from "../Bot/Swat";
import {Citizen} from "../Bot/Citizen";
import {AlienQueen} from "../Bot/AlienQueen";

export class BulletHits
{
    private shooter: Hero;
    private street: Street;

    constructor(myself: Hero, street: Street)
    {
        this.shooter = myself;
        this.street = street;
    }

    hit()
    {
        const hero = this.shooter;
        const myGun = hero.equippedGun();
        myGun.bulletHits(
            this.street.cops().allAlive(),
            function(cop: Cop, bullet: Phaser.Bullet) {
                cop.hurt(myGun.damage(), new HorizontalDirection(bullet.body));
                bullet.kill();
                if (cop.isDying()) {
                    hero.pastGameEvents().register(new CopKilled(hero.game.time.now));
                }
            }
        );

        myGun.bulletHits(
            this.street.swats().allAlive(),
            function(swat: Swat, bullet: Phaser.Bullet) {
                swat.hurt(myGun.damage(), new HorizontalDirection(bullet.body));
                bullet.kill();
                if (swat.isDying()) {
                    hero.pastGameEvents().register(new CopKilled(hero.game.time.now));
                }
            }
        );

        myGun.bulletHits(
            this.street.citizens().allAlive(),
            function(citizen: Citizen, bullet: Phaser.Bullet) {
                citizen.hurt(myGun.damage(), new HorizontalDirection(bullet.body));
                bullet.kill();
                if (citizen.isDying()) {
                    hero.pastGameEvents().register(new CitizenKilled(hero.game.time.now));
                }
            }
        );

        if (this.street.alienQueen()) {
            myGun.bulletHits(
                this.street.alienQueen(),
                function(queen: AlienQueen, bullet: Phaser.Bullet) {
                    queen.hurt(myGun.damage(), new HorizontalDirection(bullet.body));
                    bullet.kill();
                }
            );
        }
    }
}
