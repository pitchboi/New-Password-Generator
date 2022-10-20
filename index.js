const charLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const charNumbers = ["0","1","2","3","4","5","6","7","8","9"]
const charSymbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let cssRoot = document.querySelector(":root");
let cssRootStyle = getComputedStyle(cssRoot);

let characters = [];
let passwords = [];
let passwordQuantity = 2;

let elLabelPasswordLength = document.getElementById("labelPasswordLength");
let elPassOne = document.getElementById("passwordButtonOne");
let elPassTwo = document.getElementById("passwordButtonTwo");
let elPasswordLength = document.getElementById("passwordLength");
let elNumberCheck = document.getElementById("numberCheck");
let elLetterCheck = document.getElementById("letterCheck");
let elSymbolCheck = document.getElementById("symbolCheck");
let elUniqueCheck = document.getElementById("uniqueCheck");

// Set page defaults
elPasswordLength.value = 15;

/**************** FUNCTIONS ****************/
// Change button colour
function changeButtonColour(buttonType, pressLevel) {
    console.log(pressLevel);

    switch (pressLevel) {
        case 1: // Pressed/Clicked
            if (buttonType === "generate") {
                cssRoot.style.setProperty('--generate-button-current-colour', cssRootStyle.getPropertyValue('--generate-button-pressed-colour'));
            } else { // password button
                //cssRoot.style.setProperty('--password-button-current-colour', cssRootStyle.getPropertyValue('--password-button-pressed-colour'));
            }
            break;
        case 2: // De-pressed/Unclicked
            if (buttonType === "generate") {
                cssRoot.style.setProperty('--generate-button-current-colour', cssRootStyle.getPropertyValue('--generate-button-depressed-colour'));
            } else { // password button
                //cssRoot.style.setProperty('--password-button-current-colour', cssRootStyle.getPropertyValue('--password-button-depressed-colour'));
            }
            break;
        case 3: // Hovered over
            if (buttonType === "generate") {
                cssRoot.style.setProperty('--generate-button-current-colour', cssRootStyle.getPropertyValue('--generate-button-hovered-colour'));
            } else { // password button
                //cssRoot.style.setProperty('--password-button-current-colour', cssRootStyle.getPropertyValue('--password-button-hovered-colour'));
            }
            break;
        case 4: // Unhovered over
            if (buttonType === "generate") {
                cssRoot.style.setProperty('--generate-button-current-colour', cssRootStyle.getPropertyValue('--generate-button-depressed-colour'));
            } else { // password button
                //cssRoot.style.setProperty('--password-button-current-colour', cssRootStyle.getPropertyValue('--password-button-depressed-colour'));
            }
            break;
    }
}

// Create characters array based on user preference
function createCharactersArray() {
    // Reset array
    characters.length = 0;

    // Numbers
    if (elNumberCheck.checked) {
        characters = characters.concat(charNumbers);
    }

    // Letters
    if (elLetterCheck.checked) {
        characters = characters.concat(charLetters);
    }

    // Symbols
    if (elSymbolCheck.checked) {
        characters = characters.concat(charSymbols);
    }

    // Check that array was populated
    if (characters.length === 0) {
        return false // Failed
    } else {
        return true // Passed!
    }
}

// Copy password
function copyPassword(buttonNumber) {
    // Copy the text inside the button
    switch (buttonNumber) {
        case 1:
            navigator.clipboard.writeText(elPassOne.textContent);
            break;
        case 2:
            navigator.clipboard.writeText(elPassTwo.textContent);
            break;
        default:
            break;
    }
}

// Update label
function updateLabel(labelName) {
    switch (labelName) {
        case "length":
            elLabelPasswordLength.textContent = "Length: " + elPasswordLength.value
            break;
    }
}

// Initial function to run when the "Generate Passwords" button is pressed
function generatePasswords() {
    // Set variable properties
    passwordLength = elPasswordLength.value

    // Reset the array of passwords
    passwords.length = 0;

    // Set legal characters
    if (!createCharactersArray()) {
        alert("Must select as least one character type to use");
        return;
    }

    // Generate a number of passwords based on how many are asked for
    for (i = 1; i <= passwordQuantity; i++) {
        // Add new password to array (and call the procedure that creates the password)
        passwords.push(makePassword());
    }

    // Assign the passwords to their respective button
    assignPasswords();
}

// Create a new password
function makePassword() {
    // Create a variable that will be the string used to store the password as it is created
    let passwordString = "";

    // Generate password based on the amount of characters requested
    for (j = 1; j <= passwordLength; j++) {
        passwordString += generateCharacter(passwordString);
    }

    return passwordString;
}

// Return a random character from the array of possible characters
function generateCharacter(currentPassword) {
    let char = characters[Math.floor(Math.random() * characters.length)];
    
    // Remove from characters array if unique characters only
    if (elUniqueCheck.checked) {
        characters.splice(characters.indexOf(char), 1);
    }

    return char;
}

// Assign passwords to buttons
function assignPasswords() {
    // Loop through passwords
    for (i = 0; i < passwords.length; i++) {
        switch (i) {
            case 0:
                elPassOne.textContent = passwords[i]
                break;
            case 1:
                elPassTwo.textContent = passwords[i]
                break;
        }
    }
}