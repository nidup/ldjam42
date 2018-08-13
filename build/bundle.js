/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static pixelScaleRatio() {
        return 2;
    }
    static mobileExtraSidePadding() {
        return 250;
    }
    static fakingMobileForDebug() {
        return false;
    }
    static debug() {
        return false;
    }
}
exports.Config = Config;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const CharacterHurt_1 = __webpack_require__(5);
const Hero_1 = __webpack_require__(4);
const reactionsWithSounds = {
    'hey!': ['hey', 'hey1', 'hey2', 'hey3', 'hey4'],
    'dude...': ['dude'],
    'no worries mate': ['no-worries-mates', 'noworries2'],
    'want some?': ['heyman-want-some', 'wantsome2'],
    'STAHP': ['stap-go-away', 'stap2'],
    'what the.': ['what-de'],
    ':|': ['ouuuufffw', 'ouuuuuffff2'],
    'FU': ['huuuuum'],
    'don\'t touch my boobs': ['dont-touch-my-boobs'],
    'you wanna dance?': ['youwannadance'],
    'calm down': ['calm-down'],
    'fuck you': ['fuckyou1', 'fuckyou2', 'fuckyou3', 'fuckyou4', 'fuckyou5'],
    'burp': ['rototo2', 'rototo', 'bruitdegerbe3', 'bruitedegerb2', 'bruitdegerb', 'ouuuufffw', 'ouuuuuffff2', 'huuuuum', 'ouuuufffw', 'ouuuuuffff2', 'huuuuum']
};
const playerApologizes = ['sorry-o-sorry', 'oups-sorry', 'iaaaam-so-sorry',
    'sorry1', 'sorry3', 'sorry6', 'sorry9', 'sorry2', 'sorry5', 'sorry8', 'sorry4', 'sorry7', 'sorry10'];
exports.TEXT_STYLE = {
    align: 'center',
    fill: '#fff',
    font: '8px PICO-8'
};
exports.TEXT_STYLE_BIG = {
    align: 'center',
    fill: '#fff',
    font: '28px PICO-8'
};
exports.TEXT_STYLE_SCORE = {
    align: 'center',
    fill: '#fff',
    font: '30px PICO-8'
};
exports.TEXT_STYLE_MIDDLE = {
    align: 'center',
    fill: '#fff',
    font: '14px PICO-8'
};
exports.TEXT_STYLE_HUGE = {
    align: 'center',
    fill: '#fff',
    font: '60px PICO-8'
};
class Citizen extends Phaser.Sprite {
    constructor(group, x, y, key, street, replicant) {
        super(group.game, x, y, key, 0);
        this.isReplicant = false;
        this.venere = false;
        this.circlePitCenter = null;
        this.wallOfDeath = null;
        this.fightY = null;
        this.exiting = false;
        this.isFighing = false;
        this.isHellyeahing = false;
        this.startingPosition = new PIXI.Point(x, y);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.inputEnabled = true;
        this.scale.setTo(-Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(4, 5, 18);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        //this.body.immovable = Math.random() > 0.95;
        this.body.maxVelocity.set(1, 1);
        const idleRate = 2 + (Math.random() * 10);
        this.animations.add('idle', [12, 13, 14], idleRate, true);
        this.animations.add('walk', [0, 1, 2, 3, 4, 5], 12, true);
        let smokeFrames = [24, 25, 26, 27, 28, 29, 30, 31];
        for (let i = 0; i < 6; i++) {
            // Take smoke length
            smokeFrames.push(31);
        }
        smokeFrames = smokeFrames.concat([30, 29, 28, 27, 26, 25, 24]);
        for (let i = 0; i < 20; i++) {
            // Do nothing length
            smokeFrames.push(24);
        }
        const smokeRate = 4 + (Math.random() * 4);
        this.animations.add('smoke', smokeFrames, smokeRate, true);
        const talkRate = 4 + (Math.random() * 4);
        this.animations.add('talk', [40, 41, 42, 43, 44, 45], talkRate, true);
        const drinkRate = 4 + (Math.random() * 4);
        this.animations.add('drink', [52, 53, 52, 52, 52, 54, 55, 55, 56, 55, 55, 56, 55, 54, 52, 52, 52, 52, 52, 52, 52], drinkRate, true);
        this.animations.add('nervous', [57, 58, 59, 60, 61, 62, 63, 64, 65, 64, 65, 64, 65, 66, 67], 12, true);
        this.animations.add('hell', [88, 89, 88, 89, 88, 89], 7, true);
        this.street = street;
        this.playRandomAnim();
    }
    playRandomAnim() {
        const randAnim = Math.random();
        if (randAnim < 0.25) {
            this.animations.play('idle');
            // } else if (randAnim < 0.4) {
            // this.animations.play('hell');
        }
        else if (randAnim < 0.5) {
            this.animations.play('smoke');
        }
        else if (randAnim < 0.75) {
            this.animations.play('talk');
        }
        else {
            this.animations.play('drink');
        }
    }
    update() {
        const previousX = this.x;
        if (this.isHellyeahing) {
            return;
        }
        if (!this.exiting && this.body.offset.x < 5) {
            this.body.setCircle(4, Math.min(this.body.offset.x + 0.3, 5), 18);
        }
        if (this.exiting) {
            this.body.collideWorldBounds = false;
            this.x -= 1;
            if (this.x < -20) {
                this.destroy(true);
            }
            return;
        }
        if (this.exitZone) {
            if (this.exitZone.isIn(this.position)) {
                this.exiting = true;
                return;
            }
            this.rapprocheToiDe(new PIXI.Point(0, 350), 2.5);
        }
        if (this.circlePitCenter) {
            const y = this.y - this.circlePitCenter.y;
            const x = this.x - this.circlePitCenter.x;
            const dist = Phaser.Math.distance(this.x, this.y, this.circlePitCenter.x, this.circlePitCenter.y);
            const currentAngle = Math.atan2(y, x);
            const desiredLength = 3;
            const fullCircleLength = Math.PI * 2 * dist;
            const percentage = desiredLength / fullCircleLength;
            const newAngle = currentAngle + Math.PI * 2 * percentage;
            this.x = this.circlePitCenter.x + Math.cos(newAngle) * dist;
            this.y = this.circlePitCenter.y + Math.sin(newAngle) * dist;
            if (this.animations.currentAnim.name !== 'walk') {
                this.animations.play('walk');
            }
            this.mirrorIfNeeded(previousX);
            return;
        }
        if (this.wallOfDeath) {
            if (Phaser.Math.distance(this.x, this.y, this.wallOfDeath.x, this.wallOfDeath.y) > 2) {
                this.rapprocheToiDe(this.wallOfDeath);
                this.mirrorIfNeeded(previousX);
            }
            else {
                if (this.animations.currentAnim.name !== 'hell') {
                    this.animations.play('hell');
                }
            }
            return;
        }
        if (this.fightY) {
            if (Phaser.Math.distance(this.x, this.y, this.x, this.fightY) > 1) {
                this.rapprocheToiDe(new PIXI.Point(this.x, this.fightY), 3);
                this.mirrorIfNeeded(previousX);
            }
            else {
                this.isFighing = true;
                this.fightY = null;
            }
        }
        if (this.isFighing) {
            const moveY = 6;
            const moveX = 1;
            const ecartement = 0.4;
            this.x += -moveX / 2 + Math.random() * moveX;
            if (this.y > 400) {
                this.y += -moveY / 2 + Math.random() * moveY + ecartement;
            }
            else {
                this.y += -moveY / 2 + Math.random() * moveY - ecartement;
            }
            if (Math.random() > 0.99) {
                this.fightY = 400;
                this.isFighing = false;
            }
            return;
        }
        /*if (this.x > 910) {
            this.x = 800;
        }*/
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add((citizen, other) => {
            if (!this.exiting) {
                if (other instanceof Hero_1.Hero) {
                    if (this.venere == false) {
                        this.venere = true;
                        this.animations.play('nervous');
                        this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
                            this.playRandomAnim();
                            this.venere = false;
                        }, this);
                    }
                    this.animations.play('nervous');
                    let allSounds = Object.keys(reactionsWithSounds).reduce((acc, key) => {
                        return acc.concat(reactionsWithSounds[key]);
                    }, []);
                    let soundName = allSounds[Math.floor(Math.random() * allSounds.length)];
                    let text = Object.keys(reactionsWithSounds).find((key) => {
                        return reactionsWithSounds[key].indexOf(soundName) >= 0;
                    });
                    if (!this.text) {
                        this.text = this.game.add.text(this.x, this.y, text, exports.TEXT_STYLE);
                        this.text.alpha = Math.max(1.1 - this.street.citizens().all().filter((citizen) => {
                            return citizen.isVenere();
                        }).length * 0.1, 0.6);
                        const venereAudio = this.game.add.audio(soundName, 0.6, false);
                        venereAudio.play();
                        this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                            let sorryName = playerApologizes[Math.floor(Math.random() * playerApologizes.length)];
                            if (this.game) {
                                const sorryAudio = this.game.add.audio(sorryName, 1.0, false);
                                sorryAudio.play();
                            }
                        }, this);
                        let ref = this.text;
                        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                            ref.destroy();
                            this.text = null;
                        }, this);
                    }
                }
            }
        });
        if (this.isTooFarFromStartingPosition()) {
            this.rapprocheToiDeTaStartingPosition();
        }
        else {
            if (this.animations.currentAnim.name === 'walk') {
                this.playRandomAnim();
            }
        }
        if (Math.random() > 0.995) {
            // Random move
            const max = 50;
            const newStartingPosition = new PIXI.Point(this.startingPosition.x + Math.random() * max - max / 2, this.startingPosition.y + Math.random() * max - max / 2);
            if (newStartingPosition.x < 900 && newStartingPosition.x > 0 && newStartingPosition.y > 20 && newStartingPosition.y < 780) {
                const yolo = this.street.citizens().all().find((citizen) => {
                    const distance = Phaser.Math.distance(newStartingPosition.x, newStartingPosition.y, citizen.x, citizen.y) < 20;
                    const distance2 = Phaser.Math.distance(newStartingPosition.x, newStartingPosition.y, citizen.startingPosition.x, citizen.startingPosition.y) < 20;
                    const c_est_moi = citizen === this;
                    return distance && distance2 && !c_est_moi;
                });
                if (!yolo) {
                    this.startingPosition = newStartingPosition;
                }
            }
        }
        this.mirrorIfNeeded(previousX);
    }
    isVenere() {
        return this.venere;
    }
    exit(zone) {
        this.game.time.events.add(Math.random() * 20 * Phaser.Timer.SECOND, () => {
            this.exitZone = zone;
        });
    }
    die() {
    }
    run() {
        this.animations.play('run');
    }
    walk() {
        this.animations.play('walk');
    }
    rest() {
        this.animations.play('idle');
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHumanOrReplicant(this, fromDirection, this.replicant());
    }
    isDead() {
        // TODO Remove
        return false;
    }
    isDying() {
        return this.health <= 0;
    }
    isAfraid() {
        return this.fearStatus.isAfraid();
    }
    replicant() {
        return this.isReplicant;
    }
    isTooFarFromStartingPosition() {
        return Phaser.Math.distance(this.x, this.y, this.startingPosition.x, this.startingPosition.y) > 3;
    }
    rapprocheToiDe(point, speed = 0.8) {
        const dist = Phaser.Math.distance(this.x, this.y, point.x, point.y) / speed;
        const vector = new PIXI.Point((this.x - point.x) / dist, (this.y - point.y) / dist);
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
        if (this.animations.currentAnim.name !== 'walk' && this.animations.currentAnim.name !== 'nervous') {
            this.animations.play('walk');
        }
    }
    rapprocheToiDeTaStartingPosition() {
        this.rapprocheToiDe(this.startingPosition);
    }
    setCirclePitCenter(center) {
        this.circlePitCenter = center;
    }
    goTopForWallOfDeath(height, x) {
        const wodHeight = 120;
        const a = wodHeight / height;
        const b = 400 - height + wodHeight - (400 * wodHeight) / height;
        this.wallOfDeath = new PIXI.Point(x, a * this.y + b);
    }
    goBottomForWallOfDeath(height, x) {
        const wodHeight = 120;
        const a = wodHeight / height;
        const b = 400 + height - wodHeight - (400 * wodHeight) / height;
        this.wallOfDeath = new PIXI.Point(x, a * this.y + b);
    }
    fight() {
        const gap = 40;
        if (this.wallOfDeath.y > 400) {
            this.fightY = 400 + (this.wallOfDeath.y - 400) / 5 - gap;
        }
        else {
            this.fightY = 400 - (400 - this.wallOfDeath.y) / 5 + gap;
        }
        this.wallOfDeath = null;
    }
    stopFight() {
        this.fightY = null;
        this.isFighing = false;
    }
    mirrorIfNeeded(previousX) {
        if (this.x < previousX) {
            if (this.scale.x < 0) {
                this.scale.x = -this.scale.x;
            }
        }
        else if (this.x > previousX) {
            if (this.scale.x > 0) {
                this.scale.x = -this.scale.x;
            }
        }
        else {
            if (this.scale.x > 0) {
                this.scale.x = -this.scale.x;
            }
        }
    }
    canHellYeah() {
        return this.animations.currentAnim.name !== 'walk';
    }
    hellYeah(duration) {
        this.isHellyeahing = true;
        this.animations.play('hell');
        this.game.time.events.add(Phaser.Timer.SECOND * duration * Math.random(), () => {
            this.playRandomAnim();
            this.isHellyeahing = false;
        });
    }
    ;
}
exports.Citizen = Citizen;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BLINKCOLOR = 0x3333FF;
exports.BLINKINCOLOR = 0x05FE73;
class MetalMovement {
}
exports.MetalMovement = MetalMovement;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
const DeviceDetector_1 = __webpack_require__(6);
class KeyBoardController {
    constructor(game) {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.shotKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.switchKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    }
    goingLeft() {
        return this.cursors.left.isDown;
    }
    goingRight() {
        return this.cursors.right.isDown;
    }
    goingDown() {
        return this.cursors.down.isDown;
    }
    goingUp() {
        return this.cursors.up.isDown;
    }
    shooting() {
        return this.shotKey.justDown;
    }
    switchingWeapon() {
        return this.switchKey.isDown;
    }
    supported() {
        return true;
    }
    identifier() {
        return 'keyboard';
    }
}
exports.KeyBoardController = KeyBoardController;
class GamePadController {
    constructor(game) {
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
    supported() {
        return this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad.connected;
    }
    goingLeft() {
        return (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1);
    }
    goingRight() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
    }
    goingDown() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1;
    }
    goingUp() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1;
    }
    shooting() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_X);
    }
    switchingWeapon() {
        return this.pad.isDown(Phaser.Gamepad.XBOX360_Y);
    }
    identifier() {
        return 'gamepad';
    }
}
exports.GamePadController = GamePadController;
class VirtualPadController {
    constructor(game) {
        this.buttonXPressed = false;
        this.buttonYPressed = false;
        this.buttonLeftPressed = false;
        this.buttonRightPressed = false;
        this.buttonUpPressed = false;
        this.buttonDownPressed = false;
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
        this.buttonLeft.onInputUp.add(function () { this.buttonLeftPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonLeft.onInputDown.add(function () { this.buttonLeftPressed = true; padImage.frameName = btnLeftFrame; }, this);
        this.buttonLeft.alpha = directionBtnAlpha;
        this.buttonLeft.fixedToCamera = true;
        this.buttonLeft.scale.set(scaleRatio);
        const btnRightPositionX = imgPadPositionX + directionBtnPadding;
        const btnRightPositionY = imgPadPositionY;
        const btnRightFrame = '360_Dpad_Right';
        this.buttonRight = game.add.button(btnRightPositionX, btnRightPositionY, 'xbox360', null, this, btnRightFrame, btnRightFrame, btnRightFrame);
        this.buttonRight.onInputUp.add(function () { this.buttonRightPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonRight.onInputDown.add(function () { this.buttonRightPressed = true; padImage.frameName = btnRightFrame; }, this);
        this.buttonRight.alpha = directionBtnAlpha;
        this.buttonRight.fixedToCamera = true;
        this.buttonRight.scale.set(scaleRatio);
        const btnUpPositionX = imgPadPositionX;
        const btnUpPositionY = imgPadPositionY - directionBtnPadding;
        const btnUpFrame = '360_Dpad_Up';
        this.buttonUp = game.add.button(btnUpPositionX, btnUpPositionY, 'xbox360', null, this, btnUpFrame, btnUpFrame, btnUpFrame);
        this.buttonUp.onInputUp.add(function () { this.buttonUpPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonUp.onInputDown.add(function () { this.buttonUpPressed = true; padImage.frameName = btnUpFrame; }, this);
        this.buttonUp.alpha = directionBtnAlpha;
        this.buttonUp.fixedToCamera = true;
        this.buttonUp.scale.set(scaleRatio);
        const btnDownPositionX = imgPadPositionX;
        const btnDownPositionY = imgPadPositionY + directionBtnPadding;
        const btnDownFrame = '360_Dpad_Down';
        this.buttonDown = game.add.button(btnDownPositionX, btnDownPositionY, 'xbox360', null, this, btnDownFrame, btnDownFrame, btnDownFrame);
        this.buttonDown.onInputUp.add(function () { this.buttonDownPressed = false; padImage.frameName = imgPadFrame; }, this);
        this.buttonDown.onInputDown.add(function () { this.buttonDownPressed = true; padImage.frameName = btnDownFrame; }, this);
        this.buttonDown.alpha = directionBtnAlpha;
        this.buttonDown.fixedToCamera = true;
        this.buttonDown.scale.set(scaleRatio);
        const btnYpositionX = 930 + Config_1.Config.mobileExtraSidePadding() * 2;
        const btnYpositionY = imgPadPositionY + 90;
        const btnYFrame = '360_Y';
        this.buttonY = game.add.button(btnYpositionX, btnYpositionY, 'xbox360', null, this, btnYFrame, btnYFrame, btnYFrame);
        this.buttonY.onInputUp.add(function () { this.buttonYPressed = false; }, this);
        this.buttonY.onInputDown.add(function () { this.buttonYPressed = true; }, this);
        this.buttonY.fixedToCamera = true;
        this.buttonY.scale.set(scaleRatio);
        const btnXpositionX = btnYpositionX + 110;
        const btnXpositionY = btnYpositionY - 150;
        const btnXFrame = '360_X';
        this.buttonX = game.add.button(btnXpositionX, btnXpositionY, 'xbox360', null, this, btnXFrame, btnXFrame, btnXFrame);
        this.buttonX.onInputUp.add(function () { this.buttonXPressed = false; }, this);
        this.buttonX.onInputDown.add(function () { this.buttonXPressed = true; }, this);
        this.buttonX.fixedToCamera = true;
        this.buttonX.scale.set(scaleRatio);
    }
    supported() {
        const detector = new DeviceDetector_1.DeviceDetector(this.game.device);
        return detector.isMobile();
    }
    goingLeft() {
        return this.buttonLeftPressed;
    }
    goingRight() {
        return this.buttonRightPressed;
    }
    goingDown() {
        return this.buttonDownPressed;
    }
    goingUp() {
        return this.buttonUpPressed;
    }
    shooting() {
        return this.buttonXPressed;
    }
    switchingWeapon() {
        return this.buttonYPressed;
    }
    identifier() {
        return 'virtualpad';
    }
}
exports.VirtualPadController = VirtualPadController;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Gun_1 = __webpack_require__(24);
const Events_1 = __webpack_require__(13);
const CharacterHurt_1 = __webpack_require__(5);
const HeroCamera_1 = __webpack_require__(14);
const Config_1 = __webpack_require__(0);
const AggressivenessGauge_1 = __webpack_require__(11);
class Hero extends Phaser.Sprite {
    constructor(group, x, y, key, street, backbag, controller, gunIdentifier, scoreDisplay) {
        super(group.game, x, y, key, 0);
        this.speed = 150;
        this.switchedTime = 0;
        this.dead = false;
        this.moneyAmount = 0;
        this.points = 0;
        this.energy = 100;
        this.finished = false;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.group = group;
        this.scoreDisplay = scoreDisplay;
        this.inputEnabled = true;
        this.scale.setTo(-Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(10, 0, 14);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.gun = new Gun_1.Gun(group, this, backbag.gunAmno());
        this.currentGun = this.gun;
        this.moneyAmount = backbag.money();
        this.animations.add('idle', [100, 101, 102], 8, true);
        this.animations.add('walk', [94, 95, 96, 97, 98, 99], 8, true);
        this.animations.add('die', [0], 12, false);
        this.animations.add('sorry', [103, 104, 105, 106, 107, 108], 8, false);
        this.animations.add('recule', [116, 117, 118, 119, 120, 121], 16, true);
        this.controller = controller;
        this.cameraFx = new HeroCamera_1.HeroCamera(group.game.camera);
        this.gameEvents = new Events_1.GameEvents();
        this.citizens = street.citizens();
        this.agressivenessGauge = new AggressivenessGauge_1.AggressivenessGauge(this.game.time);
    }
    update() {
        if (this.exitZone && this.exitZone.isIn(this.position)) {
            this.finished = true;
        }
        let swithAnim = true;
        let angryCount = this.citizens.all().filter(citizen => citizen.text).length;
        if (angryCount > 2 && this.x > 0) {
            if (this.animations.currentAnim.name !== 'recule') {
                this.animations.play('recule', 16, true);
            }
            this.body.checkCollision.none = !this.movingToTheRight();
            this.x -= 1;
            this.y += (Math.random() - 0.5) * 4;
            swithAnim = false;
        }
        else {
            this.body.checkCollision.none = false;
        }
        this.controls(swithAnim);
        this.mirrorIfNeeded();
        if (this.x < 20) {
            this.x = 20;
        }
    }
    equippedGun() {
        return this.gun;
    }
    hurt(damage, fromDirection) {
        this.health -= damage;
        const fx = new CharacterHurt_1.CharacterHurt();
        fx.blinkHero(this, fromDirection);
    }
    isDying() {
        return this.health <= 0;
    }
    movingToTheRight() {
        return this.body.velocity.x > 0;
    }
    movingToTheLeft() {
        return this.body.velocity.x < 0;
    }
    isAggressive() {
        return this.agressivenessGauge.isAggressive();
    }
    isDead() {
        return this.dead;
    }
    money() {
        return this.moneyAmount;
    }
    gunAmno() {
        return this.gun.amno();
    }
    pick(item) {
        if (item.key === 'Money') {
            //const audio = this.game.add.audio('pick-money', 0.5, false);
            //audio.play();
            const randAmount = this.game.rnd.integerInRange(2, 50);
            this.moneyAmount = this.moneyAmount + randAmount;
            this.gameEvents.register(new Events_1.MoneyPicked(this.game.time.now, randAmount, this.moneyAmount));
        }
        item.kill();
    }
    pastGameEvents() {
        return this.gameEvents;
    }
    controls(switchAnim) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        let angryCount = this.citizens.all().filter(citizen => citizen.text).length;
        let walkAnimName = 'walk';
        if (angryCount > 0) {
            walkAnimName = 'sorry';
        }
        if (this.controller.shooting()) {
            this.energy = Math.max(0, this.energy - 4);
            if (switchAnim) {
                this.animations.play(walkAnimName);
            }
            if (this.energy) {
                this.x += 8;
                this.y += -2 + Math.random() * 4;
                this.scoreDisplay.animPushing();
                const change = 1;
                const minRadius = 3;
                const radius = this.body.radius - change;
                if (radius > minRadius) {
                    this.body.setCircle(radius, 10 - radius, 14);
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                        this.body.setCircle(this.body.radius + change, 10 - this.body.radius, 14);
                    });
                }
            }
        }
        else {
            this.scale.x = -Config_1.Config.pixelScaleRatio();
            if (this.controller.goingLeft()) {
                this.body.velocity.x = -this.speed;
                this.gun.turnToTheLeft();
                if (switchAnim) {
                    this.animations.play(walkAnimName);
                }
            }
            else if (this.controller.goingRight()) {
                this.body.velocity.x = this.speed;
                this.gun.turnToTheRight();
                if (switchAnim) {
                    this.animations.play(walkAnimName);
                }
            }
            if (this.controller.goingUp()) {
                this.body.velocity.y = -this.speed;
                if (switchAnim) {
                    this.animations.play(walkAnimName);
                }
            }
            else if (this.controller.goingDown()) {
                this.body.velocity.y = this.speed;
                if (switchAnim) {
                    this.animations.play(walkAnimName);
                }
            }
            if (!this.controller.goingLeft() && !this.controller.goingRight() && !this.controller.goingDown() && !this.controller.goingUp()) {
                if (switchAnim) {
                    this.animations.play('idle');
                }
            }
        }
    }
    shot() {
        //this.animations.play('sorry');
        //this.currentGun.fire();
        //this.shotCameraEffects();
        //this.agressivenessGauge.increase();
    }
    shotCameraEffects() {
        this.cameraFx.gunEffect();
    }
    die() {
        if (!this.dead) {
            /*
            const audio = this.game.add.audio('human-dying', 0.5, false);
            audio.play();*/
            this.dead = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('die');
            this.gameEvents.register(new Events_1.HeroKilled(this.game.time.now));
        }
    }
    mirrorIfNeeded() {
        if (this.body.velocity.x < 0) {
            if (this.scale.x < 0) {
                this.scale.x = -this.scale.x;
            }
        }
        else if (this.body.velocity.x > 0) {
            if (this.scale.x > 0) {
                this.scale.x = -this.scale.x;
            }
        }
        else {
            if (this.scale.x > 0) {
                this.scale.x = -this.scale.x;
            }
        }
    }
    exit(zone) {
        this.exitZone = zone;
    }
}
exports.Hero = Hero;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HorizontalDirection_1 = __webpack_require__(10);
class CharacterHurt {
    blinkHumanOrReplicant(host, fromDirection, replicant) {
        let tint = 0xb43232;
        if (replicant) {
            tint = 0xaabcff;
        }
        this.blink(host, fromDirection, tint);
    }
    blinkHero(host, fromDirection) {
        this.blink(host, fromDirection, 0xb43232);
    }
    blink(host, fromDirection, tint) {
        const tintTween = host.game.add.tween(host).to({
            tint: tint,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
        tintTween.onComplete.addOnce(function () {
            host.tint = 0xffffff;
        });
        const shiftDistance = 5;
        const shiftX = fromDirection.direction() === HorizontalDirection_1.HorizontalDirection.LEFT ? shiftDistance : -shiftDistance;
        host.game.add.tween(host).to({
            x: host.x + shiftX,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
    }
}
exports.CharacterHurt = CharacterHurt;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __webpack_require__(0);
class DeviceDetector {
    constructor(device) {
        this.device = device;
    }
    isMobile() {
        return !this.device.desktop || Config_1.Config.fakingMobileForDebug();
    }
}
exports.DeviceDetector = DeviceDetector;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(17);
const Preload_1 = __webpack_require__(20);
const Menu_1 = __webpack_require__(18);
const Play_1 = __webpack_require__(19);
const Score_1 = __webpack_require__(21);
class SimpleGame extends Phaser.Game {
    constructor() {
        super(1200, 800, Phaser.CANVAS, 'content', null);
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Menu', Menu_1.default);
        this.state.add('Play', Play_1.default);
        this.state.add('Score', Score_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Citizens {
    constructor() {
        this.items = [];
    }
    all() {
        return this.items;
    }
    allAlive() {
        return this.items.filter(function (citizen) {
            return citizen.health > 0;
        });
    }
    add(citizen) {
        this.items.push(citizen);
    }
    remove(citizen) {
        const index = this.items.indexOf(citizen);
        this.items.splice(index, 1);
    }
    length() {
        return this.items.length;
    }
}
exports.Citizens = Citizens;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Hero_1 = __webpack_require__(4);
const Citizen_1 = __webpack_require__(1);
class CharactersGenerator {
    constructor(characterGroup, limits, level, backbag, heroController, heroGunType, heroPosition) {
        this.limits = limits;
        this.characterGroup = characterGroup;
        this.level = level;
        this.backbag = backbag;
        this.controller = heroController;
        this.heroGunType = heroGunType;
        this.heroPosition = heroPosition;
    }
    generateHero(street, scoreDisplay) {
        const x = (this.heroPosition) ? this.heroPosition.x : 100;
        const y = (this.heroPosition) ? this.heroPosition.y : 370;
        return new Hero_1.Hero(this.characterGroup, x, y, 'hero', street, this.backbag, this.controller, this.heroGunType, scoreDisplay);
    }
    generateRandomPosition(citizens) {
        const sceneCenter = new PIXI.Point(1000, 400);
        const radiusMax = 950;
        const radiusMin = 100;
        const radiusMed = 400;
        let circlesTries = 500;
        while (circlesTries > 0) {
            const randForCircle = Math.random();
            const radius = (-4 * radiusMin + 4 * radiusMed) * randForCircle * randForCircle
                + (radiusMax + 3 * radiusMin - 4 * radiusMed) * randForCircle
                + radiusMin;
            let angleTries = 500;
            while (angleTries > 0) {
                const randomAngle = Math.random() * Math.PI * 2;
                const pos = new PIXI.Point(sceneCenter.x + Math.cos(randomAngle) * radius, sceneCenter.y + Math.sin(randomAngle) * radius);
                if (pos.x > 0 && pos.x < 900 && pos.y > 20 && pos.y < 770
                    && this.thereIsNoCitizenUnder(citizens, pos)) {
                    return pos;
                }
                angleTries--;
            }
            circlesTries--;
        }
        return null;
    }
    generateBots(street, citizens, num = null, outOfBounds = false) {
        for (let indCiv = 0; indCiv < (num || this.level.saneCitizens()); indCiv++) {
            const position = this.generateRandomPosition(citizens);
            if (position) {
                let citizen = new Citizen_1.Citizen(this.characterGroup, position.x, position.y, Math.random() > 0.5 ? 'citizen1' : 'citizen2', street, false);
                citizens.add(citizen);
                if (outOfBounds) {
                    citizen.x = -15;
                    citizen.body.setCircle(4, -20, 18);
                    citizen.y = Math.random() * 800;
                }
            }
        }
    }
    thereIsNoCitizenUnder(citizens, pos) {
        return citizens.all().find((citizen) => {
            const dist = Phaser.Math.distance(citizen.x, citizen.y, pos.x, pos.y);
            return dist < 20;
        }) == null;
    }
}
exports.CharactersGenerator = CharactersGenerator;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HorizontalDirection {
    constructor(body) {
        this.body = body;
    }
    direction() {
        return this.body.facing == 2 ? HorizontalDirection.LEFT : HorizontalDirection.RIGHT;
    }
}
HorizontalDirection.LEFT = -1;
HorizontalDirection.RIGHT = 1;
exports.HorizontalDirection = HorizontalDirection;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AggressivenessGauge {
    constructor(time) {
        this.aggressiveRating = 0;
        this.time = time;
    }
    increase() {
        this.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
            this.aggressiveRating++;
        }, this);
        this.time.events.add(Phaser.Timer.SECOND * 4, function () {
            this.aggressiveRating--;
        }, this);
    }
    isAggressive() {
        return this.aggressiveRating > 0;
    }
}
exports.AggressivenessGauge = AggressivenessGauge;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BackBag {
    constructor(data) {
        this.gunAmnoAmount = data.gunAmno;
        this.shotgunAmnoAmount = data.shotgunAmno;
        this.machinegunAmnoAmount = data.machinegunAmno;
        this.moneyAmount = data.money;
    }
    gunAmno() {
        return this.gunAmnoAmount;
    }
    shotgunAmno() {
        return this.shotgunAmnoAmount;
    }
    machinegunAmno() {
        return this.machinegunAmnoAmount;
    }
    money() {
        return this.moneyAmount;
    }
}
exports.BackBag = BackBag;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameEvents {
    constructor() {
        this.items = [];
        this.listeners = [];
    }
    register(event) {
        this.items.push(event);
        this.listeners.map(function (listener) {
            listener.callback()(event, listener.context());
        });
    }
    addListener(callback, callbackContext) {
        this.listeners.push(new Listener(callback, callbackContext));
    }
    all() {
        return this.items;
    }
}
exports.GameEvents = GameEvents;
class Listener {
    constructor(callback, context) {
        this.callbackFunction = callback;
        this.callbackContext = context;
    }
    callback() {
        return this.callbackFunction;
    }
    context() {
        return this.callbackContext;
    }
}
class BaseEvent {
    constructor(time) {
        this.gameTime = time;
    }
    time() {
        return this.gameTime;
    }
}
exports.BaseEvent = BaseEvent;
class CopKilled extends BaseEvent {
}
exports.CopKilled = CopKilled;
class CitizenKilled extends BaseEvent {
}
exports.CitizenKilled = CitizenKilled;
class HeroKilled extends BaseEvent {
}
exports.HeroKilled = HeroKilled;
class HeroNursed extends BaseEvent {
}
exports.HeroNursed = HeroNursed;
class MoneyPicked extends BaseEvent {
    constructor(time, amount, total) {
        super(time);
        this.picked = amount;
        this.total = total;
    }
    pickedAmount() {
        return this.picked;
    }
    totalAmount() {
        return this.total;
    }
}
exports.MoneyPicked = MoneyPicked;
class GunPicked extends BaseEvent {
}
exports.GunPicked = GunPicked;
class ShotGunPicked extends BaseEvent {
}
exports.ShotGunPicked = ShotGunPicked;
class MachineGunPicked extends BaseEvent {
}
exports.MachineGunPicked = MachineGunPicked;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HeroCamera {
    constructor(camera) {
        this.camera = camera;
    }
    shootgunEffect() {
        this.camera.shake(0.003, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    machinegunEffect() {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    gunEffect() {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }
    warningEffect() {
        this.camera.flash(0xf04b36, 1000, false, 0.2);
    }
    dyingEffect() {
        this.camera.flash(0xb43232, 10000, false, 0.2);
    }
}
exports.HeroCamera = HeroCamera;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Level {
    constructor(num, data) {
        this.num = num;
        this.tutorialText = data['tutorial'];
        this.buildings = data['buildings'];
        const characters = data['characters'];
        this.nbSaneCitizens = characters['citizens']['sane'];
        this.nbInfectedCitizens = characters['citizens']['infected'];
        this.nbSaneCowboysWithGun = characters['cowboy_with_gun']['sane'];
        this.nbInfectedCowboysWithGun = characters['cowboy_with_gun']['infected'];
        this.nbSaneCowboysWithShotgun = characters['cowboy_with_shotgun']['sane'];
        this.nbInfectedCowboysWithShotgun = characters['cowboy_with_shotgun']['infected'];
        this.nbSaneCowboysWithMachinegun = characters['cowboy_with_machinegun']['sane'];
        this.nbInfectedCowboysWithMachinegun = characters['cowboy_with_machinegun']['infected'];
    }
    number() {
        return this.num;
    }
    saneCitizens() {
        return this.nbSaneCitizens;
    }
    infectedCitizens() {
        return this.nbInfectedCitizens;
    }
    saneCowboysWithGun() {
        return this.nbSaneCowboysWithGun;
    }
    infectedCowboysWithGun() {
        return this.nbInfectedCowboysWithGun;
    }
    saneCowboysWithShotgun() {
        return this.nbSaneCowboysWithShotgun;
    }
    infectedCowboysWithShotgun() {
        return this.nbInfectedCowboysWithShotgun;
    }
    saneCowboysWithMachinegun() {
        return this.nbSaneCowboysWithMachinegun;
    }
    infectedCowboysWithMachinegun() {
        return this.nbInfectedCowboysWithMachinegun;
    }
    tutorial() {
        return this.tutorialText;
    }
    orderedBuildingTypes() {
        return this.buildings;
    }
}
exports.Level = Level;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Level_1 = __webpack_require__(15);
class LevelLoader {
    load(game, levelNumber) {
        const levelsData = JSON.parse(game.cache.getText('levels'));
        const levelData = levelsData[levelNumber - 1];
        const level = new Level_1.Level(levelNumber, levelData);
        return level;
    }
}
exports.LevelLoader = LevelLoader;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DeviceDetector_1 = __webpack_require__(6);
const Config_1 = __webpack_require__(0);
class Boot extends Phaser.State {
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        const detector = new DeviceDetector_1.DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            this.setupMobile();
        }
        this.game.state.start('Preload');
    }
    setupMobile() {
        this.game.scale.setGameSize(this.game.width + Config_1.Config.mobileExtraSidePadding() * 2, this.game.height);
    }
}
exports.default = Boot;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __webpack_require__(3);
exports.STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};
exports.LDJAM_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '10px PICO-8'
};
class Menu extends Phaser.State {
    constructor() {
        super(...arguments);
        this.starting = false;
    }
    create() {
        this.keyboardController = new Controller_1.KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
        this.game.stage.backgroundColor = '#050505';
        const titleX = 160;
        const titleY = 0;
        this.background = this.game.add.sprite(titleX, titleY, 'splash');
        this.background.scale.set(1.2, 1.2);
        const storyX = titleX - 90;
        const storyY = titleY + 320;
        const storyText = "Johnny Kilmister is a huge fan of Motor Raid.\n".toUpperCase() +
            "He never went to any concert because he’s not comfortable in a crowd.\n".toUpperCase() +
            "Motor Raid just announced their very last show, Johnny decided to go.\n".toUpperCase() +
            "Help Johnny to level up his metal concert skills!".toUpperCase();
        this.game.add.text(storyX, storyY, storyText, exports.STORY_TEXT_STYLE);
        const controlX = storyX;
        const controlY = storyY + 170;
        const controlText = "> Controls:\n".toUpperCase() +
            "- Press arrow keys to move\n".toUpperCase() +
            "- Spam space key to pass through the crowd\n\n".toUpperCase() +
            "> Increase your concert skills by staying\nas much as possible in blue action area!\n".toUpperCase();
        this.game.add.text(controlX, controlY, controlText, exports.STORY_TEXT_STYLE);
        const startX = controlX + 110;
        const startY = controlY + 190;
        this.startText = this.game.add.text(startX, startY, 'Press space key to start'.toUpperCase(), exports.STORY_TEXT_STYLE);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to({ alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);
        const tutoX = controlX + 680;
        const tutoY = storyY + 150;
        const tuto = this.game.add.sprite(tutoX, tutoY, 'tuto');
        tuto.scale.set(0.5, 0.5);
        const ldjamX = tutoX + 60;
        const ldjamY = tutoY + 280;
        const ldjamText = this.game.add.text(ldjamX, ldjamY, 'Hand-crafted with ❤️ for LDJAM 42'.toUpperCase(), exports.LDJAM_TEXT_STYLE);
    }
    update() {
        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            const wwwwwooowwwwAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
            wwwwwooowwwwAudio.play();
            wwwwwooowwwwAudio.onStop.addOnce(function () {
                this.game.state.start('Play', true, false, this.chosenController.identifier());
            }, this);
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
                this.camera.shake(0.006, 2000);
                this.camera.flash(0xffffff, 100, true, 0.3);
            });
        }
    }
    shutdown() {
        this.startText.destroy();
    }
}
exports.default = Menu;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Street_1 = __webpack_require__(22);
const Citizen_1 = __webpack_require__(1);
const BackBag_1 = __webpack_require__(12);
const Config_1 = __webpack_require__(0);
const LevelLoader_1 = __webpack_require__(16);
const Controller_1 = __webpack_require__(3);
const StreetLimits_1 = __webpack_require__(23);
const CharactersGenerator_1 = __webpack_require__(9);
const CirclePit_1 = __webpack_require__(27);
const WallOfDeath_1 = __webpack_require__(31);
const Nothing_1 = __webpack_require__(29);
const Exit_1 = __webpack_require__(28);
const BigTextPositionner_1 = __webpack_require__(26);
const ScoreDisplay_1 = __webpack_require__(30);
const POINTS_MULTIPLIER = 20;
const SINGER_TEXTS = {
    "You're awesome!": 'singer-yourawesome',
    'You rock!!!': 'singer-yourock',
    "Amazing!!!": 'singer-amazing',
    "You motherfuckers!": 'singer-motherfocka',
    "Come onnnnn!": 'singer-comon',
    'Thank you!': 'singer-thank-you'
};
class Play extends Phaser.State {
    constructor() {
        super(...arguments);
        this.levelNumber = 1;
        this.switchingLevel = false;
        this.previousInventory = null;
        this.controllerType = null;
        this.isFinalLevel = false;
        this.beginningIsIn = null;
        this.singerText = null;
        this.singerTextShadow = null;
        this.previousDiffPoints = 0;
        this.lastRandomSinger = '';
        this.singerCanSpeak = true;
    }
    init(controllerType, level = 1, previousInventory = { 'gunAmno': 100, 'shotgunAmno': 0, 'machinegunAmno': 0, 'money': 0 }, currentGunType = 'Gun', playerPosition = null) {
        this.levelNumber = level;
        this.previousInventory = previousInventory;
        this.switchingLevel = false;
        this.controllerType = controllerType;
        this.previousGunType = currentGunType;
        this.playerPosition = playerPosition;
        if (level == 12) {
            this.isFinalLevel = true;
        }
    }
    create() {
        this.scoreDisplay = new ScoreDisplay_1.ScoreDisplay(this.game);
        this.bigTextPositionner = new BigTextPositionner_1.BigTextPositionner(this.game);
        if (Config_1.Config.debug()) {
            this.game.time.advancedTiming = true;
        }
        this.game.stage.backgroundColor = '#000000';
        const levelLoader = new LevelLoader_1.LevelLoader();
        const level = levelLoader.load(this.game, this.levelNumber);
        const skyLayer = this.game.add.group();
        skyLayer.name = 'Sky';
        const backgroundLayer = this.game.add.group();
        backgroundLayer.name = 'Background';
        const buildingsLayer = this.game.add.group();
        buildingsLayer.name = 'Buildings';
        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';
        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';
        let streetPositionX = 0;
        let sideMarginWidth = 1;
        let rightCameraMarginX = this.game.width;
        /*
        const detector = new DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            streetPositionX += Config.mobileExtraSidePadding();
            sideMarginWidth = Config.mobileExtraSidePadding();
            rightCameraMarginX -= Config.mobileExtraSidePadding();
        }*/
        const leftCameraMargin = this.game.add.tileSprite(0, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        leftCameraMargin.fixedToCamera = true;
        this.leftBoundMargin = this.game.add.tileSprite(0, 0, 1, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.leftBoundMargin, Phaser.Physics.ARCADE);
        this.leftBoundMargin.body.immovable = true;
        this.leftBoundMargin.body.allowGravity = false;
        this.leftBoundMargin.alpha = 0;
        const rightCameraMargin = this.game.add.tileSprite(rightCameraMarginX, 0, sideMarginWidth, 800, 'Side', 0, interfaceLayer);
        rightCameraMargin.fixedToCamera = true;
        const streetWidth = 915;
        let worldWidth = streetWidth;
        let rightBoundMarginX = streetWidth;
        /*
        if (detector.isMobile()) {
            worldWidth += Config.mobileExtraSidePadding();
        }*/
        this.rightBoundMargin = this.game.add.tileSprite(rightBoundMarginX, 0, 100, 800, 'Side', 0, interfaceLayer);
        this.game.physics.enable(this.rightBoundMargin, Phaser.Physics.ARCADE);
        this.rightBoundMargin.body.immovable = true;
        this.rightBoundMargin.body.allowGravity = false;
        this.rightBoundMargin.alpha = 0;
        const streetPositionY = 20;
        let topBoundMarginY = streetPositionY - 40;
        this.topBoundMargin = this.game.add.tileSprite(0, topBoundMarginY, worldWidth, 1, 'Top', 0, interfaceLayer);
        this.game.physics.enable(this.topBoundMargin, Phaser.Physics.ARCADE);
        this.topBoundMargin.body.immovable = true;
        this.topBoundMargin.body.allowGravity = false;
        const height = 1200;
        const heightPosition = -400;
        this.sky = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height, 'sky', 0, skyLayer);
        this.sky.tileScale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.background = this.game.add.tileSprite(0, 0, 1200, 800, 'main', 0, backgroundLayer);
        //this.background = this.game.add.tileSprite(streetPositionX, heightPosition, streetWidth, height,'background',0, backgroundLayer);
        this.background.tileScale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        const streetHeight = 800;
        //const street = this.game.add.tileSprite(streetPositionX, streetPositionY, streetWidth, streetHeight,'Street',0, buildingsLayer);
        //street.tileScale.set(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        let controller = null;
        if (controller === null) {
            controller = new Controller_1.KeyBoardController(this.game);
        }
        /*
        let controller = null;
        if (this.controllerType === 'keyboard') {
            controller = new KeyBoardController(this.game);
        } else if (this.controllerType === 'gamepad') {
            controller = new GamePadController(this.game);
        } else if (this.controllerType === 'virtualpad') {
            controller = new VirtualPadController(this.game);
        } else {
            throw new Error('Unknown controller '+ this.controllerType);
        }*/
        const backbag = new BackBag_1.BackBag(this.previousInventory);
        const limits = new StreetLimits_1.StreetLimits(streetPositionX, streetWidth);
        const generator = new CharactersGenerator_1.CharactersGenerator(this.characterLayer, limits, level, backbag, controller, this.previousGunType, this.playerPosition);
        this.street = new Street_1.Street(generator, this.isFinalLevel, this.scoreDisplay);
        const worldBoundX = 0;
        const worldBoundY = 0;
        const worldHeight = 800;
        this.game.world.setBounds(worldBoundX, worldBoundY, worldWidth, worldHeight);
        this.game.camera.follow(this.street.player());
        const measureTime = 130 / 30;
        this.musicians = this.game.add.tileSprite(1200 - 106 * 2, 56, 106, 291, 'scene', 0, backgroundLayer);
        this.musicians.scale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
        this.musicians.animations.add('play', [0, 1], 16 / measureTime, true);
        this.musicians.animations.add('play-hard', [0, 1], 32 / measureTime, true);
        this.musicians.animations.play('play');
        // const startingPeople = 300;
        const startingPeople = 100;
        const finalPeople = 300;
        const totalDuration = 37 * measureTime * Phaser.Timer.SECOND;
        const begginingSlow = [0, 9, 17, 24, 34];
        const beginningHard = [5, 15, 20, 30, 38];
        begginingSlow.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                this.musicians.animations.play('play');
            });
        });
        beginningHard.forEach((measure) => {
            this.game.time.events.add(measure * measureTime * Phaser.Timer.SECOND, () => {
                this.musicians.animations.play('play-hard');
            });
        });
        const littleCirclePitInfo = {
            //startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 5 * measureTime * Phaser.Timer.SECOND,
            duration: 4 * measureTime * Phaser.Timer.SECOND,
            radiusMax: 150,
            radiusMin: 60,
        };
        const littleWallOfDeath = {
            //startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 13 * measureTime * Phaser.Timer.SECOND,
            waitDuration: 2 * measureTime * Phaser.Timer.SECOND,
            fightDuration: 2 * measureTime * Phaser.Timer.SECOND,
            length: 400,
            height: 200,
        };
        const bigCirclePitInfo = {
            // startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 20 * measureTime * Phaser.Timer.SECOND,
            duration: 4 * measureTime * Phaser.Timer.SECOND,
            radiusMax: 300,
            radiusMin: 100,
        };
        const bigWallOfDeath = {
            // startingTime: 0 * measureTime * Phaser.Timer.SECOND,
            startingTime: 28 * measureTime * Phaser.Timer.SECOND,
            waitDuration: 2 * measureTime * Phaser.Timer.SECOND,
            fightDuration: 4 * measureTime * Phaser.Timer.SECOND,
            length: 600,
            height: 250,
        };
        this.currentMetalMovement = new Nothing_1.Nothing();
        this.currentMetalMovement.start(this.draw(), this.drawIn());
        const prepareTime = 3 * Phaser.Timer.SECOND;
        const dontTalkTime = 2 * Phaser.Timer.SECOND;
        // Circle pit 1
        this.game.time.events.add(littleCirclePitInfo.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(littleCirclePitInfo.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('i-want-a-circlepit', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('Circle pit!');
        });
        this.game.time.events.add(littleCirclePitInfo.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new CirclePit_1.CirclePit(this.game, this.street.citizens(), littleCirclePitInfo.duration, littleCirclePitInfo.radiusMin, littleCirclePitInfo.radiusMax);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(littleCirclePitInfo.duration, () => {
                this.currentMetalMovement = new Nothing_1.Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                this.hellyeah(0.5, 4);
            });
        });
        // Wall of death 1
        this.game.time.events.add(littleWallOfDeath.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(littleWallOfDeath.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('the-wall-of-death', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('Wall of death!');
        });
        this.game.time.events.add(littleWallOfDeath.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new WallOfDeath_1.WallOfDeath(this.game, this.street.citizens(), littleWallOfDeath.waitDuration, littleWallOfDeath.fightDuration, littleWallOfDeath.length, littleWallOfDeath.height);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(littleWallOfDeath.waitDuration, () => {
                const singerAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
                singerAudio.play();
            });
            this.game.time.events.add(littleWallOfDeath.waitDuration + littleWallOfDeath.fightDuration, () => {
                this.currentMetalMovement = new Nothing_1.Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                this.hellyeah(0.6, 4);
            });
        });
        // Circle pit 2
        this.game.time.events.add(bigCirclePitInfo.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(bigCirclePitInfo.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('i-want-a-circlepit', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('CIRCLE PIT!');
        });
        this.game.time.events.add(bigCirclePitInfo.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new CirclePit_1.CirclePit(this.game, this.street.citizens(), bigCirclePitInfo.duration, bigCirclePitInfo.radiusMin, bigCirclePitInfo.radiusMax);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(bigCirclePitInfo.duration, () => {
                this.currentMetalMovement = new Nothing_1.Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                const singerAudio2 = this.game.add.audio('gueulage', 1, false);
                singerAudio2.play();
                this.hellyeah(0.7, 4);
            });
        });
        // Wall of death 2
        this.game.time.events.add(bigWallOfDeath.startingTime - prepareTime - dontTalkTime, () => {
            this.singerCanSpeak = false;
        });
        this.game.time.events.add(bigWallOfDeath.startingTime - prepareTime, () => {
            const singerAudio = this.game.add.audio('the-wall-of-death', 1, false);
            singerAudio.play();
            this.bigTextPositionner.push('WALL OF DEATH!');
        });
        this.game.time.events.add(bigWallOfDeath.startingTime, () => {
            this.singerCanSpeak = true;
            this.currentMetalMovement = new WallOfDeath_1.WallOfDeath(this.game, this.street.citizens(), bigWallOfDeath.waitDuration, bigWallOfDeath.fightDuration, bigWallOfDeath.length, bigWallOfDeath.height);
            this.currentMetalMovement.start(this.draw(), this.drawIn());
            this.game.time.events.add(bigWallOfDeath.waitDuration, () => {
                const singerAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
                singerAudio.play();
            });
            this.game.time.events.add(bigWallOfDeath.waitDuration + bigWallOfDeath.fightDuration, () => {
                this.currentMetalMovement = new Nothing_1.Nothing();
                this.currentMetalMovement.start(this.draw(), this.drawIn());
                const singerAudio = this.game.add.audio('clapclap', 1, false);
                singerAudio.play();
                const singerAudio2 = this.game.add.audio('gueulage', 1, false);
                singerAudio2.play();
                this.hellyeah(0.8, 4);
            });
        });
        this.game.time.events.add(38.5 * measureTime * Phaser.Timer.SECOND, () => {
            const singerAudio2 = this.game.add.audio('gueulage2', 1, false);
            singerAudio2.play();
            this.hellyeah(1.0, 8);
        });
        this.game.time.events.add(40 * measureTime * Phaser.Timer.SECOND, () => {
            this.currentMetalMovement = new Exit_1.Exit(this.street.citizens(), this.street.player());
            this.currentMetalMovement.start(this.draw(), this.drawIn());
        });
        this.game.time.events.add(39.5 * measureTime * Phaser.Timer.SECOND, () => {
            this.musicians.animations.stop();
            this.lamps.forEach(lamp => lamp.destroy());
        });
        this.street.addPeople(startingPeople);
        for (let i = 0; i < (finalPeople - startingPeople); i++) {
            this.game.time.events.add(totalDuration * Math.random(), () => {
                this.street.addPeople(1, true);
            });
        }
        this.game.time.events.loop(0.25 * Phaser.Timer.SECOND, () => {
            if (this.graphics) {
                if (this.graphics.alpha > 0) {
                    this.graphics.alpha = 0;
                }
                else {
                    this.graphics.alpha = 0.2;
                }
            }
            if (this.graphicsIn) {
                if (this.graphicsIn.alpha > 0) {
                    this.graphicsIn.alpha = 0;
                }
                else {
                    this.graphicsIn.alpha = 0.35;
                }
            }
        });
        const music = this.game.add.audio('music');
        music.play();
        this.game.time.events.loop(measureTime / 32 * Phaser.Timer.SECOND, () => {
            if (!this.scoreDisplay.isInFuryMode()) {
                if (this.isInFuryMode()) {
                    this.scoreDisplay.setFuryMode(true);
                    this.camera.shake(0.006, 100);
                    this.camera.flash(0xffffff, 100, true, 0.3);
                }
            }
            else {
                this.scoreDisplay.setFuryMode(false);
            }
        });
        this.lamps = [];
        for (let i = 1; i <= 6; i++) {
            const lamp = this.game.add.sprite(1200 - 102 * 2, 56, 'lamp' + i);
            lamp.scale.set(Config_1.Config.pixelScaleRatio(), Config_1.Config.pixelScaleRatio());
            lamp.alpha = 0;
            this.game.time.events.loop(measureTime / 32 * Phaser.Timer.SECOND, () => {
                lamp.alpha = Math.random() > 0.7 ? 0.5 : 0;
            });
            this.lamps.push(lamp);
        }
        const textPos = new PIXI.Point(950, 262);
        this.singerTextShadow = this.game.add.text(textPos.x + 2, textPos.y + 2, '', Citizen_1.TEXT_STYLE_MIDDLE);
        this.singerTextShadow.fill = '#000';
        this.singerText = this.game.add.text(textPos.x, textPos.y, '', Citizen_1.TEXT_STYLE_MIDDLE);
        this.currentMetalMovement = new Nothing_1.Nothing();
        this.currentMetalMovement.start(this.draw(), this.drawIn());
        this.scoreDisplay.display();
    }
    draw() {
        this.graphics && this.graphics.destroy();
        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.alpha = 0;
        return this.graphics;
    }
    drawIn() {
        this.graphicsIn && this.graphicsIn.destroy();
        this.graphicsIn = this.game.add.graphics(0, 0);
        this.graphicsIn.alpha = 0;
        return this.graphicsIn;
    }
    displayEndScreen() {
        console.log('Finished!');
        const player = this.street.player();
        const score = Math.ceil(player.points * POINTS_MULTIPLIER);
        this.game.state.start('Score', true, false, 'keyboard', score);
    }
    update() {
        let player = this.street.player();
        if (player.finished) {
            const keys = Object.keys(SINGER_TEXTS);
            const lastKey = keys[keys.length - 1];
            if (this.singerCanSpeak) {
                this.singerSay(lastKey);
                this.singerCanSpeak = false;
            }
        }
        if (this.currentMetalMovement) {
            if (this.currentMetalMovement.isIn(this.street.player().position)) {
                this.graphics.visible = false;
                this.graphicsIn.visible = true;
                if (this.currentMetalMovement.constructor.name === 'Exit') {
                    this.displayEndScreen();
                    return;
                }
                if (this.beginningIsIn === null) {
                    this.beginningIsIn = window.performance.now();
                }
                this.increasePoints();
                this.scoreDisplay.setIsIn(true);
            }
            else {
                this.graphics.visible = true;
                this.graphicsIn.visible = false;
                this.beginningIsIn = null;
                this.scoreDisplay.setIsIn(false);
            }
        }
        if (this.switchPalier()) {
            this.bigTextPositionner.push('bonus x' + this.switchPalier());
        }
        this.previousDiffPoints = this.getPointsDiff();
        if (this.isInFuryMode()) {
            if (this.singerText.text === '') {
                if (this.singerCanSpeak) {
                    this.singerSay(this.getRandomSinger());
                }
            }
        }
        this.game.physics.arcade.collide(this.street.player(), this.street.citizens().all());
        this.game.physics.arcade.collide(this.street.citizens().all(), this.street.citizens().all());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.player());
        this.game.physics.arcade.collide(this.topBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.leftBoundMargin, player);
        this.game.physics.arcade.collide(this.leftBoundMargin, this.street.citizens().all());
        this.game.physics.arcade.collide(this.rightBoundMargin, player);
        this.game.physics.arcade.collide(this.rightBoundMargin, this.street.citizens().all());
        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);
        this.bigTextPositionner.update();
        this.scoreDisplay.update(player.points * POINTS_MULTIPLIER, player.energy, this.getPalier());
    }
    render() {
        if (Config_1.Config.debug()) {
            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
            this.game.debug.body(this.street.player());
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteInfo(this.street.player(), 32, 200);
            this.street.citizens().all().forEach((citizen) => {
                this.game.debug.body(citizen);
            });
        }
    }
    shutdown() {
        this.sky.destroy();
        this.background.destroy();
        this.street.player().destroy();
        this.street.citizens().all().map(function (citizen) { citizen.destroy(); });
        this.street = null;
    }
    nextLevel() {
        if (this.switchingLevel === false) {
            this.switchingLevel = true;
            const levelsData = JSON.parse(this.game.cache.getText('levels'));
            const lastLevelNumber = levelsData.length;
            this.levelNumber++;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                if (this.levelNumber <= lastLevelNumber) {
                    this.game.state.start('Play', true, false, this.controllerType, this.levelNumber, this.buildInventory(), this.street.player().equippedGun().identifier());
                }
                else {
                    this.game.state.start('Menu');
                }
            }, this);
        }
    }
    buildInventory() {
        return {
            'gunAmno': this.street.player().gunAmno(),
            'shotgunAmno': 0,
            'machinegunAmno': 0,
            'money': this.street.player().money(),
        };
    }
    increasePoints() {
        this.street.player().points += this.getPointsDiff();
    }
    getPointsDiff() {
        if (this.beginningIsIn === null) {
            return 0;
        }
        const now = window.performance.now();
        return (now - this.beginningIsIn) / 1000;
    }
    isInFuryMode() {
        return this.getPointsDiff() > 5;
    }
    singerSay(text) {
        console.log(text);
        this.singerText.setText(text);
        this.singerTextShadow.setText(text);
        const singerAudio = this.game.add.audio(SINGER_TEXTS[text], 1, false);
        singerAudio.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.singerText.setText('');
            this.singerTextShadow.setText('');
        });
    }
    hellyeah(percentage, duration) {
        const citizens = this.street.citizens().all().filter((citizen) => {
            return true;
        }).sort((c1, c2) => {
            return -0.5 + Math.random();
        });
        for (let i = 0; i < citizens.length * percentage; i++) {
            this.game.time.events.add(Math.random() * 0.5 * Phaser.Timer.SECOND, () => {
                citizens[i].hellYeah(duration);
            });
        }
    }
    switchPalier() {
        const paliers = [5, 8, 11, 14, 17, 20, 23, 26, 29];
        for (let i = 0; i < paliers.length; i++) {
            const limit = paliers[i];
            if (this.previousDiffPoints < limit && this.getPointsDiff() >= limit) {
                return i + 2;
            }
        }
        return null;
    }
    getPalier() {
        const paliers = [5, 8, 11, 14, 17, 20, 23, 26, 29];
        for (let i = paliers.length - 1; i >= 0; i--) {
            const limit = paliers[i];
            if (this.getPointsDiff() >= limit) {
                return i + 2;
            }
        }
        return 1;
    }
    getRandomSinger() {
        while (true) {
            const keys = Object.keys(SINGER_TEXTS);
            const randomKey = keys[Math.floor(Math.random() * (keys.length - 1))];
            if (randomKey !== this.lastRandomSinger) {
                this.lastRandomSinger = randomKey;
                return randomKey;
            }
        }
    }
}
exports.default = Play;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preload extends Phaser.State {
    constructor() {
        super(...arguments);
        this.skipMenu = false;
        this.skipToLevel = 1;
        this.testScoreScreen = false;
    }
    preload() {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }
    create() {
        if (this.testScoreScreen) {
            this.game.state.start('Score', true, false, 'keyboard', 1000000);
        }
        else if (this.skipMenu) {
            this.game.state.start('Play', true, false, 'keyboard', this.skipToLevel);
        }
        else {
            this.game.state.start('Menu');
        }
    }
    loadAudio() {
        // day one records
        this.load.audio('allezla', 'assets/sounds/day1/allezla.ogg');
        this.load.audio('clapclap', 'assets/sounds/day1/clapclap.ogg');
        this.load.audio('fuckyou2', 'assets/sounds/day1/fuckyou2.ogg');
        this.load.audio('fuckyou1', 'assets/sounds/day1/fuckyou.ogg');
        this.load.audio('gueulage', 'assets/sounds/day1/gueulage.ogg');
        this.load.audio('huuuuum', 'assets/sounds/day1/huuuuum.ogg');
        this.load.audio('i-want-a-circlepit', 'assets/sounds/day1/i-want-a-cirxlepit.ogg');
        this.load.audio('oups-sorry', 'assets/sounds/day1/oups-sorry.ogg');
        this.load.audio('stap-go-away', 'assets/sounds/day1/stap-go-away.ogg');
        this.load.audio('what-de', 'assets/sounds/day1/what-de.ogg');
        this.load.audio('a-poil', 'assets/sounds/day1/a-poil.ogg');
        this.load.audio('dont-touch-my-boobs', 'assets/sounds/day1/dont-touch-my-boobs.ogg');
        this.load.audio('fuckyou4', 'assets/sounds/day1/fuckyou4.ogg');
        this.load.audio('fuckyou3', 'assets/sounds/day1/fuxkyou3.ogg');
        this.load.audio('heyman-want-some', 'assets/sounds/day1/heyman-want-some.ogg');
        this.load.audio('iaaaam-so-sorry', 'assets/sounds/day1/iaaaam-so-sorry.ogg');
        this.load.audio('no-worries-mates', 'assets/sounds/day1/no-worries-mates.ogg');
        this.load.audio('ouuuufffw', 'assets/sounds/day1/ouuuufffw.ogg');
        this.load.audio('tchin', 'assets/sounds/day1/tchin.ogg');
        this.load.audio('wwwwwwwoooooooww', 'assets/sounds/day1/wwwwwwwoooooooww.ogg');
        this.load.audio('calm-down', 'assets/sounds/day1/calm-down.ogg');
        this.load.audio('dude', 'assets/sounds/day1/dude.ogg');
        this.load.audio('fuckyou5', 'assets/sounds/day1/fuckyou5.ogg');
        this.load.audio('gueulage2', 'assets/sounds/day1/gueulage2.ogg');
        this.load.audio('hey', 'assets/sounds/day1/hey.ogg');
        this.load.audio('i-want-a-circle-pif', 'assets/sounds/day1/i-want-a-circle-pif.ogg');
        this.load.audio('ouaouaouaoua', 'assets/sounds/day1/ouaouaouaoua.ogg');
        this.load.audio('sorry-o-sorry', 'assets/sounds/day1/sorry-o-sorry.ogg');
        this.load.audio('the-wall-of-death', 'assets/sounds/day1/the-whale-of-dearh.ogg');
        this.load.audio('youwannadance', 'assets/sounds/day1/youwannadance.ogg');
        this.load.audio('music', 'assets/sounds/day1/BeepBox-Song.ogg');
        // day2 records
        this.load.audio('bruitdegerb', 'assets/sounds/day2/bruitdegerb.ogg');
        this.load.audio('bruitedegerb2', 'assets/sounds/day2/bruitedegerb2.ogg');
        this.load.audio('bruitdegerbe3', 'assets/sounds/day2/bruitdegerbe3.ogg');
        this.load.audio('dude2', 'assets/sounds/day2/dude2.ogg');
        this.load.audio('hey1', 'assets/sounds/day2/hey1.ogg');
        this.load.audio('hey3', 'assets/sounds/day2/hey3.ogg');
        this.load.audio('hey2', 'assets/sounds/day2/hey2.ogg');
        this.load.audio('hey4', 'assets/sounds/day2/hey4.ogg');
        this.load.audio('noworries2', 'assets/sounds/day2/noworries2.ogg');
        this.load.audio('ouuuuuffff2', 'assets/sounds/day2/ouuuuuffff2.ogg');
        this.load.audio('rototo', 'assets/sounds/day2/rototo.ogg');
        this.load.audio('rototo2', 'assets/sounds/day2/rototo2.ogg');
        this.load.audio('stap2', 'assets/sounds/day2/stap2.ogg');
        this.load.audio('singer-amazing', 'assets/sounds/day2/singer-amazing.ogg');
        this.load.audio('singer-motherfocka', 'assets/sounds/day2/singer-motherfocka.ogg');
        this.load.audio('singer-yourock', 'assets/sounds/day2/singer-yourock.ogg');
        this.load.audio('singer-thank-you', 'assets/sounds/day2/singer-thank-you.ogg');
        this.load.audio('singer-comon', 'assets/sounds/day2/singer-comon.ogg');
        this.load.audio('singer-yourawesome', 'assets/sounds/day2/singer-yourawesome.ogg');
        this.load.audio('sorry1', 'assets/sounds/day2/sorry1.ogg');
        this.load.audio('sorry3', 'assets/sounds/day2/sorry3.ogg');
        this.load.audio('sorry6', 'assets/sounds/day2/sorry6.ogg');
        this.load.audio('sorry9', 'assets/sounds/day2/sorry9.ogg');
        this.load.audio('sorry2', 'assets/sounds/day2/sorry2.ogg');
        this.load.audio('sorry5', 'assets/sounds/day2/sorry5.ogg');
        this.load.audio('sorry8', 'assets/sounds/day2/sorry8.ogg');
        this.load.audio('sorry4', 'assets/sounds/day2/sorry4.ogg');
        this.load.audio('sorry7', 'assets/sounds/day2/sorry7.ogg');
        this.load.audio('sorry10', 'assets/sounds/day2/sorry10.ogg');
        this.load.audio('wantsome2', 'assets/sounds/day2/wantsome2.ogg');
    }
    loadLevels() {
        this.load.text('levels', 'assets/data/levels.json');
    }
    loadGameImages() {
        this.load.spritesheet('citizen1', 'assets/sprites/citizen4.png', 24, 24);
        this.load.spritesheet('citizen2', 'assets/sprites/citizen5.png', 24, 24);
        this.load.spritesheet('hero', 'assets/sprites/citizen4.png', 24, 24);
        this.load.spritesheet('main', 'assets/sprites/main.png', 600, 400);
        this.load.spritesheet('scene', 'assets/sprites/scene.png', 106, 291);
        this.load.spritesheet('splash', 'assets/sprites/splash.png', 600, 400);
        this.load.spritesheet('lamp1', 'assets/sprites/lamp1.png', 106, 291);
        this.load.spritesheet('lamp2', 'assets/sprites/lamp2.png', 106, 291);
        this.load.spritesheet('lamp3', 'assets/sprites/lamp3.png', 106, 291);
        this.load.spritesheet('lamp4', 'assets/sprites/lamp4.png', 106, 291);
        this.load.spritesheet('lamp5', 'assets/sprites/lamp5.png', 106, 291);
        this.load.spritesheet('lamp6', 'assets/sprites/lamp6.png', 106, 291);
        this.load.spritesheet('tuto', 'assets/sprites/tuto.png', 816, 521);
        this.load.spritesheet('score_combo', 'assets/sprites/score_combo.png', 94, 28);
        this.load.spritesheet('score_main', 'assets/sprites/score_main.png', 96, 65);
        this.load.spritesheet('score_power', 'assets/sprites/score_power.png', 82, 16);
        this.load.spritesheet('player_mini', 'assets/sprites/player_mini.png', 16, 19);
        this.load.spritesheet('Side', 'assets/sprites/side.png', 12, 12);
    }
    loadFonts() {
    }
}
exports.default = Preload;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __webpack_require__(3);
exports.STORY_TEXT_STYLE = {
    align: 'left',
    fill: '#fff',
    font: '15px PICO-8'
};
exports.SCORE_TEXT_STYLE = {
    align: 'center',
    fill: '#fff',
    font: '32px PICO-8'
};
class Score extends Phaser.State {
    constructor() {
        super(...arguments);
        this.starting = false;
    }
    init(controllerType, score) {
        this.score = score;
    }
    create() {
        this.keyboardController = new Controller_1.KeyBoardController(this.game);
        this.chosenController = this.keyboardController;
        this.game.stage.backgroundColor = '#050505';
        const titleX = 160;
        const titleY = 0;
        this.background = this.game.add.sprite(titleX + 400, titleY + 250, 'splash');
        this.background.anchor.set(0.5, 0.5);
        this.background.scale.set(1.2, 1.2);
        const tweenScale = this.game.add.tween(this.background.scale)
            .to({ x: 1.25, y: 1.25 }, 100, "Linear", true);
        tweenScale.repeat(10000, 200);
        const singerAudio = this.game.add.audio('singer-yourock', 1, false);
        singerAudio.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, () => {
            const singerAudio = this.game.add.audio('gueulage', 1, false);
            singerAudio.play();
        });
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            const singerAudio = this.game.add.audio('clapclap', 1, false);
            singerAudio.play();
        });
        const storyX = titleX + 220;
        const storyY = titleY + 430;
        const storyText = "Score:" + this.score + "";
        this.game.add.text(storyX, storyY, storyText, exports.SCORE_TEXT_STYLE);
        const startX = titleX + 230;
        const startY = storyY + 150;
        this.startText = this.game.add.text(startX, startY, 'Press space key to restart', exports.STORY_TEXT_STYLE);
        this.startText.alpha = 1;
        const tweenAlpha = this.game.add.tween(this.startText).to({ alpha: 0.3 }, 0, "Linear", true);
        tweenAlpha.repeat(10000, 400);
        this.tweetIt = this.game.add.text(titleX + 200, titleY + 630, 'Share you score', exports.SCORE_TEXT_STYLE);
        this.tweetIt.alpha = 1;
        this.tweetIt.inputEnabled = true;
        this.tweetIt.events.onInputOver.add(() => {
            document.body.style.cursor = 'pointer';
            this.tweetIt.alpha = 0.7;
        });
        this.tweetIt.events.onInputOut.add(() => {
            document.body.style.cursor = 'default';
            this.tweetIt.alpha = 1;
        });
        this.tweetIt.events.onInputDown.add(() => {
            window.open('https://twitter.com/intent/tweet?text=I helped Johnny to survive a Metal Concert! ' +
                'Try to beat my ' + this.score + ' points 🤘! %23LDJAM42 %23sorryohsorry ' + 'https://ldjam.com/events/ludum-dare/42/sorry-oh-sorry-hellfest-simulator');
        }, this);
    }
    update() {
        if (this.chosenController.shooting() && this.starting == false) {
            this.starting = true;
            const wwwwwooowwwwAudio = this.game.add.audio('wwwwwwwoooooooww', 1, false);
            wwwwwooowwwwAudio.play();
            wwwwwooowwwwAudio.onStop.addOnce(function () {
                this.game.state.start('Menu', true, false, this.chosenController.identifier());
            }, this);
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
                this.camera.shake(0.006, 2000);
                this.camera.flash(0xffffff, 100, true, 0.3);
            });
        }
    }
    shutdown() {
        this.startText.destroy();
    }
}
exports.default = Score;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Citizens_1 = __webpack_require__(8);
class Street {
    constructor(generator, lastLevel = false, scoreDisplay) {
        this.citizenRepository = new Citizens_1.Citizens();
        this.generator = generator;
        this.addPeople();
        this.hero = generator.generateHero(this, scoreDisplay);
    }
    addPeople(num = null, outOfBounds = false) {
        this.generator.generateBots(this, this.citizens(), num, outOfBounds);
    }
    player() {
        return this.hero;
    }
    citizens() {
        return this.citizenRepository;
    }
}
exports.Street = Street;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StreetLimits {
    constructor(streetPositionX, streetWidth) {
        this.streetPositionX = streetPositionX;
        this.streetWidth = streetWidth;
    }
    minY() {
        return 20;
    }
    maxY() {
        return 750;
    }
    minX() {
        return this.streetPositionX + 20;
    }
    maxX() {
        return this.streetWidth - 40;
    }
}
exports.StreetLimits = StreetLimits;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Gun {
    constructor(group, owner, amno = 10000) {
        this.game = group.game;
        this.amnoAmount = amno;
        this.weapon = group.game.add.weapon(-1, 'Bullet', 0, group);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 600;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 600;
        this.weapon.trackSprite(owner, 0, -8, false);
        this.weapon.fireAngle = 0;
        this.weapon.addBulletAnimation('idle', [0, 1], 4, true);
        this.weapon.bulletAnimation = 'idle';
        this.weapon.onFire.add(function () {
            this.amnoAmount--;
        }, this);
        /*
        this.weapon.onFire.add(function(){
            const shootAudio = this.game.add.audio('shoot', 0.5, false);
            shootAudio.play();
        }, this);*/
    }
    fire() {
        this.weapon.fire();
    }
    turnToTheLeft() {
        this.weapon.fireAngle = 180;
    }
    turnToTheRight() {
        this.weapon.fireAngle = 0;
    }
    bullets() {
        return this.weapon.bullets;
    }
    bulletHits(targets, overlapCallback) {
        this.game.physics.arcade.overlap(this.weapon.bullets, targets, overlapCallback, null, this);
    }
    amno() {
        return this.amnoAmount;
    }
    reload(amount) {
        this.amnoAmount = this.amnoAmount + amount;
    }
    damage() {
        return 20;
    }
    identifier() {
        return 'Gun';
    }
}
exports.Gun = Gun;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Citizen_1 = __webpack_require__(1);
class BigText {
    constructor(game, text, position) {
        this.shouldDisappear = false;
        this.game = game;
        this.text = text;
        this.phaserText = null;
        this.phaserTextShadow = null;
        this.position = position;
    }
    display() {
        this.phaserTextShadow = this.game.add.text(0, 0, this.text, Citizen_1.TEXT_STYLE_HUGE);
        this.phaserTextShadow.fill = '#800';
        this.phaserTextShadow.scale.set(2);
        this.phaserTextShadow.rotation = (Math.random() - 0.5) * 0.3;
        this.phaserTextShadow.alpha = 0;
        this.phaserText = this.game.add.text(0, 0, this.text, Citizen_1.TEXT_STYLE_HUGE);
        this.phaserText.scale.set(2);
        this.phaserText.rotation = this.phaserTextShadow.rotation;
        this.phaserText.alpha = 0;
        this.centerTexts();
    }
    update() {
        if (this.phaserText === null) {
            this.display();
            this.game.time.events.add(Phaser.Timer.SECOND * 1.7, () => {
                this.shouldDisappear = true;
            });
        }
        else {
            if (this.shouldDisappear) {
                if (this.phaserText.alpha > 0) {
                    this.phaserText.alpha = Math.max(this.phaserText.alpha - 0.1, 0);
                    this.phaserTextShadow.alpha = Math.max(this.phaserTextShadow.alpha - 0.1, 0);
                }
                else {
                    this.phaserText.destroy(true);
                    this.phaserTextShadow.destroy(true);
                    return false;
                }
            }
            else {
                if (this.phaserText.scale.x > 1) {
                    const previousScale = this.phaserText.scale.x;
                    this.phaserText.scale.set(this.phaserText.scale.x - 0.08);
                    this.phaserText.alpha = -this.phaserText.scale.x + 2;
                    this.phaserTextShadow.scale.set(this.phaserText.scale.x - 0.08);
                    this.phaserTextShadow.alpha = (-this.phaserText.scale.x + 2) / 2;
                    if (this.phaserText.scale.x <= 1 && previousScale > 1) {
                        this.game.camera.shake(0.006, 100);
                    }
                }
                else {
                    this.phaserText.alpha = 1;
                    this.phaserTextShadow.alpha = 0.5;
                }
            }
        }
        this.centerTexts();
        return true;
    }
    centerTexts() {
        this.phaserText.x = 600 - this.phaserText.width / 2;
        this.phaserText.y = 150 - this.phaserText.height / 2 + this.position * 100;
        this.phaserTextShadow.x = 600 - this.phaserText.width / 2 + 50;
        this.phaserTextShadow.y = 150 - this.phaserText.height / 2 + 50 + this.position * 100;
    }
}
exports.BigText = BigText;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BigText_1 = __webpack_require__(25);
class BigTextPositionner {
    constructor(game) {
        this.game = game;
        this.bigTexts = [];
    }
    push(text) {
        let i = 0;
        while (i <= 6) {
            if (this.bigTexts[i] === null || this.bigTexts[i] === undefined) {
                this.bigTexts[i] = new BigText_1.BigText(this.game, text, i);
                return true;
            }
            i++;
        }
    }
    update() {
        for (let i = 0; i < this.bigTexts.length; i++) {
            if (this.bigTexts[i] !== null) {
                if (!this.bigTexts[i].update()) {
                    this.bigTexts[i] = null;
                }
            }
        }
    }
}
exports.BigTextPositionner = BigTextPositionner;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MetalMovement_1 = __webpack_require__(2);
class CirclePit extends MetalMovement_1.MetalMovement {
    constructor(game, citizens, duration, radiusMin, radiusMax) {
        super();
        this.game = game;
        this.center = new PIXI.Point(900 - radiusMax / 2 - 130, 400);
        this.radiusMin = radiusMin;
        this.radiusMax = radiusMax;
        this.citizens = citizens.all().filter((citizen) => {
            const dist = Phaser.Math.distance(this.center.x, this.center.y, citizen.x, citizen.y);
            return dist > this.radiusMin && dist < this.radiusMax;
        });
        this.time = duration;
    }
    start(graphics, graphicsIn) {
        this.citizens.forEach((citizen) => {
            citizen.setCirclePitCenter(this.center);
        });
        this.citizens.forEach((citizen) => {
            this.game.time.events.add(this.time / 2 + this.time / 2 * Math.random(), () => {
                citizen.setCirclePitCenter(null);
            });
        });
        graphics.lineStyle(this.radiusMax - this.radiusMin, MetalMovement_1.BLINKCOLOR);
        graphics.drawCircle(this.center.x, this.center.y, (this.radiusMin + this.radiusMax));
        graphicsIn.lineStyle(this.radiusMax - this.radiusMin, MetalMovement_1.BLINKINCOLOR);
        graphicsIn.drawCircle(this.center.x, this.center.y, (this.radiusMin + this.radiusMax));
    }
    isIn(position) {
        const distFromCenter = Phaser.Math.distance(this.center.x, this.center.y, position.x, (position.y + 10));
        return distFromCenter < this.radiusMax && distFromCenter > this.radiusMin;
    }
}
exports.CirclePit = CirclePit;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MetalMovement_1 = __webpack_require__(2);
class Exit extends MetalMovement_1.MetalMovement {
    constructor(citizens, player) {
        super();
        this.citizens = citizens;
        this.player = player;
    }
    start(graphics, graphicsIn) {
        graphics.beginFill(MetalMovement_1.BLINKCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKCOLOR);
        graphics.drawRect(0, 300, 70, 150);
        graphicsIn.beginFill(MetalMovement_1.BLINKINCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKINCOLOR);
        graphicsIn.drawRect(0, 300, 70, 150);
        this.citizens.all().forEach(citizen => citizen.exit(this));
        this.player.exit(this);
    }
    isIn(position) {
        return position.x > 0 && position.x < 0 + 70 && (position.y + 10) > 300 && (position.y + 10) < 300 + 150;
    }
}
exports.Exit = Exit;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MetalMovement_1 = __webpack_require__(2);
class Nothing extends MetalMovement_1.MetalMovement {
    start(graphics, graphicsIn) {
        graphics.beginFill(MetalMovement_1.BLINKCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKCOLOR);
        graphics.drawRect(840, 350, 70, 150);
        graphicsIn.beginFill(MetalMovement_1.BLINKINCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKINCOLOR);
        graphicsIn.drawRect(840, 350, 70, 150);
    }
    isIn(position) {
        return position.x > 840 && position.x < 840 + 70 && (position.y + 10) > 350 && (position.y + 10) < 350 + 150;
    }
}
exports.Nothing = Nothing;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Citizen_1 = __webpack_require__(1);
const SPECIAL_RATIO = 3;
class ScoreDisplay {
    constructor(game) {
        this.stopAnim = null;
        this.game = game;
    }
    display() {
        const position = new PIXI.Point(880, 550);
        this.background = this.game.add.tileSprite(position.x, position.y, 96, 65, 'score_main');
        this.background.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);
        this.background.animations.add('blink', [0, 1], 12);
        this.background.animations.add('normal', [0]);
        this.background.animations.play('normal', 12, true);
        this.power = this.game.add.sprite(position.x + 6 * SPECIAL_RATIO, position.y + 48 * SPECIAL_RATIO, 'score_power');
        this.power.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);
        this.combo = this.game.add.tileSprite(position.x + SPECIAL_RATIO, position.y + SPECIAL_RATIO, 94, 28, 'score_combo', 9);
        this.combo.scale.set(SPECIAL_RATIO, SPECIAL_RATIO);
        this.pointsDisplay = this.game.add.text(position.x + 8 * SPECIAL_RATIO, position.y + 34 * SPECIAL_RATIO, '', Citizen_1.TEXT_STYLE_SCORE);
        this.pointsDisplay.rotation = -0.12;
        this.playerMini = this.game.add.tileSprite(position.x + 73 * SPECIAL_RATIO, position.y + 21 * SPECIAL_RATIO, 16, 19, 'player_mini', 2);
        this.playerMini.scale.set(SPECIAL_RATIO * 2, SPECIAL_RATIO * 2);
        this.playerMini.animations.add('push', [0, 1], 12);
        this.playerMini.animations.add('normal', [2]);
    }
    setIsIn(value) {
        if (value && this.background.animations.currentAnim.name !== 'blink') {
            this.background.animations.play('blink', 12, true);
        }
        else {
            if (!value && this.background.animations.currentAnim.name === 'blink') {
                this.background.animations.play('normal', 12, true);
            }
        }
    }
    /**
     * Energy is 0..100
     * Sprite is 82 px large
     * Palier is 1..10 -> 9..0
     */
    update(points, energy, palier) {
        this.pointsDisplay.text = Math.ceil(points).toString()['padStart'](7, '.');
        this.power.crop(new Phaser.Rectangle(0, 0, energy * 0.78, 100), false);
        this.combo.loadTexture('score_combo', -palier + 10);
        if (this.stopAnim) {
            const now = window.performance.now();
            if (this.stopAnim < now) {
                this.playerMini.animations.play('normal');
                this.stopAnim = null;
            }
        }
    }
    isInFuryMode() {
        return this.pointsDisplay.fill !== '#fff';
    }
    setFuryMode(value) {
        this.pointsDisplay.fill = value ? '#ff0000' : '#fff';
    }
    animPushing() {
        this.power.visible = false;
        this.game.time.events.add(0.15 * Phaser.Timer.SECOND, () => {
            this.power.visible = true;
        });
        this.playerMini.animations.play('push', 12, true);
        const now = window.performance.now();
        this.stopAnim = now + 500;
    }
}
exports.ScoreDisplay = ScoreDisplay;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MetalMovement_1 = __webpack_require__(2);
class WallOfDeath extends MetalMovement_1.MetalMovement {
    constructor(game, citizens, waitDuration, fightDuration, length, height) {
        super();
        this.game = game;
        this.right = 830;
        this.left = 830 - length;
        this.height = height;
        this.waitDuration = waitDuration;
        this.fightDuration = fightDuration;
        const middle = 400;
        this.gap = 20;
        this.citizenTop = citizens.all().filter((citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y < middle - this.gap && citizen.y > (middle - this.height);
        });
        this.citizenBottom = citizens.all().filter((citizen) => {
            return citizen.x > this.left && citizen.x < this.right
                && citizen.y > middle + this.gap && citizen.y < (middle + this.height);
        });
    }
    start(graphics, graphicsIn) {
        const random = 5;
        const topGap = (this.right - this.left) / this.citizenTop.length;
        this.citizenTop.sort((c1, c2) => {
            return c1.x - c2.x;
        }).forEach((citizen, i) => {
            citizen.goTopForWallOfDeath(this.height, this.left + i * topGap + random / 2 + Math.random() * random / 2);
        });
        const bottomGap = (this.right - this.left) / this.citizenBottom.length;
        this.citizenBottom.sort((c1, c2) => {
            return c1.x - c2.x;
        }).forEach((citizen, i) => {
            citizen.goBottomForWallOfDeath(this.height, this.left + i * bottomGap + random / 2 + Math.random() * random / 2);
        });
        this.game.time.events.add(this.waitDuration, () => {
            this.citizenTop.forEach((citizen) => {
                citizen.fight();
            });
            this.citizenBottom.forEach((citizen) => {
                citizen.fight();
            });
            this.citizenTop.forEach((citizen) => {
                this.game.time.events.add(this.fightDuration / 2 + this.fightDuration / 2 * Math.random(), () => {
                    citizen.stopFight();
                });
            });
            this.citizenBottom.forEach((citizen) => {
                this.game.time.events.add(this.fightDuration / 2 + this.fightDuration / 2 * Math.random(), () => {
                    citizen.stopFight();
                });
            });
        });
        graphics.beginFill(MetalMovement_1.BLINKCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKCOLOR);
        graphics.drawRect(this.left, 400 - this.gap, this.right - this.left, this.gap * 2);
        graphicsIn.beginFill(MetalMovement_1.BLINKINCOLOR);
        graphics.lineStyle(5, MetalMovement_1.BLINKINCOLOR);
        graphicsIn.drawRect(this.left, 400 - this.gap, this.right - this.left, this.gap * 2);
    }
    isIn(position) {
        return position.x > this.left && position.x < this.right && (position.y + 10) > 400 - this.gap && (position.y + 10) < 400 + this.gap;
    }
}
exports.WallOfDeath = WallOfDeath;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);