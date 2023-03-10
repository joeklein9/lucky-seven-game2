const rollBtn = document.getElementById("roll-btn")
const bankBtn = document.getElementById("bank-btn")
let diceOne = document.getElementById("dice-one")
let diceTwo = document.getElementById("dice-two")
let sumResult = document.getElementById("sum-result")
const pointTokenContainer = document.getElementById ("point-tokens-container")
const bankedPointsContainer = document.getElementById("banked-points-container")
const bonusTokenContainer = document.getElementById("bonus-token-container")
const finalResultsMessage = document.getElementById("final-results-message")
const playAgainBtn = document.getElementById("play-again")
const banksCounter = document.getElementById("banks-counter")
const scoreBoard = document.getElementById("score-board")

let diceOneValue = 0
let diceTwoValue = 0
let sumResultValue = 0
let pointTokenValueArray = []
let bankedPointsArray = []
let bonusTokenArray = []
let scoreBoardArray = []
let bankedPointSum = 0
let isBusted = false
let bankBtnClicks = 0

rollBtn.disabled = false
bankBtn.disabled = false

//Function to generate random number

function getRandomNumber() {
    return Math.floor (Math.random ()*6) +1
}



//Event listener for rollBtn - change text on both dice to random number

rollBtn.addEventListener("click", function (){
    diceOneValue = getRandomNumber()
    diceTwoValue = getRandomNumber()
    diceOne.textContent = diceOneValue
    diceTwo.textContent = diceTwoValue
    getSumResult()
    displaySum()
    generatePointToken()
    displayPointTokenValueArray()
    determineBust()
    
})

//Get sum result according to the two dice

function getSumResult () {
    sumResultValue = diceOneValue + diceTwoValue
    return sumResultValue
}

// Display sum result in sum result box

function displaySum () {
    sumResult.textContent = getSumResult()
}

//Push a new point token to the point token array when a 7 is rolled

function generatePointToken () {
     if (sumResultValue == 7 ) {
        pointTokenValueArray.push (Math.floor (Math.random ()*3) +1)  
    } 
}


// Display the point token array in the point token section 

function displayPointTokenValueArray () {
    pointTokenContainer.textContent = `Point Tokens: ${pointTokenValueArray} (${getPointTokenSum()})`
    
}

// Get the sum of all point tokens 

function getPointTokenSum() {
  let pointTokenSum = 0;

  for (let i = 0; i < pointTokenValueArray.length; i += 1) {
    pointTokenSum += pointTokenValueArray[i]
  }
  
  return pointTokenSum;
  
}

// Get the sum of all banked points

function getBankedPointsSum() {
  let bankedPointSum = 0;

  for (let i = 0; i < bankedPointsArray.length; i += 1) {
    bankedPointSum += bankedPointsArray[i]
  }
  
  return bankedPointSum;
  
}

//Event listener for "bank" button to add the point token sum to banked points array, get new banked points sum, AND clear out current point tokens

bankBtn.addEventListener("click", function (){
    bankedPointsArray.push (getPointTokenSum())
    getBankedPointsSum()
    bankedPointsContainer.textContent = `Banked Points: ${getBankedPointsSum()}`
    getBonusTokens()
    displayBonusTokens()
    pointTokenValueArray = []
    displayPointTokenValueArray()
    bankBtnClicks += 1
    if (bankBtnClicks === 5) {
        bankBtn.disabled = true
        allBanksUsed()
    }
    banksCounter.textContent = `Banks used (out of 5): ${bankBtnClicks}`
})

// If banked point token value is greater than 3, earn bonus token worth between 1-3 points. If greater than 6, earn bonus token worth between 4-6 points. If greater than 9, earn points worth between 7-9 points. If greater than 10, guaranteed 10 points.


function getBonusTokens () {
    let pointTokenSum = getPointTokenSum()
    if (pointTokenSum >= 3 && pointTokenSum < 6) {
        bonusTokenArray.push(Math.floor(Math.random ()*3)+1)
    }
    else if (pointTokenSum >= 6 && pointTokenSum <= 9) {
        bonusTokenArray.push (Math.floor(Math.random() * (7 - 5 + 1)) + 5)
    }
    else if (pointTokenSum >= 10) {
        bonusTokenArray.push (10)
    }
}



//Bonus token sum 

function getBonusTokensSum() {
  let bonusTokenSum = 0;

  for (let i = 0; i < bonusTokenArray.length; i += 1) {
    bonusTokenSum += bonusTokenArray[i]
  }
  
  return bonusTokenSum;
  
}


//Display bonus token array in bonus token div

function displayBonusTokens () {
     bonusTokenContainer.textContent = `Bonus Tokens: ${bonusTokenArray} (${getBonusTokensSum()})`
} 

//Determine if busted or not 

function determineBust () {
    let pointTokenSum = getPointTokenSum()
    if (sumResultValue < pointTokenSum && sumResultValue != 7) {
        isBusted = true
        displayFinalTotal()
        playAgainBtn.classList.add(".show-button")
        
    }
}

//Display busted message and final total

function displayFinalTotal () {
    let bankedPointSum = getBankedPointsSum()
    let bonusTokenSum = getBonusTokensSum()
    finalResultsMessage.textContent = `You busted! Your final total: ${bankedPointSum + bonusTokenSum}`
    document.getElementById("play-again").style.visibility = "visible"
    pointTokenContainer.classList.toggle("line-through")
    rollBtn.disabled = true
    bankBtn.disabled = true
    scoreBoardArray.push(bankedPointSum + bonusTokenSum)
    document.getElementById("score-board-container").style.visibility = "visible"
    scoreBoard.textContent += "   " + scoreBoardArray[scoreBoardArray.length -1] + "   " + "|"

}

// Add event listener to play again button to reset the game


playAgainBtn.addEventListener("click", function (){
    pointTokenValueArray = []
    bankedPointsArray = []
    bonusTokenArray = []
    finalResultsMessage.textContent = ""
    pointTokenContainer.textContent = "Point Tokens:"
    bankedPointsContainer.textContent = "Banked Points:"
    bonusTokenContainer.textContent = "Bonus Tokens:"
    document.getElementById("play-again").style.visibility = "hidden"
    pointTokenContainer.classList.toggle("line-through")
    diceOne.textContent = "-"
    diceTwo.textContent = "-"
    sumResult.textContent = "-"
    rollBtn.disabled = false
    bankBtn.disabled = false
    bankBtnClicks = 0
    banksCounter.textContent = `Banks used (out of 5): ${bankBtnClicks}`
    
   
})

// Function to end game when banks have all been used - also displays final score

function allBanksUsed () 
{
    if (bankBtnClicks == 5) 
    {
        let bankedPointSum = getBankedPointsSum()
        let bonusTokenSum = getBonusTokensSum()
        finalResultsMessage.textContent = `No more banks left! Your final total: ${bankedPointSum + bonusTokenSum}`
        pointTokenContainer.classList.toggle("line-through")
        document.getElementById("play-again").style.visibility = "visible"
        rollBtn.disabled = true
        bankBtn.disabled = true
        scoreBoardArray.push(bankedPointSum + bonusTokenSum)
        document.getElementById("score-board-container").style.visibility = "visible"
        scoreBoard.textContent += "   " + scoreBoardArray[scoreBoardArray.length -1] + "   " + "|"

    } 
}
