// Key mappings for keyboard input
const keyMappings = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '*': '*',
    '0': '0',
    '#': '#',
    'Backspace': 'Backspace',
};

// When key is pressed
document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    const mappedKey = keyMappings[keyPressed];   // reference keyMappings
    
    // Cond. statement for backspace key
    if (mappedKey === 'Backspace' && input.length > 0) {
        input = input.slice(0, -1); // Remove the last digit from the input
        updateOutput();
    } 
    // Check if mapped key is defined and input length is below limit
    else if (mappedKey && input.length < 7) {
        input += mappedKey;
        updateOutput();
      
        // Check if pressed key corresponds to DTMF tone
        const frequencyPair = dtmfFrequencies[keyPressed];
        if (frequencyPair) {
            dtmf.freq1 = frequencyPair.f1;
            dtmf.freq2 = frequencyPair.f2;

            if (dtmf.status === 0) {
                dtmf.start();
            }
        }

        // When key is pressed, add class to element
        if (mappedKey) {
            const element = document.getElementById(keyMappings[keyPressed]);
            if (element && !element.classList.contains("key-input")) {
                element.classList.add("key-input");
            }
        }
    }
});

// When pressed key is released
document.addEventListener("keyup", (event) => {
    const keyPressed = event.key;
    if (dtmfFrequencies[keyPressed] && dtmf.status === 1) {
        dtmf.stop();
    }
    // when key is released, remove class from element
    const element = document.getElementById(keyMappings[keyPressed]);
    if (element) {
        element.classList.remove("key-input");
    }
});

// Touchscreen Functions
//0-9; *&#
function handleTouch(event) {
    const touchedElement = event.target;
    if (touchedElement.classList.contains("num-letter")) {
        const num = touchedElement.id;

        // Check if input length is below limit
        if (input.length < 7) {
            input += num;
            updateOutput();
        }
        // Check if pressed key corresponds to DTMF tone
        const frequencyPair = dtmfFrequencies[num];
        if (frequencyPair) {
            dtmf.freq1 = frequencyPair.f1;
            dtmf.freq2 = frequencyPair.f2;

            if (dtmf.status === 0) {
                dtmf.start();
            }
        }
        // When key is pressed, add class to element
        if (!touchedElement.classList.contains("key-input")) {
            touchedElement.classList.add("key-input");
        }
    }
}
const numpadWrapper = document.querySelector(".numpad-wrapper");
numpadWrapper.addEventListener("touchstart", handleTouch);

 // "back" & "call"
function handleFuncButtonTouch(event) {
    const touchedButton = event.target;
    if (touchedButton.classList.contains("func-button")) {
        const buttonId = touchedButton.id;

        if (buttonId === "func-button-id") {

        } else if (buttonId === "back") {
        }

        if (!touchedButton.classList.contains("button-touched")) {
            touchedButton.classList.add("button-touched");
        }
    }
}
const funcButtons = document.querySelectorAll(".func-button");
funcButtons.forEach((button) => {
    button.addEventListener("touchstart", handleFuncButtonTouch);
});

funcButtons.forEach((button) => {
    button.addEventListener("touchend", (event) => {
        // Remove the class from the button when the touch ends
        button.classList.remove("button-touched");
    });
})