let pcards = []
let dcards = []
let psum = 0
let dsum = 0
let rcards = []
let sum = []
let hasBlackJack = false
let isAlive = false
let gameStarted = false
let hasWon = false
let hasLost = false
let betPlaced = false
let message=""
let messageEl = document.getElementById("message")
let pcardsEl = document.getElementById("pcards")
let dcardsEl = document.getElementById("dcards")
let psumEl = document.getElementById("psum")
let dsumEl = document.getElementById("dsum")
let betEl = document.getElementById("betinput")
let player = {
    name: "Player",
    chips: 150
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips


function bet() {
    if (betEl.value>player.chips || betEl.value < 1) {
        messageEl.textContent = "Please place a valid bet."
        betPlaced = false
    } else if (!betPlaced) {
        messageEl.textContent = "Bet has been accepted."
        betPlaced = true
        console.log("hi")
    }
}

function newGame() {
    bet()
    if (gameStarted && (!isAlive || hasBlackJack) && betPlaced) {
        pcards = []
        dcards = []
        psum = 0
        dsum = 0
        dcardsEl.textContent = "Cards: "
        dsumEl.textContent = "Sum: "
        rcards = []
        sum = []
        hasBlackJack = false
        isAlive = false
        gameStarted = false
        message=""
        startGame()
    }
}

function startGame() {  
    bet()
    if (!gameStarted && betPlaced) {
        isAlive = true
        gameStarted = true
        getRandomCard()
        let firstCard = rcards[0]
        psum += rcards[1]
        getRandomCard()
        let secondCard = rcards[0]
        psum += rcards[1]
        pcards = [firstCard, secondCard]
        newStep()
    }
}

function newStep() {
    verifyAce(psum, pcards)
    psum = sum[1]
    psumEl.textContent = "Sum: " + sum[0]
    pcardsEl.textContent = "Cards: "
    for (let i = 0; i < pcards.length; i++) {
        pcardsEl.textContent += pcards[i] + " "
    }
    if (psum < 21) {
        message = "Do you want to draw a new card?"
    } else if (psum === 21) {
        message = "Wohoo! You've got Blackjack!"
        hasBlackJack = true
        hasWon = true
        hasLost = false
        hello()
    } else {
        message = "You're out of the game!"
        isAlive = false
        hasLost = true
        hello()
    }
    messageEl.textContent = message
}

function hit() {
    if (isAlive && !hasBlackJack) {
        getRandomCard()
        let newCard = rcards[0]
        psum += rcards[1]
        pcards.push(newCard)
        newStep()
    }
}

function stand() {
    if (isAlive && !hasBlackJack) {
        while (dsum<17) {
            getRandomCard()
            dcards.push(rcards[0])
            dsum+=rcards[1]
            verifyAce(dsum,dcards)
            dsum = sum[1]
            dsumEl.textContent="Sum: " + sum[0]
            dcardsEl.textContent = "Cards: "
            for (let i = 0; i < dcards.length; i++) {
            dcardsEl.textContent += dcards[i] + " "
            }
        }

        if (pcards.includes(1)) {
            if (psum+10< 21) {
                psum +=10
                psumEl.textContent = "Sum: " + psum
            } else {
                psumEl.textContent = "sum: " + psum
            }
        }
        
        if (dcards.includes(1)) {
            if (dsum+10< 21) {
                dsum +=10
                dsumEl.textContent = "Sum: " + dsum
            } else {
                dsumEl.textContent = "sum: " + dsum
            }
        }
        
        
        isAlive = false
        if (dsum<22) {
            if (dsum>psum){
                message = "Dealer wins!"
                hasLost = true
                hello()
            } else if (dsum === psum) {
                message = "It's a tie!"
            } else {
                message = "Player wins!"
                hasWon = true
                hasLost = false
                hello()
            }
        } else {
            message = "Player wins!"
            hasWon = true
            hasLost = false
            hello()
        }
        messageEl.textContent = message
    }
}

function hello() {
    if (hasLost) {
        player.chips = player.chips - Number(betEl.value)
        playerEl.textContent = player.name + ": $" + player.chips
    } else if (hasWon || hasBlackJack) {
        player.chips = player.chips + Number(betEl.value)
        playerEl.textContent = player.name + ": $" + player.chips
    }
    
}

function getRandomCard() {
    let randocard = Math.floor(Math.random()*13)+ 1
    let apparentcard = 0
    rcards = []
    if (randocard > 10) {
        apparentcard = 10
    } else {
        apparentcard = randocard
    } rcards=[randocard, apparentcard]
} 

function verifyAce(sums,lists) {
    sum = []
    let a = sums
    let msg = sums
    if (lists.includes(1)) {
        if (sums+10<21) {
            msg = sums + "/" + (sums+10)
        } else if (sums+10 === 21) {
            msg = (sums+10)
            a = (sums+10)
        } sum = [msg,a]
        return sum
    } else {
        sum = [msg,a]
        return sum
    }
}
