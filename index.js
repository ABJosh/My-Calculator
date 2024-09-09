const buttonsEl = document.querySelectorAll("button");

const inputFieldEl = document.getElementById("result");

const loveSong = document.getElementById("loveSong");

let intervalId = null;

// Messages to display in the background

const randomMessages = [
  "Nandito lang ako palagi",
  "Gusto ko naka smile ka",
  "I'm only one call away hihi",
  "Bawal naka simangoooot",
  "I love youuuu",
  "Ganda mo kaya pag naka smile",
  "Miss na kita agad hihi",
  "I love your smilee",
  "Sana nandito ka lagi",
  "Kumain kaa haaa",
  "Ingat ka palagi",
  "Hindi ka mawawala sa isip ko"
];

for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;
    if(buttonValue === "C") {
      clearResult(), stopMusicAndMessages();
    } else if (buttonValue === "=") {
      calculateResult();
    } else if (buttonValue === "CE") {
      backspace();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldEl.value = "";
}

// Function to calculate result or show special message
function calculateResult() {
  const inputValue = inputFieldEl.value.trim(); // Remove leading/trailing spaces
  if (inputValue === "23+29") {
    clearResult(); // Clear input field
    stopMusicAndMessages(); // Stop any ongoing messages and music

    // Display special message
    inputFieldEl.value = "I love you since day 1";
    loveSong.play(); // Play the music

    // Wait for 2 seconds before starting random messages
    setTimeout(() => {
      displayRandomMessages(); // Start displaying random messages
    }, 4000);
  } else {
    try {
      inputFieldEl.value = eval(inputValue); // Evaluate the expression
    } catch (error) {
      inputFieldEl.value = "Error"; // Handle evaluation errors
    }
  }
}

function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;
  // inputFieldEl.value = inputFieldEl.value + buttonValue;
}

function backspace() {
  inputFieldEl.value = inputFieldEl.value.slice(0, -1);
}

// Function to display random messages
function displayRandomMessages() {
  clearResult(); // Clear any existing message

  let index = 0; // Initialize index for randomMessages array

  intervalId = setInterval(() => {
    if (index < randomMessages.length) {
      const message = randomMessages[index];
      inputFieldEl.value = message; // Display one message at a time
      inputFieldEl.scrollTop = inputFieldEl.scrollHeight; // Scroll to bottom of input field (optional)
      index++; // Move to the next message
    } else {
      clearInterval(intervalId); // Stop the interval when all messages are displayed
    }
  }, 2000);
}

// Function to stop music and messages
function stopMusicAndMessages() {
  loveSong.pause(); // Pause the music
  clearInterval(intervalId); // Stop displaying random messages
}
