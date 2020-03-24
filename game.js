// Firstly variables/ objects- because the objects won't create conflictws with global variables
// Let's Play variable
const playBtn = document.querySelector('.play');
// place for communicate to user when he wom't choose the weapon
const info = document.querySelector('.choose');
// result information
const winner = document.querySelector('.result');
// General game informations 
//Player choice
const choicePlayerInfo = document.querySelector('[data-summary="your-choice"]');
// Ai Choice
const choiceAiInfo = document.querySelector('[data-summary="ai-choice');
// now we can declare the variables of particular game quantity
// 1,Total Games
let totalGames = document.querySelector('.gameQuantity span');
// 2. Wins
let winResult = document.querySelector('.wins span');
// 3.Looses
let lossResult = document.querySelector('.looses span');
// 4.Draws
let drawResult = document.querySelector('.draws span');
// Who win if we want to use it to give another information to result if smth
let whoWin = document.querySelector('[data-summary="who-win"]');
// General Game Object
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}; // object where later we willstore the values

// Actual game data object
const game = {
        playerHand: '', // what the user choose
        aiHand: '', //what the ai choose
        // playerHandHTML: '', // image border when choosen - not used with separate variable but will leave it as a possibility
    }
    // get to variable our images
const hands = [...document.querySelectorAll('.image-container img')]; //get the only images from image container separatly each image will be choosen convered to array thanks to squar brackets -  it is no need to get the array but we need to remember that array has more methodes.

// Functions

//1. Player's handSelection function
const handSelection = (e) => {
    // just for check if it is working target or current Target will be fine
    console.log(e.currentTarget.title); //we can see it works
    // If it is working we can refer to our game object - dataset collects all the information from data attribute/s  when we can choose what exctly we need
    game.playerHand = e.currentTarget.dataset.option;
    // check if it works
    console.log(e.currentTarget.dataset);
    console.log(e.currentTarget.dataset.option);
    console.log(game.playerHand);
    // now we can add  border to our choosen element
    //but b4 we add the style to our elementn we want to chose  we need to clean the shadow from others one with forEachmethode like that
    hands.forEach(element => element.style.boxShadow = '');
    e.currentTarget.style.boxShadow = '0 0 0 4px #659916';
    // set the main information of  weapon choice
    info.innerHTML = `Wybrałeś ${game.playerHand}`;
    // Color of information about player Choose
    info.style.color = ' #7e067e';
}

// Second - declarative function we can write by using this like below this == e/event.target || e/event.currentTarget
// function handSelection() {
//     // this is the same effect but i prefer ro use the arrow function
//     console.log(this.title);
// }


// 2a. function responsible for computer choice used in main steering function

function computerChoice() {
    // //variable of computer choice
    // const aiChoice = hands[Math.floor(Math.random() * 3)].dataset.option; //the dataset.option shows us the the name of chooen weapon.
    // // check what the ai has choosen.
    // console.log(aiChoice)
    // return aiChoice;// we do not need to do it like that so it is enough to move the return likke that:
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

// 3. checkResult() function which compoares the choosen elements of array and returns the score - that function is a part of main steering function '2'. game.playerHand is send as player ub this function and ai == aiHand

function checkResult(player, ai) {
    // just to check what was choosen
    console.log(player, ai);
    // The styles of winner start
    winner.style.fontSize = '3em';
    winner.style.color = '#0f0';
    // first condition if there is draw
    if (player === ai) {
        winner.style.fontWeight = 'bold';
        winner.style.color = 'grey';
        return winner.textContent = 'Remis';
    }
    //user winner condition
    else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === 'papier')) {
        // some  styling of result
        winner.style.fontWeight = 'bold';
        winner.style.color = '#00ff00';
        return winner.textContent = 'Win!';
    }
    // Ai has won
    else {
        winner.style.fontWeight = 'bold';
        winner.style.color = '#ff0000';
        return winner.textContent = 'Lost!';
    }
}
//4 Function which will publish the statistic of game and choices of 
function publishResult(player, ai, result) {
    // first we can check if the function is recognized by steering function 
    console.log(this); //we can see it is the element of dom which interests us at present
    // Now we can get element where we will display interested us informations
    // secod solution is to use the getters directly in the function separately or as a variable.
    // // //Player choice - variable
    // const choicePlayerInfo = document.querySelector('[data-summary="your-choice"]');
    // directly
    //document.querySelector'data-summary="your-choice"]').textContetn = player;
    // now we can set the result
    choicePlayerInfo.textContent = player;
    // some styles to our player choice information
    choicePlayerInfo.style.fontWeight = 'bold';
    choicePlayerInfo.style.color = '#00ff00';

    // // Ai Choice - also two solutions can be ued
    // const choiceAiInfo = document.querySelector('[data-summary="ai-choice');
    //now the ai result
    choiceAiInfo.textContent = ai;
    // Some styles to ai info display
    choiceAiInfo.style.fontWeight = 'bold';
    choiceAiInfo.style.color = '#ff0000';
    // Now we can directly from object take a total number of games because theyare not dependenc od the result so we can add smth like that - on top define the variables
    // Now the time for use the gameSummary
    totalGames.textContent = ++gameSummary.numbers;
    // now time for all the rest it will be under if statement
    // draw
    if (result === 'Remis') {
        whoWin.textContent = 'Wyjątek od każdej reguły - Remis';
        return drawResult.textContent = ++gameSummary.draws;
        // win
    } else if (result === 'Win!') {
        whoWin.textContent = 'Gracz jak zwykle górą:)';
        return winResult.textContent = ++gameSummary.wins;
        // here we can use data-summary to tell who has won
        //loose
    } else if (result === 'Lost!') {
        whoWin.textContent = 'Tym razem dałeś fory komputerowi';
        return lossResult.textContent = ++gameSummary.losses;
    }

}
// 5. Player choice re-set function
function choiceReset() {
    // reset the element choose
    // here we will use the direct declaration and getter because our choosen element won't change in a time.
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    // now we need remove the weapon from the memory
    game.playerHand = '';
    // and the ai weapon - no necessary just for rules
    game.aiHand = '';
};


// 2. Main steering function - this is a function which connects all the smaller functions (including the AI choice) together to work properly - for clicking on button Lets play - will be written as declarative function to show that it is good code specially for game which are using objects



function steeringFunc() {
    // check if the button is connected correctly
    console.log('You\'ve clicked the play button');
    //or 
    console.log(this);
    // or if we want to check how the button is named
    console.log(this.innerText);


    // checking if smth was choosen
    if (!game.playerHand) {
        info.style.fontSize = '2em';
        info.style.color = '#ff0000';
        return info.textContent = `Musisz wybrać Broń !!`;
        // the return will stop the function
    }
    // now check what the computer choose:
    game.aiHand = computerChoice();
    // 3. here we can declare variable of result - with two arguments - player choice and ai choice - we need to set the arguments as a parameters of function
    const gameResult = checkResult(game.playerHand, game.aiHand);
    //4. Results publicity function call
    publishResult(game.playerHand, game.aiHand, gameResult);
    //5. Player choice reset function
    choiceReset();

}

// EventListeners
// 1.Now we can add an EventListener for each of the images on click
hands.forEach(img => img.addEventListener('click', handSelection));

// 2. Main steering function called by clicking play button.
playBtn.addEventListener('click', steeringFunc);