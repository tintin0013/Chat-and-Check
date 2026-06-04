// RECAPITULATIVE QUIZ

function displayRecapQuiz(currentIndex, state) {
  setCountdownRecapState(true);

  var question = recapQuizData[currentIndex];
  var isLast = currentIndex === recapQuizData.length - 1;
  var total = recapQuizData.length;

  var correctCount = state.recapResults.filter(function (r) {
    return r === true;
  }).length;
  var wrongCount = state.recapResults.filter(function (r) {
    return r === false;
  }).length;
  var remaining = total - correctCount - wrongCount;

  var miniBarsHTML = "";
  for (var j = 0; j < total; j++) {
    var barColor =
      j < currentIndex
        ? state.recapResults[j] === true
          ? "#07B29A"
          : "#BC2252"
        : j === currentIndex
          ? "#D38200"
          : "rgba(139,139,140,0.25)";
    miniBarsHTML +=
      '<div class="recap-mini-bar" style="background:' + barColor + '"></div>';
  }

  var answersHTML = question.answers
    .map(function (answer, index) {
      return (
        '<button class="answer-button recap-answer-button" data-index="' +
        index +
        '">' +
        answer +
        "</button>"
      );
    })
    .join("");

  var progressBarHTML = Array.from(
    { length: scenarios.length + 1 },
    function (_, index) {
      return (
        (index > 0
          ? '<div class="progress-line ' +
            (index <= state.currentScenario ? "completed" : "") +
            '"></div>'
          : "") +
        '<div class="progress-step ' +
        (state.scenarioStatus[index] === "success" ? "validated " : "") +
        (state.scenarioStatus[index] === "warning" ? "warning " : "") +
        (state.scenarioStatus[index] === "failed" ? "failed " : "") +
        (index === scenarios.length ? "active " : "") +
        '">' +
        (state.scenarioStatus[index] === "success"
          ? "✓"
          : state.scenarioStatus[index] === "warning"
            ? "!"
            : state.scenarioStatus[index] === "failed"
              ? "✗"
              : index === scenarios.length
                ? '<span style="color:white;">Q</span>'
                : index + 1) +
        "</div>"
      );
    },
  ).join("");

  state.mainContent.innerHTML =
    '<div class="scenario-screen recap-screen">' +
    '<div class="recap-top-bar">' +
    '<div class="scenario-progress">' +
    '<div class="progress-step start-step active">✓</div>' +
    '<div class="progress-line completed"></div>' +
    progressBarHTML +
    "</div>" +
    '<button class="recap-quiz-final-badge">Quiz final</button>' +
    "</div>" +
    '<div class="recap-status-row">' +
    '<div class="recap-mini-bars">' +
    miniBarsHTML +
    "</div>" +
    '<span class="recap-question-counter">Question ' +
    (currentIndex + 1) +
    "/" +
    total +
    "</span>" +
    "</div>" +
    '<div class="recap-question-row">' +
    '<p class="recap-question">' +
    question.question +
    "</p>" +
    "</div>" +
    '<div class="recap-answer-layout">' +
    '<div id="recap-answers" class="recap-answers">' +
    answersHTML +
    "</div>" +
    '<img src="assets/images/Chip_question.svg" alt="" class="recap-chip" id="recap-chip">' +
    "</div>" +
    '<div id="recap-feedback" class="recap-feedback" style="display:none;"></div>' +
    '<button id="recap-next-button" class="feedback-button recap-next-button" style="display:none;">' +
    (isLast ? "Terminer" : "Question suivante ->") +
    "</button>" +
    "</div>" +
    '<div class="recap-status-panel">' +
    '<div class="recap-status-item recap-status-correct">' +
    '<span class="recap-status-count" id="recap-count-correct">' +
    correctCount +
    "</span>" +
    '<span class="recap-status-label">Correctes</span>' +
    "</div>" +
    '<div class="recap-status-divider"></div>' +
    '<div class="recap-status-item recap-status-error">' +
    '<span class="recap-status-count" id="recap-count-wrong">' +
    wrongCount +
    "</span>" +
    '<span class="recap-status-label">Erreurs</span>' +
    "</div>" +
    '<div class="recap-status-divider"></div>' +
    '<div class="recap-status-item recap-status-remaining">' +
    '<span class="recap-status-count" id="recap-count-remaining">' +
    remaining +
    "</span>" +
    '<span class="recap-status-label">Restantes</span>' +
    "</div>" +
    "</div>";

  var answerButtons = document.querySelectorAll(".recap-answer-button");

  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var selectedIndex = parseInt(button.dataset.index);
      var isCorrect = selectedIndex === question.correctAnswer;
      state.recapResults[currentIndex] = isCorrect;

      if (isLast) {
        freezeCountdown();
      }

      answerButtons.forEach(function (btn) {
        btn.disabled = true;
      });
      button.classList.add(isCorrect ? "recap-correct" : "recap-incorrect");
      if (!isCorrect) {
        answerButtons[question.correctAnswer].classList.add("recap-correct");
      }

      var chip = document.getElementById("recap-chip");
      if (chip) {
        chip.src = isCorrect
          ? "assets/images/Chip_correct.svg"
          : "assets/images/Chip_incorrect.svg";
      }

      var allBars = document.querySelectorAll(".recap-mini-bar");
      if (allBars[currentIndex]) {
        allBars[currentIndex].style.background = isCorrect
          ? "#07B29A"
          : "#BC2252";
      }

      var allProgressSteps = document.querySelectorAll(".recap-progress-step");
      if (allProgressSteps[currentIndex]) {
        allProgressSteps[currentIndex].classList.remove(
          "recap-progress-step-current",
        );
        allProgressSteps[currentIndex].classList.add(
          isCorrect ? "recap-progress-step-correct" : "recap-progress-step-wrong",
        );
        allProgressSteps[currentIndex].textContent = isCorrect ? "✓" : "✕";
      }

      var cNow = state.recapResults.filter(function (r) {
        return r === true;
      }).length;
      var wNow = state.recapResults.filter(function (r) {
        return r === false;
      }).length;
      var rNow = total - cNow - wNow;

      var elC = document.getElementById("recap-count-correct");
      var elW = document.getElementById("recap-count-wrong");
      var elR = document.getElementById("recap-count-remaining");
      if (elC) elC.textContent = cNow;
      if (elW) elW.textContent = wNow;
      if (elR) elR.textContent = rNow;

      var feedback = document.getElementById("recap-feedback");
      feedback.innerHTML =
        '<p class="recap-feedback-label ' +
        (isCorrect
          ? "recap-feedback-correct-label"
          : "recap-feedback-incorrect-label") +
        '">' +
        (isCorrect ? "✓ Bonne réponse" : "✗ Mauvaise réponse") +
        "</p><p>" +
        question.explanation +
        "</p>";
      feedback.style.display = "block";
      document.getElementById("recap-next-button").style.display = "block";
    });
  });

  document
    .getElementById("recap-next-button")
    .addEventListener("click", function () {
      if (!isLast) {
        displayRecapQuiz(currentIndex + 1, state);
      } else {
        showQuizFinished(state);
      }
    });
}

// ========================================
// ÉCRAN FINAL (RÉSULTATS + 5 RÈGLES)
// ========================================
function showQuizFinished(state) {
  var finalScore = state.recapResults.filter(function (r) {
    return r === true;
  }).length;
  var finalTotal = recapQuizData.length;
  var finalResultContent = getRecapResultContent(finalScore, finalTotal);
  var scenarioScore = state.score;
  var scenarioTotalScore = scenarios.length * 2;
  var usedSecondChanceCount = state.scenarioSecondChanceUsed.filter(
    function (usedSecondChance) {
      return usedSecondChance;
    },
  ).length;
  var scenarioSummaryContent = getScenarioSummaryContent(
    scenarioScore,
    scenarioTotalScore,
  );
  var quizSummaryContent = getRecapQuizSummaryContent(finalScore);
  var elapsedQuizLabel = getElapsedQuizLabel();
  var restartIconPath = "assets/images/arrow.png";
  var downloadIconPath = "assets/images/upload.png";
  var essentialRulesHTML = getEssentialRules()
    .map(function (rule, index) {
      return (
        '<li class="quiz-finished-rule-item">' +
        '<span class="quiz-finished-rule-number">' +
        (index + 1) +
        "</span>" +
        '<span class="quiz-finished-rule-text">' +
        rule +
        "</span>" +
        "</li>"
      );
    })
    .join("");

  state.mainContent.innerHTML =
    '<div class="scenario-screen quiz-finished-screen">' +
    '<div class="quiz-finished-header">' +
    '<div class="quiz-finished-summary">' +
    '<div class="quiz-finished-score-ring" aria-label="Score final">' +
    '<span class="quiz-finished-score-value">' +
    finalScore +
    "</span>" +
    '<span class="quiz-finished-score-total">/' +
    finalTotal +
    "</span>" +
    "</div>" +
    '<div class="quiz-finished-copy">' +
    '<p class="quiz-finished-kicker">' +
    finalResultContent.label +
    "</p>" +
    '<p class="quiz-finished-title">' +
    finalResultContent.title +
    "</p>" +
    '<p class="quiz-finished-description">' +
    finalResultContent.description +
    "</p>" +
    "</div>" +
    "</div>" +
    '<button id="close-kit-button" class="quiz-finished-close-button">Fermer le kit</button>' +
    "</div>" +
    '<div class="quiz-finished-stats" aria-label="Résumé des performances">' +
    '<div class="quiz-finished-stat">' +
    '<span class="quiz-finished-stat-value" style="color: ' +
    scenarioSummaryContent.color +
    ';">' +
    scenarioScore +
    "/" +
    scenarioTotalScore +
    "</span>" +
    '<span class="quiz-finished-stat-label">' +
    scenarioSummaryContent.message +
    "</span>" +
    "</div>" +
    '<div class="quiz-finished-stat">' +
    '<span class="quiz-finished-stat-value" style="color: ' +
    quizSummaryContent.color +
    ';">' +
    finalScore +
    "/" +
    finalTotal +
    "</span>" +
    '<span class="quiz-finished-stat-label">' +
    quizSummaryContent.message +
    "</span>" +
    "</div>" +
    '<div class="quiz-finished-stat">' +
    '<span class="quiz-finished-stat-value quiz-finished-stat-value-time">' +
    elapsedQuizLabel +
    "</span>" +
    '<span class="quiz-finished-stat-label">Temps total</span>' +
    "</div>" +
    '<div class="quiz-finished-stat">' +
    '<span class="quiz-finished-stat-value" style="color: #D38200;">' +
    usedSecondChanceCount +
    "</span>" +
    '<span class="quiz-finished-stat-label quiz-finished-stat-label-white">2e chance utilisée</span>' +
    "</div>" +
    "</div>" +
    '<div class="quiz-finished-takeaways">' +
    '<h2 class="quiz-finished-rules-title">LES 5 REGLES ESSENTIELLES</h2>' +
    '<div class="quiz-finished-rules">' +
    '<ol class="quiz-finished-rules-list">' +
    essentialRulesHTML +
    "</ol>" +
    '<img src="assets/images/Chip_basic.svg" alt="" class="recap-chip" id="recap-chip">' +
    "</div>" +
    "</div>" +
    '<div class="quiz-finished-actions">' +
    '<button id="restart-path-button" class="quiz-finished-action-button quiz-finished-action-button-primary">' +
    "<span>Recommencer le parcours</span>" +
    '<img src="' +
    restartIconPath +
    '" alt="" class="quiz-finished-action-icon">' +
    "</button>" +
    '<button id="download-rules-button" class="quiz-finished-action-button quiz-finished-action-button-secondary">' +
    "<span>Télécharger les 5 règles</span>" +
    '<img src="' +
    downloadIconPath +
    '" alt="" class="quiz-finished-action-icon">' +
    "</button>" +
    "</div>" +
    "</div>";

  setCountdownRecapState(false);
  ensureCountdownElement().classList.add("countdown-timer-hidden");

  document
    .getElementById("close-kit-button")
    .addEventListener("click", function () {
      window.location.reload();
    });

  document
    .getElementById("restart-path-button")
    .addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      startExperience();
    });

  document
    .getElementById("download-rules-button")
    .addEventListener("click", function () {
      downloadEssentialRulesPdf(finalScore, finalTotal, finalResultContent);
    });
}
