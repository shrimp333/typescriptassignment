export var Colours;
(function (Colours) {
    Colours[Colours["Red"] = 0] = "Red";
    Colours[Colours["Blue"] = 1] = "Blue";
    Colours[Colours["Yellow"] = 2] = "Yellow";
    Colours[Colours["Green"] = 3] = "Green";
})(Colours || (Colours = {}));
// TODO: implement a ColoursHelper class as shown in BodyParts
export class coloursHelper {
    constructor() { }
    static get(key) {
        switch (key) {
            case "Red":
                return Colours.Red;
            case "Blue":
                return Colours.Blue;
            case "Yellow":
                return Colours.Yellow;
            case "Green":
                return Colours.Green;
        }
    }
}
coloursHelper.colours = [
    Colours.Red,
    Colours.Blue,
    Colours.Yellow,
    Colours.Green
];
