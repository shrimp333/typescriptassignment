// Import
import { Colours, coloursHelper} from './modules/colours.enum.js';
import { BodyParts, BodyPartsHelper } from './modules/bodyParts.enum.js';
import { SpinRecord } from './modules/spin.js';

// used to make the spinner spin
let spinnerCounter = 0;



// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];


const colourSelector:HTMLSelectElement = <HTMLSelectElement>document.getElementById('colourSelect');
const bodyPartSelector:HTMLSelectElement = <HTMLSelectElement>document.getElementById('bodyPartSelect');

const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
    if (isNaN(Number(colour))) {
        coloursArray.push(colour);
        colourSelector.innerHTML += `<option value="${colour}">${colour}</option>`;
    }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let bodyPart in BodyParts) {
    if (isNaN(Number(bodyPart))) {
        bodyPartsArray.push(bodyPart);
        bodyPartSelector.innerHTML += `<option value="${bodyPart}">${bodyPart}</option>`;
    }
}



// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));
const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', () => statsBtnHandler());

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {

    // start spinner rotating through colours
    spinnerCycle = setInterval(() => spinSpinners(), interval);

    // TODO randomly select colour from array
    let colourIndex: number = generateRandomIndex(coloursArray);
    selectedColour = coloursArray[colourIndex];
    // TODO randomly select bodyPart from array
    let bodyPartIndex: number = generateRandomIndex(bodyPartsArray);
    selectedBodyPart = bodyPartsArray[bodyPartIndex];

    function generateRandomIndex(array: Array<string>): number {
        let rng = Math.floor(Math.random() * array.length);
        return rng;
    }   

    spinBtn.disabled = true;

    // set timer to stop the spinners rotating
    setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.  
function spinSpinners() {
    spinnerCounter++;

    colourDiv.style.backgroundColor = coloursArray[spinnerCounter % coloursArray.length];

    bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
    clearInterval(spinnerCycle)
    // TODO set colourDiv and bodyPartP to the randomly spun results
    colourDiv.style.backgroundColor = selectedColour;
    bodyPartP.innerHTML = selectedBodyPart;

    spinBtn.disabled = false;
    addToHistory();
}


// TODO add the newly spun result to the history table
function addToHistory() {
    spinHistoryArray.push(new SpinRecord(Colours[selectedColour], BodyParts[selectedBodyPart]));
    const table:HTMLTableElement = <HTMLTableElement>document.getElementById('historyTable'); 
    table.insertRow().innerHTML = `<td>${spinHistoryArray.length}</td><td>${selectedColour}</td><td>${selectedBodyPart}</td>`;
}

function statsBtnHandler() {
    // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
    // eg. Red LeftHand spun 10 times
    //     Red LeftHand last spun at num 23
    let colourToGet = colourSelector.value;
    let bodyPartToGet = bodyPartSelector.value;
    let resultDiv = document.getElementById('statsResults');
    resultDiv.innerHTML = `${colourToGet} ${bodyPartToGet} spun ${getAmount(colourToGet, bodyPartToGet)} times. <br> ${colourToGet} ${bodyPartToGet} last spun at num ${getLastSpun(colourToGet, bodyPartToGet)}`;
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
    let num = 0;
    for(let i = 0; i < spinHistoryArray.length; i++) {
        if(spinHistoryArray[i].colour === coloursHelper.get(colour) && spinHistoryArray[i].bodyPart === BodyPartsHelper.get(bodyPart)) {
            num++;
        }
    }
    return num;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
    for(let i = spinHistoryArray.length - 1; i >= 0; i--) {
        if(coloursHelper.get(colour) === spinHistoryArray[i].colour && BodyPartsHelper.get(bodyPart) === spinHistoryArray[i].bodyPart){
            return i+1;
        }
    }
    return NaN;
}