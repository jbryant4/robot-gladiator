// Game States 
// "WIN" - Player robot has defeated all enemy-robots 
//      * Fight all enemy-robots 
//      *Defeat each enemy-robot
// "Loss" - Player robot's health is zero or less

// Add name prompt 
var playerName = window.prompt("What is your robot's name?")
var playerHealth = 100;
var playerAttack = 50;
var playerMoney = 10;

var enemyNames = ['Morgana', 'Master Yi', 'Yumi'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);


var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

        // if player choses skip 
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip 
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight 
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip fight. GoodBye!");
                // subract money 
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
        );

        // check enemy health 
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died! ");

            // award play for winning
            playerMoney = playerMoney + 20;

            // leave loop enemy has died
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.")
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // if you die end loop
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// function to stert a new game
var startGame = function () {
    // reset player health
    playerHealth = 100;
    playerAttack = 50;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // what round it is
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick the next enemy
            var pickedEnemyName = enemyNames[i];

            // reset enemy health
            enemyHealth = 50;

            // if in trouble us debugger
            // debugger

            // throws whatever robot enemy you are on into the fight function
            fight(pickedEnemyName);

            // shop after every enemy but the last 
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerMoney + ".");
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
        "Would you likr to REFILL your enemyHealth, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPromt) {

        case "REFILL":
        case "refill":
            if (playerMoney >= 5) {
                window.alert("Refilling player's health by 20 for 7 dollars");

                // increase health and decrease money
                playerHealth = playerHealth + 15;
                playerMoney = playerMoney - 5;
            }
            else {
                window.alert("You dont have enough money!")
            }

            break;

        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You do not have enough money!");
            }

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
// start the game 
startGame();