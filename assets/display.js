var input = '';
var output = $('.output');

// update and display formatted phone number
function updateOutput() {
  const formattedInput = formatPhoneNumber(input);
  // console.log('Input:', input);
  // console.log('Formatted Input:', formattedInput);
  output.text(formattedInput);
}

// Phone number format: "000-0000"
function formatPhoneNumber(value) {
  if (!value) return value;
  const input = value.replace(/[^\d*#]/g, ''); // Remove characters that are not digits, '*', or '#' from the input
  const inputLength = input.length;
  if (inputLength <= 3) {
    return input;
  } else if (inputLength <= 7) {
    return `${input.slice(0, 3)}-${input.slice(3)}`; // If input is between 4 to 7 digits, format number
  } else {
    return `${input.slice(0, 3)}-${input.slice(3, 7)}`; // If input is > than 7 digits, format number
  }
}

// Phone number format: "000-0000-00" | Used for secret numbers
function formatPhoneNumber10Digits(value) {
  if (!value) return value;
  const input = value.replace(/[^\d*#]/g, '');
  const inputLength = input.length;
  if (inputLength <= 3) {
    return input;
  } else if (inputLength <= 7) {
    return `${input.slice(0, 3)}-${input.slice(3)}`;
  } else if (inputLength <= 10) {
    return `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 10)}`;
  }
}

// Event handler for button click on elements
$(".num-letter").on('click', function() {
  var num = $(this).text().trim().match(/[0-9*#]/); // Get the first digit or '#' or '*' from the text
  if (num && input.length < 7) { // Check if a number was found and input length is within the limit
    input += num[0];
    updateOutput();
  }
});

// Event handler for the back button
$("button.func-button#back").on('click', function() {
  if (input.length > 0) {
    input = input.slice(0, -1); // Remove the last digit from the input
    updateOutput();
  }
});

// Update the display
function updateDisplay() {
  display.value = input;
}