// DISPLAY SCENARIOS

function buildProgressBar(state) {
  return Array.from(
    { length: scenarios.length + 1 },
    function (_, index) {
      return `
        ${index > 0 ? `<div class="progress-line ${index <= state.currentScenario ? "completed" : ""}"></div>` : ""}
        <div class="progress-step
            ${state.scenarioStatus[index] === "success" ? "validated" : ""}
            ${state.scenarioStatus[index] === "warning" ? "warning" : ""}
            ${state.scenarioStatus[index] === "failed" ? "failed" : ""}
            ${index === state.currentScenario ? "current" : ""}">
            ${
              state.scenarioStatus[index] === "success"
                ? "✓"
                : state.scenarioStatus[index] === "warning"
                  ? "!"
                  : state.scenarioStatus[index] === "failed"
                    ? "✗"
                    : index === scenarios.length
                      ? "Q"
                      : index + 1
            }
        </div>
      `;
    },
  ).join("");
}

function displayScenario(state) {
  setCountdownRecapState(false);

  const scenario = scenarios[state.currentScenario];

  state.mainContent.innerHTML = `
    <div class="score-box">
        Score : ${state.score} / ${scenarios.length * 2}
    </div>

    <div class="scenario-screen">

        <div class="scenario-progress">
            <div class="progress-step start-step active">✓</div>
            <div class="progress-line completed"></div>
            ${buildProgressBar(state)}
        </div>

        <div class="scenario-badge">
            ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}
        </div>

        <div class="scenario-context">
            <strong>Contexte :</strong>
            ${scenario.role}
            ${scenario.description}
        </div>

        <div class="scenario-question">
            ${scenario.question}
        </div>

        <button class="answer-button" data-answer="0">${scenario.answers[0]}</button>
        <button class="answer-button" data-answer="1">${scenario.answers[1]}</button>
        <button class="answer-button" data-answer="2">${scenario.answers[2]}</button>

    </div>
  `;

  const answerButtons = document.querySelectorAll(".answer-button");

  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedAnswer = parseInt(button.dataset.answer);

      // CASE 1: CORRECT ANSWER
      if (selectedAnswer === scenario.correctAnswer) {
        if (state.attempts === 0) {
          state.score = state.score + 2;
        } else {
          state.score = state.score + 1;
        }

        state.mainContent.innerHTML = `
          <div class="scenario-screen">

            <div class="scenario-progress">
                <div class="progress-step start-step active">✓</div>
                <div class="progress-line completed"></div>
                ${buildProgressBar(state)}
            </div>

            <div class="scenario-badge">
                ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}
            </div>

            <div class="selected-answer-box">
                <div class="selected-answer-label">Vous avez choisi :</div>
                <div class="selected-answer-text">
                    ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}
                </div>
            </div>

            <div class="feedback-box feedback-success">
                <div class="feedback-title">Bonne réponse</div>
                <div class="feedback-text">${scenario.feedback}</div>
            </div>

            <img src="assets/images/Chip_correct.svg" alt="Bonne réponse" class="chatty-success" />

            <div class="takeaway-box">
                <div class="takeaway-title">A RETENIR POUR LA SUITE</div>
                <div class="takeaway-item">✅ ${scenario.takeaways[0]}</div>
                <div class="takeaway-item">✅ ${scenario.takeaways[1]}</div>
            </div>

            <button id="continue-button" class="feedback-button">Scénario suivant →</button>

          </div>
        `;

        const continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", function () {
          if (state.attempts === 0) {
            state.scenarioStatus[state.currentScenario] = "success";
          } else {
            state.scenarioStatus[state.currentScenario] = "warning";
          }

          state.currentScenario++;
          state.attempts = 0;

          if (state.currentScenario < scenarios.length) {
            displayScenario(state);
          } else {
            showEndScreen(state);
          }
        });
      } else {

        // CASE 2: INCORRECT ANSWER
        state.attempts++;

        if (!state.scenarioSecondChanceUsed[state.currentScenario]) {
          state.scenarioSecondChanceUsed[state.currentScenario] = true;
        }

        state.scenarioStatus[state.currentScenario] = "warning";

        // FIRST ERROR
        if (state.attempts === 1) {
          state.mainContent.innerHTML = `
            <div class="scenario-screen">

              <div class="scenario-progress">
                  <div class="progress-step start-step active">✓</div>
                  <div class="progress-line completed"></div>
                  ${buildProgressBar(state)}
              </div>

              <div class="scenario-badge">
                  ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}
              </div>

              <div class="selected-answer-box">
                  <div class="selected-answer-label">Vous avez choisi :</div>
                  <div class="selected-answer-text selected-answer-text-error">
                      ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}
                  </div>
              </div>

              <div class="feedback-box feedback-error">
                  <div class="feedback-title">Attention</div>
                  <div class="feedback-text">${scenario.wrongFeedback}</div>
              </div>

              <img src="assets/images/Chip_question.svg" alt="Question" class="chatty-first-error" />

              <div class="takeaway-box takeaway-box-error">
                  <div class="takeaway-title">CE QU'IL FAUT RETENIR</div>
                  <div class="takeaway-item">❌ ${scenario.wrongTakeaways[0]}</div>
                  <div class="takeaway-item">❌ ${scenario.wrongTakeaways[1]}</div>
              </div>

              <button id="retry-button" class="feedback-button">Réessayer - 1 tentative restante ↻</button>

            </div>
          `;

          const retryButton = document.getElementById("retry-button");
          retryButton.addEventListener("click", function () {
            displayScenario(state);
          });
        } else {
          // SECOND ERROR
          state.mainContent.innerHTML = `
            <div class="scenario-screen">

              <div class="scenario-progress">
                  <div class="progress-step start-step active">✓</div>
                  <div class="progress-line completed"></div>
                  ${buildProgressBar(state)}
              </div>

              <div class="scenario-badge">
                  ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}
              </div>

              <div class="selected-answer-box">
                  <div class="selected-answer-label">Vous avez choisi :</div>
                  <div class="selected-answer-text selected-answer-text-error">
                      ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}
                  </div>
              </div>

              <div class="feedback-box feedback-error">
                  <div class="feedback-title">Mauvaise réponse</div>
                  <div class="feedback-text">
                      Vous avez utilisé vos deux tentatives.
                      <br><br>
                      La bonne réponse était :
                      <br><br>
                      <strong>${scenario.answers[scenario.correctAnswer]}</strong>
                      <br><br>
                      ${scenario.feedback}
                  </div>
              </div>

              <img src="assets/images/Chip_incorrect.svg" alt="Erreur" class="chatty-success" />

              <div class="takeaway-box">
                  <div class="takeaway-title">A RETENIR POUR LA SUITE</div>
                  <div class="takeaway-item">✅ ${scenario.takeaways[0]}</div>
                  <div class="takeaway-item">✅ ${scenario.takeaways[1]}</div>
              </div>

              <button id="continue-button" class="feedback-button">Continuer</button>

            </div>
          `;

          const continueButton = document.getElementById("continue-button");
          continueButton.addEventListener("click", function () {
            state.scenarioStatus[state.currentScenario] = "failed";
            state.currentScenario++;
            state.attempts = 0;

            if (state.currentScenario < scenarios.length) {
              displayScenario(state);
            } else {
              showEndScreen(state);
            }
          });
        }
      }
    });
  });
}


// END OF THE COURSE SCREEN
function showEndScreen(state) {
  setCountdownRecapState(false);

  state.mainContent.innerHTML = `
    <div class="scenario-screen">

        <h1>Parcours terminé</h1>

        <p>Votre score est de :</p>

        <h2>${state.score} / ${scenarios.length * 2}</h2>

        <p>${getResultMessage(state.score)}</p>

        <button id="recap-button" class="feedback-button" style="margin-top: 20px;">
            Quiz Récapitulatif
        </button>

    </div>
  `;

  document
    .getElementById("recap-button")
    .addEventListener("click", function () {
      state.recapResults = new Array(recapQuizData.length).fill(null);
      displayRecapQuiz(0, state);
    });
}
