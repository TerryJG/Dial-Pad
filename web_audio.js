//Creates tone sound and DTMF frequencies

// Check for compatibility with different web audio APIs
var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

// Tone constructor that takes a context, and two frequencies
function Tone(context, freq1, freq2) {
  this.context = context;
  this.status = 0; // 0 for off, 1 for on
  this.freq1 = freq1;
  this.freq2 = freq2;
}
// tone, oscillator, and filter
Tone.prototype.setup = function() {
  // Create two oscillators with specified frequencies
  this.osc1 = this.context.createOscillator();
  this.osc2 = this.context.createOscillator();
  this.osc1.frequency.value = this.freq1;
  this.osc2.frequency.value = this.freq2;

  // Gain node to control volume
  this.gainNode = this.context.createGain();
  this.gainNode.gain.value = 0.5;

  // Filter for sound shaping
  this.filter = this.context.createBiquadFilter();
  this.filter.type = "lowpass";
  this.filter.frequency = 8000;

  // Connect the audio components
  this.osc1.connect(this.gainNode);
  this.osc2.connect(this.gainNode);

  this.gainNode.connect(this.filter);
  this.filter.connect(this.context.destination);
}

// start the tone
Tone.prototype.start = function() {
  this.setup();
  this.osc1.start(0);
  this.osc2.start(0);
  this.status = 1;
}
// stop the tone
Tone.prototype.stop = function() {
  this.osc1.stop(0);
  this.osc2.stop(0);
  this.status = 0;
}

// DTMF Frequences
const dtmfFrequencies = {
  "1": { f1: 697, f2: 1209 },
  "2": { f1: 697, f2: 1336 },
  "3": { f1: 697, f2: 1477 },
  "4": { f1: 770, f2: 1209 },
  "5": { f1: 770, f2: 1336 },
  "6": { f1: 770, f2: 1477 },
  "7": { f1: 852, f2: 1209 },
  "8": { f1: 852, f2: 1336 },
  "9": { f1: 852, f2: 1477 },
  "*": { f1: 941, f2: 1209 },
  "0": { f1: 941, f2: 1336 },
  "#": { f1: 941, f2: 1477 },
};

// Create an AudioContext for handling audio operations
const context = new AudioContext();
const dtmf = new Tone(context, 350, 440); //350, 440 is the default tone sound

// Event listener for mouse click or touch
$(".num-letter, button.func-button").on("mousedown touchstart", function(e) {
  e.preventDefault();
  const keyPressed = $(this).contents().filter(function() {
    return this.nodeType === 3; // Filter for text nodes
  }).text().trim();

  const frequencyPair = dtmfFrequencies[keyPressed];  // DTMF freq lookup paired with pressed key

  if (frequencyPair) {
    dtmf.freq1 = frequencyPair.f1;
    dtmf.freq2 = frequencyPair.f2;

    if (dtmf.status === 0) {
      dtmf.start();
    }
  }
});

// Stop DTMF tone when the mouse or key is released
$(window).on("mouseup touchend", function() {
  if (dtmf.status) {
    // Stop playing the DTMF tone
    dtmf.stop();
  }
});