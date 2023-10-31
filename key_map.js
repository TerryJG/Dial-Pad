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

// Event listener for pressed key
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

        // Add a class to the element when a key is pressed
        if (mappedKey) {
            const element = document.getElementById(keyMappings[keyPressed]);
            if (element && !element.classList.contains("key-input")) {
                element.classList.add("key-input");
            }
        }
    }
});

// Event listener for pressed key when released
document.addEventListener("keyup", (event) => {
    const keyPressed = event.key;
    if (dtmfFrequencies[keyPressed] && dtmf.status === 1) {
        dtmf.stop();
    }
    // Remove the class from the element when the key is released
    const element = document.getElementById(keyMappings[keyPressed]);
    if (element) {
        element.classList.remove("key-input");
    }
});