import { BodyParts } from "./bodyParts.enum.js";
import { Colours } from "./colours.enum.js";

export interface ISpin {
    colour: Colours;
    bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
    num: number;
    constructor (public colour: Colours, public bodyPart: BodyParts) {
        this.num = 0;
        this.colour = colour;
        this.bodyPart = bodyPart;
    }
}