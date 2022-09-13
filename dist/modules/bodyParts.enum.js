export var BodyParts;
(function (BodyParts) {
    BodyParts[BodyParts["LeftHand"] = 0] = "LeftHand";
    BodyParts[BodyParts["RightHand"] = 1] = "RightHand";
    BodyParts[BodyParts["LeftFoot"] = 2] = "LeftFoot";
    BodyParts[BodyParts["RightFoot"] = 3] = "RightFoot";
})(BodyParts || (BodyParts = {}));
// helper class used to access the above enum
// usage can be either via the array or
// use the get method eg.  BodyPartsHelper.get("LeftHand")
export class BodyPartsHelper {
    constructor() { }
    static get(key) {
        switch (key) {
            case "LeftHand":
                return BodyParts.LeftHand;
            case "RightHand":
                return BodyParts.RightHand;
            case "LeftFoot":
                return BodyParts.LeftFoot;
            case "RightFoot":
                return BodyParts.RightFoot;
        }
    }
}
BodyPartsHelper.bodyParts = [
    BodyParts.LeftFoot,
    BodyParts.LeftHand,
    BodyParts.RightFoot,
    BodyParts.RightHand
];
