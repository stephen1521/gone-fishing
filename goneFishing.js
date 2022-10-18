// global vairables
const bag = {
    fish: [],
    doubloon: [],
    weight: 0,
    money: 0,
}
const watch = {
    hour: 6,
    minute: 00
}
const goldenDoubloon = {
    value: 75
}
const fishArr = ['Salmon','Catfish','Bass','Northern Pike','Trout','Walleye','Muskellunge','Bullhead','Carp','Sucker'];
const fishDesciptor1 = ['Small','Medium','Large','Little','Tiny','Average','Moderate','Huge','Enormous','Normal'];
const fishDesciptor2 = ['Slippery','Scaly','Shiny','Smelly','Bony','Finned','Luminescent','Colourful','Old','Young'];
let end = false;
let chum = false;
let min = 15;
let max = 90;
const prompt = require('prompt-sync')({sigint: true});

//main
console.log('You\'ve gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.');
divider();
while(!end){
printBag();
let fish = generateFish();
if(catchItem()){
    actionItem();
}else{
    printFish(fish);
    action(fish);
}
updateTime();
if(!chum){
    console.log('Enter [1] to chum water increasing the speed at which fish bite\nor press enter to conitue.');
    let input = Number(prompt('> '));
    if(input === 1){
        chum = true;
        chumWater();
    }
}
console.log('Press [1] to remove a fish from your bag or enter to continue.');
let input = Number(prompt('> '));
if(input === 1){
    console.log();
    removeFish();
}
divider();
if(watch.hour >= 12){
    console.log('The time is 12:00pm. Times up!\n');
    stats();
    end = true;
}
}

//prints bag fields and watch fields
function printBag(){
    if(watch.minute < 10){
        let num = 0;
        num += watch.minute.toString();
        console.log('The time is ' + watch.hour + ':' + num +'am. So far you\'ve caught:\n' + bag.fish.length + ' fish, ' + (bag.weight).toFixed(2) + ' lbs, $' + (bag.money).toFixed(2) + '\n');
    } else{
        console.log('The time is ' + watch.hour + ':' + watch.minute +'am. So far you\'ve caught:\n' + bag.fish.length + ' fish, ' + (bag.weight).toFixed(2) + ' lbs, $' + (bag.money).toFixed(2) + '\n');
    }
}

// line of = to divide 
function divider(){
    console.log('==============================================\n');
}

/* prints random fish fields 
*/
function printFish(fish){
    console.log('You caught a \'' + fish.name + '\' weighing ' + (fish.weight).toFixed(2) + ' lbs\nand valued at $' + (fish.value).toFixed(2) + '\n');
}

/* Prompts user for action, either catch or release fish. calls isBagOverWeight() and checkInput().
@param - randomly generated fish obj from catchfish method.
@return - if bag is overweight return.
*/
function action(fish){
    if(isBagOverWeight(fish)){
        return;
    }
    console.log('Your action: [c]atch or [r]elease ?');
    let input = prompt('> ');
    input = checkInput(input);
    console.log();
    if(input === 'c'){
        catchFish(fish);
    } else if(input === 'r') {
        console.log('You chose to release the fish.\n');
    }
}

// print bag final fields
function stats(){
    console.log('You caught ' + bag.fish.length + ' fish:');
    for(let i of bag.fish){
        console.log('* ' + i.name + ', ' + (i.weight).toFixed(2) + ' lbs, $' + (i.value).toFixed(2));
    }
    for(let i of bag.doubloon){
        console.log('* Golden Doubloon, ' + '$' + goldenDoubloon.value);
    }
    console.log('\nTotal weight: ' + (bag.weight).toFixed(2) + ' lbs');
    console.log('Total value: $' + (bag.money).toFixed(2));
}

/* Generate random fish obj
@return - return random fish obj
*/
function generateFish(){
    let fishName = Math.floor(Math.random() * (fishArr.length - 1));
    let desciptor1 = Math.floor(Math.random() * (fishDesciptor1.length - 1));
    let desciptor2 = Math.floor(Math.random() * (fishDesciptor2.length - 1));
    let fishWeight = Math.random() * 10;
    let fishValue = Math.random() * 51;
    let fish = {
        name: fishDesciptor1[desciptor1] + ' ' + fishDesciptor2[desciptor2] + ' ' + fishArr[fishName],
        weight: fishWeight,
        value: fishValue
    }
    return fish;
}

/* Check if bag is overweight
@return - return true if overweight, false if not
*/
function isBagOverWeight(fish){
    if(bag.weight + fish.weight > 10){
        console.log('This fish would put you over 10 lbs, so you release it.\n');
        console.log('Press [enter] to continue.');
        let input = prompt('> ');
        console.log();
        return true;
    }
    return false;
}

/* add random fish to bag.
@param - random fish obj
*/
function catchFish(fish){
    bag.fish.push(fish);
    bag.weight += fish.weight;
    bag.money += fish.value;
    console.log('You chose to keep the fish.\n');
}

/* Checks if input is c or r, prompts until input is c or r.
@param - input from user
@return - return user input
*/
function checkInput(input){
    let bool = true;
    while(bool){
        if(input === 'c'){
            bool = false;
        } else if(input === 'r'){
            bool = false;
        } else {
            console.log('Please enter [c] for catch or [r] for release.');
            input = prompt('> ');
        }
    }
    return input;
}

// updates fields in watch obj to add a random amount of time between max and min values
function updateTime(){
    let elaspedTime = Math.floor(Math.random() * (max - min)) + min;
    let temp = 0;
    if(elaspedTime >= 60){
        temp = elaspedTime - 60;
        watch.hour++;
        watch.minute += temp;
    }else{
        watch.minute += elaspedTime;
    }
    if(watch.minute >= 60){
        watch.hour++;
        temp = watch.minute - 60;
        watch.minute = temp;
    }
}

/* probability to catch an item is 10 percent
@return - return true if catch item passed
*/
function catchItem(){
    let num = Math.random()
    if(num <= .10){
        return true;
    }
    return false;
}

/* catch a doobloon or boot
*/
function actionItem(){
    let num = Math.random();
    if(num <= .50){
        console.log('You caught a golden doubloon.');
        console.log('You put the golden doobloon in your bag.\n');
        bag.doubloon.push(goldenDoubloon);
        bag.money += goldenDoubloon.value;
    } else {
        console.log('You caught a valueless boot.');
        console.log('You throw the boot in the garbage.\n');
    }
    console.log('Press [enter] to continue');
    prompt('> ');
}

/* adds 30 min to time and sets maximum time
to catch a fish to 30
*/
function chumWater(){
    watch.minute += 30;
    if(watch.minute >= 60){
        watch.hour++;
        let temp = watch.minute - 60;
        watch.minute = temp;
    }
    max = 30;
}

/*prompts user for what fish they want to remove,
removes fish from bag and updates fields.
*/
function removeFish(){
    for(let i = 0; i < bag.fish.length; i++){
        console.log('[' + i + '] ' + bag.fish[i].name + ', ' + (bag.fish[i].weight).toFixed(2) + ' lbs, $' + (bag.fish[i].value).toFixed(2));
    }
    console.log('What fish would you like to remove?');
    let input = Number(prompt('> '));
    bag.weight -= bag.fish[input].weight;
    bag.money -= bag.fish[input].value;
    bag.fish.splice(input,1);
}