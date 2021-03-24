// Game States 
// "WIN" - Player robot has defeated all enemy-robots 
//      * Fight all enemy-robots 
//      *Defeat each enemy-robot
// "Loss" - Player robot's health is zero or less

// Add name prompt 
var playerName = window.prompt("What is your robot's name?")
var playerHealth = 100;
var playerAttack = 10;
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

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // what round it is
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!!");
    }
    // pick the next enemy
    var pickedEnemyName = enemyNames[i];

    // reset enemy health
    enemyHealth = 50;

    // if in trouble us debugger
    // debugger

    // throws whatever robot enemy you are on into the fight function
    fight(pickedEnemyName);
}