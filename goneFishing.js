// global vairables
const bag = {
    fish: [],
    weight: 0,
    money: 0,
    time: 6
}
const fishArr = ['Salmon','Catfish','Bass','Northern Pike','Trout','Walleye','Muskellunge','Bullhead','Carp','Sucker'];
const fishDesciptor1 = ['Small','Medium','Large','Little','Tiny','Average','Moderate','Huge','Enormous','Normal'];
const fishDesciptor2 = ['Slippery','Scaly','Shiny','Smelly','Bony','Finned','Luminescent','Colourful','Old','Young'];
let end = false;
const prompt = require('prompt-sync')({sigint: true});

//main
console.log('You\'ve gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.');
divider();
while(!end){
printBag();
let fish = catchFish();
action(fish);
divider();
if(bag.time >= 12){
    console.log('The time is 12:00pm. Times up!\n');
    stats();
    end = true;
}
}

//prints bag obj fields
function printBag(){
console.log('The time is ' + bag.time + ':00am. So far you\'ve caught:\n' + bag.fish.length + ' fish, ' + (bag.weight).toFixed(2) + ' lbs, $' + (bag.money).toFixed(2) + '\n');
}

// line of = to divide 
function divider(){
    console.log('==============================================\n');
}

/* generates random fish, prints random fish fields
   @return - returns the randomly generated fish 
*/
function catchFish(){
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
    console.log('You caught a \'' + fish.name + '\' weighing ' + (fish.weight).toFixed(2) + ' lbs\nand valued at $' + (fish.value).toFixed(2) + '\n');
    return fish;
}

/* Prompts user for action, either catch or release fish. checks if bag is overweight if so return. adds 1 hour to time.
if catch add fish to bag, else release fish
@param - randomly generated fish obj from catchfish method.
@return - if bag is overweight return.
*/
function action(fish){
    bag.time += 1;
    if(bag.weight + fish.weight > 10){
        console.log('This fish would put you over 10 lbs, so you release it.\n');
        console.log(('Press [enter] to continue.'));
        let input = prompt('> ');
        console.log();
        return;
    }
    console.log('Your action: [c]atch or [r]elease?');
    let input = prompt('> ');
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
    console.log();
    if(input === 'c'){
        bag.fish.push(fish);
        bag.weight += fish.weight;
        bag.money += fish.value;
        console.log('You chose to keep the fish.\n');
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
    console.log('\nTotal weight: ' + (bag.weight).toFixed(2) + ' lbs');
    console.log('Total value: $' + (bag.money).toFixed(2));
}

