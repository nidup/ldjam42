
export class Config
{
    static pixelScaleRatio(): number
    {
        return 2;
    }

    static mobileExtraSidePadding(): number
    {
        return 250;
    }

    static fakingMobileForDebug(): boolean
    {
        return false;
    }

    static debug(): boolean
    {
        return false;
    }
}
