// Game States 
// "WIN" - Player robot has defeated all enemy-robots 
//      * Fight all enemy-robots 
//      *Defeat each enemy-robot
// "Loss" - Player robot's health is zero or less

var fightOrSkip = function () {

    // ask if they want to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

    // enter the conditional recursive function call here!!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    // set user input to lowercase
    promptFight = promptFight.toLowerCase();
    console.log(promptFight)
    // if player choses skip 
    if (promptFight === "skip") {
        // confirm player wants to skip 
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight 
        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip fight. GoodBye!");
            // subract money 
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            //return true if player wants to leave
            return true

            // go to shop
            shop();
        }
    }

    return false
}

var fight = function (enemy) {
    while (enemy.health > 0 && playerInfo.health > 0) {
        // prompt user to fight or skip fight
        if (fightOrSkip()) { 
            break;
        }

        // generate random damage value based on player attack poower
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. "
        );

        // check enemy health 
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! ");

            // award play for winning
            playerInfo.money = playerInfo.money + 20;

            // leave loop enemy has died
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.")
        }

        // gerate random attack enemy
        var damage = randomNumber(enemy.attack - 3, enemy.attack)
        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // if you die end loop
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to stert a new game
var startGame = function () {
    // reset player health
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // what round it is
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick the next enemy
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy health
            pickedEnemyObj.health = randomNumber(40, 60);

            // if in trouble us debugger
            // debugger

            // throws whatever robot enemy you are on into the fight function
            fight(pickedEnemyObj);

            // shop after every enemy but the last 
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask player if they want to shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes taker them to the shop
                if (storeConfirm) {
                    shop();
                }
            }

        } else {
            window.alert("You have lost your robot in battle! Game Over!!");
        }
    }

    //    after loop ends, player is either dead or has defeated all enemies
    endGame()
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert(" You have lost your robot in battle.");
    }
    //   ask player if they want to go again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    }
    else {
        window.alert("Thank you for Playing Robot Gladiatos! Comeback soon!");
    }
}

var shop = function () {
    // ask player what they would like to do
    var shopOptionPromt = window.prompt(
        "Would you likr to REFILL your Health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPromt) {

        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "leave":
        case "LEAVE":
            window.alert("Leaving the Store");

            // do nothing so fuction will end
            break;
        default:
            window.alert("You did not pick a valid option. Try agian");

            // call shop again 
            shop();
            break;
    }
}

// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

//fuction to set up name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is you robot's name?");
    }
    console.log("Your robot's name is" + name)
    return name;
}


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    atttack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 fro 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You Dont have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars!")
            this.attack += 6;
            this.money - 7;
        }
        else {
            window.alert("You do not have enough Money!")
        }
    }
};

var enemyInfo = [
    {
        name: "Morgana",
        attack: randomNumber(10, 14)
    },
    {
        name: "Master Yi",
        attack: randomNumber(10, 14)
    },
    {
        name: "Yumi",
        attack: randomNumber(10, 14)
    }
];

// start the game 
startGame();