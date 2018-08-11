
import {Config} from "../Config";
import {DeviceDetector} from "./DeviceDetector";

export interface Controller
{
    goingLeft(): boolean;
    goingRight(): boolean;
    goingDown(): boolean;
    goingUp(): boolean;
    shooting(): boolean;
    switchingWeapon(): boolean;
    supported(): boolean;
    identifier(): string;
}

export class KeyBoardController implements Controller
{
    private cursors: Phaser.CursorKeys;
    private shotKey: Phaser.Key;
    private switchKey: Phaser.Key;

    constructor(game: Phaser.Game)
    {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.shotKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.switchKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    }

    goingLeft(): boolean
    {
        return this.cursors.left.isDown;
    }

    goingRight(): boolean
    {
        return this.cursors.right.isDown;
    }

    goingDown(): boolean
    {
        return this.cursors.down.isDown;
    }

    goingUp(): boolean
    {
        return this.cursors.up.isDown;
    }

    shooting(): boolean
    {
        return this.shotKey.isDown;
    }

    switchingWeapon(): boolean
    {
        return this.switchKey.isDown;
    }

    supported(): boolean
    {
        return true;
    }

    identifier(): string
    {
        return 'keyboard';
    }
}

export class GamePadController implements Controller
{
    private game: Phaser.Game;
    private pad: Phaser.SinglePad;

    constructor(game: Phaser.Game)
    {
        game.input.gamepad.start();
        this.pad = game.input.gamepad.pad1;
        this.game = game;

        if (!game.input.gamepad.supported) {
            throw new Error("Game pad not supported");
        }
        if (!game.input.gamepad.active) {
            throw new Error("Game pad is inactive");
        }
    }

    supported(): boolean
    {
        return this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad.connected;
    }

    goingLeft(): boolean
    {
        return (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1);
    }

    goingRight(): boolean
    {
         return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
    }

    goingDown(): boolean
    {
         return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1;
    }

    goingUp(): boolean
    {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1;
    }

    shooting(): boolean
    {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_X);
    }

    switchingWeapon(): boolean
    {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_Y);
    }

    identifier(): string
    {
        return 'gamepad';
    }
}

export class VirtualPadController implements Controller
{
    private game: Phaser.Game;
    private buttonX: Phaser.Button;
    private buttonXPressed: boolean = false;
    private buttonY: Phaser.Button;
    private buttonYPressed: boolean = false;
    private buttonLeft: Phaser.Button;
    private buttonLeftPressed: boolean = false;
    private buttonRight: Phaser.Button;
    private buttonRightPressed: boolean = false;
    private buttonUp: Phaser.Button;
    private buttonUpPressed: boolean = false;
    private buttonDown: Phaser.Button;
    private buttonDownPressed: boolean = false;

    constructor(game: Phaser.Game)
    {
        this.game = game;
        const scaleRatio = 1.5;

        const imgPadPositionX = 90;
        const imgPadPositionY = 430;
        const imgPadFrame = '360_Dpad';
        const padImage = game.add.image(imgPadPositionX, imgPadPositionY, 'xbox360', imgPadFrame);
        padImage.scale.set(scaleRatio);
        padImage.fixedToCamera = true;

        const directionBtnAlpha = 0;
        const directionBtnPadding = 90;

        const btnLeftPositionX = imgPadPositionX - directionBtnPadding;
        const btnLeftPositionY = imgPadPositionY;
        const btnLeftFrame = '360_Dpad_Left';
        this.buttonLeft = game.add.button(btnLeftPositionX, btnLeftPositionY, 'xbox360', null, this, btnLeftFrame, btnLeftFrame, btnLeftFrame);
        this.buttonLeft.onInputUp.add(function(){ this.buttonLeftPressed = false; padImage.frameName = imgPadFrame;}, this);
        this.buttonLeft.onInputDown.add(function(){ this.buttonLeftPressed = true; padImage.frameName = btnLeftFrame;}, this);
        this.buttonLeft.alpha = directionBtnAlpha;
        this.buttonLeft.fixedToCamera = true;
        this.buttonLeft.scale.set(scaleRatio);

        const btnRightPositionX = imgPadPositionX + directionBtnPadding;
        const btnRightPositionY = imgPadPositionY;
        const btnRightFrame = '360_Dpad_Right';
        this.buttonRight = game.add.button(btnRightPositionX, btnRightPositionY, 'xbox360', null, this, btnRightFrame, btnRightFrame, btnRightFrame);
        this.buttonRight.onInputUp.add(function(){ this.buttonRightPressed = false; padImage.frameName = imgPadFrame;}, this);
        this.buttonRight.onInputDown.add(function(){ this.buttonRightPressed = true; padImage.frameName = btnRightFrame;}, this);
        this.buttonRight.alpha = directionBtnAlpha;
        this.buttonRight.fixedToCamera = true;
        this.buttonRight.scale.set(scaleRatio);

        const btnUpPositionX = imgPadPositionX;
        const btnUpPositionY = imgPadPositionY - directionBtnPadding;
        const btnUpFrame = '360_Dpad_Up';
        this.buttonUp = game.add.button(btnUpPositionX, btnUpPositionY, 'xbox360', null, this, btnUpFrame, btnUpFrame, btnUpFrame);
        this.buttonUp.onInputUp.add(function(){ this.buttonUpPressed = false; padImage.frameName = imgPadFrame;}, this);
        this.buttonUp.onInputDown.add(function(){ this.buttonUpPressed = true; padImage.frameName = btnUpFrame;}, this);
        this.buttonUp.alpha = directionBtnAlpha;
        this.buttonUp.fixedToCamera = true;
        this.buttonUp.scale.set(scaleRatio);

        const btnDownPositionX = imgPadPositionX;
        const btnDownPositionY = imgPadPositionY + directionBtnPadding;
        const btnDownFrame = '360_Dpad_Down';
        this.buttonDown = game.add.button(btnDownPositionX, btnDownPositionY, 'xbox360', null, this, btnDownFrame, btnDownFrame, btnDownFrame);
        this.buttonDown.onInputUp.add(function(){ this.buttonDownPressed = false; padImage.frameName = imgPadFrame;}, this);
        this.buttonDown.onInputDown.add(function(){ this.buttonDownPressed = true; padImage.frameName = btnDownFrame;}, this);
        this.buttonDown.alpha = directionBtnAlpha;
        this.buttonDown.fixedToCamera = true;
        this.buttonDown.scale.set(scaleRatio);

        const btnYpositionX = 930 + Config.mobileExtraSidePadding() * 2;
        const btnYpositionY = imgPadPositionY + 90;
        const btnYFrame = '360_Y';
        this.buttonY = game.add.button(btnYpositionX, btnYpositionY, 'xbox360', null, this, btnYFrame, btnYFrame, btnYFrame);
        this.buttonY.onInputUp.add(function(){ this.buttonYPressed = false}, this);
        this.buttonY.onInputDown.add(function(){ this.buttonYPressed = true}, this);
        this.buttonY.fixedToCamera = true;
        this.buttonY.scale.set(scaleRatio);

        const btnXpositionX = btnYpositionX + 110;
        const btnXpositionY = btnYpositionY - 150;
        const btnXFrame = '360_X';
        this.buttonX = game.add.button(btnXpositionX, btnXpositionY, 'xbox360', null, this, btnXFrame, btnXFrame, btnXFrame);
        this.buttonX.onInputUp.add(function(){ this.buttonXPressed = false}, this);
        this.buttonX.onInputDown.add(function(){ this.buttonXPressed = true}, this);
        this.buttonX.fixedToCamera = true;
        this.buttonX.scale.set(scaleRatio);
    }

    supported(): boolean
    {
        const detector = new DeviceDetector(this.game.device);
        return detector.isMobile();
    }

    goingLeft(): boolean
    {
        return this.buttonLeftPressed;
    }

    goingRight(): boolean
    {
        return this.buttonRightPressed;
    }

    goingDown(): boolean
    {
        return this.buttonDownPressed;
    }

    goingUp(): boolean
    {
        return this.buttonUpPressed;
    }

    shooting(): boolean
    {
        return this.buttonXPressed;
    }

    switchingWeapon(): boolean
    {
        return this.buttonYPressed;
    }

    identifier(): string
    {
        return 'virtualpad';
    }
}
