// APPLICATION ENTRY POINT

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startExperience);

function startExperience() {
  startCountdown();

  var state = {
    mainContent: document.getElementById("main-content"),
    currentScenario: 0,
    attempts: 0,
    score: 0,
    scenarioStatus: Array(scenarios.length).fill("pending"),
    scenarioSecondChanceUsed: Array(scenarios.length).fill(false),
    recapResults: [],
  };

  displayScenario(state);
}
