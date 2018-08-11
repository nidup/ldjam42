
export class HeroCamera
{
    private camera: Phaser.Camera;

    constructor(camera: Phaser.Camera)
    {
        this.camera = camera;
    }

    public shootgunEffect()
    {
        this.camera.shake(0.003, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }

    public machinegunEffect()
    {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }

    public gunEffect()
    {
        this.camera.shake(0.001, 100);
        this.camera.flash(0xffff32, 100, true, 0.3);
    }

    public warningEffect()
    {
        this.camera.flash(0xf04b36, 1000, false, 0.2);
    }

    public dyingEffect()
    {
        this.camera.flash(0xb43232, 10000, false, 0.2);
    }
}
