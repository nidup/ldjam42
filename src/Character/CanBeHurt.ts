
// We don't use damage() method as it calls kill() on sprite

import {HorizontalDirection} from "./HorizontalDirection";

export interface CanBeHurt
{
    hurt(damage: number, fromDirection: HorizontalDirection);

    isDying(): boolean;
}