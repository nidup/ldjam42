/// <reference path="../lib/phaser.d.ts"/>

import Boot from "./Game/State/Boot";
import Preload from "./Game/State/Preload";
import Menu from "./Game/State/Menu";
import Play from "./Game/State/Play";

class SimpleGame extends Phaser.Game {

    constructor()
    {
        super(
            1200,
            800,
            Phaser.CANVAS,
            'content',
            null
        );

        this.antialias = false;
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Menu', Menu);
        this.state.add('Play', Play);
        this.state.start('Boot');
    }
}

window.onload = () => {
    new SimpleGame();
};
