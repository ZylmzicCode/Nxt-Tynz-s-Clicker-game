// Load settings from the JSON file
fetch('settings.json')
  .then(response => response.json())
  .then(settings => {
    // Use settings to configure the game
    const defaultTimeLimit = settings.game.defaultTimeLimit || 10;
    const buttonColor = settings.game.buttonColor || "#4caf50";
    const backgroundColor = settings.game.backgroundColor || "#f3f4f6";

    document.body.style.backgroundColor = backgroundColor;

    let score = 0;
    let timeLeft = defaultTimeLimit;
    let timer;

    const scoreElement = document.getElementById("score");
    const timeElement = document.getElementById("time");
    const clickButton = document.getElementById("clickButton");
    const startButton = document.getElementById("startGame");

    clickButton.disabled = true; // Disable the click button initially

    // Start game function
    startButton.addEventListener("click", () => {
      score = 0;
      timeLeft = defaultTimeLimit;
      scoreElement.textContent = score;
      timeElement.textContent = timeLeft;
      clickButton.disabled = false;
      startButton.disabled = true; // Disable the start button during the game

      // Start the countdown
      timer = setInterval(() => {
        timeLeft -= 1;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timer);
          clickButton.disabled = true; // Disable clicking after time is up
          startButton.disabled = false; // Enable the start button
          alert(`Time's up! Your score is ${score}.`);
        }
      }, 1000);
    });

    // Increase score when button is clicked
    clickButton.addEventListener("click", () => {
      score += 1;
      scoreElement.textContent = score;
    });
  })
  .catch(error => console.error('Error loading settings:', error));
