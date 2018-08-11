
import {DeviceDetector} from "../DeviceDetector";
import {Config} from "../../Config";

export default class Boot extends Phaser.State {

    public create ()
    {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        const detector = new DeviceDetector(this.game.device);
        if (detector.isMobile()) {
            this.setupMobile();
        }

        this.game.state.start('Preload');
    }

    private setupMobile()
    {
        this.game.scale.setGameSize(this.game.width + Config.mobileExtraSidePadding() * 2, this.game.height);
    }
}
