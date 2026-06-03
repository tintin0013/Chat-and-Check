const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startExperience);

function startExperience() {

    const mainContent = document.getElementById("main-content");

    let currentScenario = 0;

    let attempts = 0;

    let score = 0;

    let recapResults = [];

    displayScenario();

    function displayScenario() {

        const scenario = scenarios[currentScenario];

        mainContent.innerHTML = `
        
            <div class="score-box">
                Score : ${score} / ${scenarios.length * 2}
            </div>

            <div class="scenario-screen">

                <div class="scenario-progress">

                    <div class="progress-step active"></div>

                    <div class="progress-line"></div>

                    <div class="progress-step current">1</div>

                    <div class="progress-line"></div>

                    <div class="progress-step">2</div>

                    <div class="progress-line"></div>

                    <div class="progress-step">3</div>

                    <div class="progress-line"></div>

                    <div class="progress-step">4</div>

                    <div class="progress-line"></div>

                    <div class="progress-step">5</div>

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

                <button class="answer-button" data-answer="0">
                    ${scenario.answers[0]}
                </button>

                <button class="answer-button" data-answer="1">
                    ${scenario.answers[1]}
                </button>

                <button class="answer-button" data-answer="2">
                    ${scenario.answers[2]}
                </button>

            </div>
        
        `;

        const answerButtons = document.querySelectorAll(".answer-button");

        answerButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedAnswer = parseInt(button.dataset.answer);

                if (selectedAnswer === scenario.correctAnswer) {

                    if (attempts === 0) {

                        score = score + 2;

                    } else {

                        score = score + 1;

                    }

                    mainContent.innerHTML = `
                    
                        <div class="scenario-screen">

                            <div class="feedback-box feedback-success">

                                <img

                                    src="assets/images/Chip_correct.svg"

                                    alt="Bonne réponse"

                                    class="chatty-success"

                                />

                                <div class="feedback-title">
                                    Bonne réponse
                                </div>

                                <div class="feedback-text">
                                    ${scenario.feedback}
                                </div>
                                <div class="takeaway-box">

                                    <div class="takeaway-title">
                                        A RETENIR POUR LA SUITE
                                    </div>

                                    <div class="takeaway-item">
                                        ✓ ${scenario.takeaways[0]}
                                    </div>

                                    <div class="takeaway-item">
                                        ✓ ${scenario.takeaways[1]}
                                    </div>

                                </div>

                                <button id="continue-button" class="feedback-button">
                                    Continuer
                                </button>

                            </div>

                        </div>
                    
                    `;

                    const continueButton = document.getElementById("continue-button");

                    continueButton.addEventListener("click", function () {

                        currentScenario++;

                        attempts = 0;

                        if (currentScenario < scenarios.length) {

                            displayScenario();

                        } else {

                            showEndScreen();

                        }

                    });

                } else {

                    attempts++;

                    if (attempts === 1) {

                        mainContent.innerHTML = `
                        
                            <div class="scenario-screen">

                                <div class="feedback-box feedback-error">

                                    <video
                                        class="chatty-video"
                                        autoplay
                                        muted
                                        loop
                                        playsinline
                                    >
                                        <source
                                            src="assets/videos/reflection.mp4"
                                            type="video/mp4"
                                        >
                                    </video>

                                    <div class="feedback-title">
                                        Attention
                                    </div>

                                    <div class="feedback-text">
                                       ${scenario.wrongFeedback}
                                    </div>

                                    <div class="takeaway-box">

                                        <div class="takeaway-title">
                                            CE QU'IL FAUT RETENIR
                                        </div>

                                        <div class="takeaway-item">
                                            ✗ ${scenario.wrongTakeaways[0]}
                                        </div>

                                        <div class="takeaway-item">
                                            ✗ ${scenario.wrongTakeaways[1]}
                                        </div>

                                    </div>

                                    <div class="feedback-text">
                                        Vous disposez encore d'une tentative.
                                    </div>

                                    <button id="retry-button" class="feedback-button">
                                        Réessayer
                                    </button>

                                </div>

                            </div>
                        
                        `;

                        const retryButton = document.getElementById("retry-button");

                        retryButton.addEventListener("click", function () {

                            displayScenario();

                        });

                    } else {

                        mainContent.innerHTML = `
                        
                            <div class="scenario-screen">

                                <div class="feedback-box feedback-error">

                                    <video
                                        class="chatty-video"
                                        autoplay
                                        muted
                                        loop
                                        playsinline
                                    >
                                        <source
                                            src="assets/videos/error.mp4"
                                            type="video/mp4"
                                        >
                                    </video>

                                    <div class="feedback-title">
                                        Mauvaise réponse
                                    </div>

                                    <div class="feedback-text">
                                        Vous avez utilisé vos deux tentatives.
                                    </div>

                                    <div class="feedback-text">
                                        La bonne réponse était :
                                        <br><br>
                                        <strong>${scenario.answers[scenario.correctAnswer]}</strong>
                                    </div>
                                    <div class="feedback-text">
                                        ${scenario.feedback}
                                    </div>
                                    <div class="takeaway-box">

                                    <div class="takeaway-title">
                                        A RETENIR POUR LA SUITE
                                    </div>

                                    <div class="takeaway-item">
                                        ✓ ${scenario.takeaways[0]}
                                    </div>

                                    <div class="takeaway-item">
                                        ✓ ${scenario.takeaways[1]}
                                    </div>

                                </div>

                                    <button id="continue-button" class="feedback-button">
                                        Continuer
                                    </button>

                                </div>

                            </div>
                        
                        `;

                        const continueButton = document.getElementById("continue-button");

                        continueButton.addEventListener("click", function () {

                            currentScenario++;

                            attempts = 0;

                            if (currentScenario < scenarios.length) {

                                displayScenario();

                            } else {

                                showEndScreen();

                            }

                        });

                    }

                }

            });

        });

    }

    function getResultMessage() {

        if (score >= 9) {

            return "Excellent ! Vous maîtrisez les bons réflexes liés à l'IA.";

        }

        if (score >= 7) {

            return "Très bon résultat. Quelques points peuvent encore être améliorés.";

        }

        if (score >= 4) {

            return "Résultat correct, mais certains réflexes doivent être renforcés.";

        }

        return "Une sensibilisation complémentaire est recommandée.";
    }

    function showEndScreen() {

        mainContent.innerHTML = `

            <div class="scenario-screen">

                <h1>Parcours terminé</h1>

                <p>
                    Votre score est de :
                </p>

                <h2>
                    ${score} / ${scenarios.length * 2}
                </h2>

                <p>
                    ${getResultMessage()}
                </p>

                <button id="recap-button" class="feedback-button" style="margin-top: 20px;">
                    Récapitulatif
                </button>

            </div>

        `;

        document.getElementById("recap-button").addEventListener("click", function () {

            recapResults = new Array(recapQuizData.length).fill(null);
            displayRecapQuiz(0);

        });

    }

    function displayRecapQuiz(currentIndex) {

        var question = recapQuizData[currentIndex];
        var isLast = currentIndex === recapQuizData.length - 1;
        var total = recapQuizData.length;

        var correctCount = recapResults.filter(function(r) { return r === true; }).length;
        var wrongCount = recapResults.filter(function(r) { return r === false; }).length;
        var remaining = total - correctCount - wrongCount;

        var progressStepsHTML = '';
        for (var i = 0; i < total; i++) {
            if (i > 0) progressStepsHTML += '<div class="progress-line"></div>';
            if (i < currentIndex) {
                progressStepsHTML += '<div class="progress-step active"></div>';
            } else if (i === currentIndex) {
                progressStepsHTML += '<div class="progress-step current">' + (i + 1) + '</div>';
            } else {
                progressStepsHTML += '<div class="progress-step">' + (i + 1) + '</div>';
            }
        }

        var miniBarsHTML = '';
        for (var j = 0; j < total; j++) {
            var barColor = j < currentIndex
                ? (recapResults[j] === true ? '#07B29A' : '#BC2252')
                : j === currentIndex ? '#D38200' : 'rgba(139,139,140,0.25)';
            miniBarsHTML += '<div class="recap-mini-bar" style="background:' + barColor + '"></div>';
        }

        var answersHTML = question.answers.map(function(answer, index) {
            return '<button class="answer-button recap-answer-button" data-index="' + index + '">' + answer + '</button>';
        }).join('');

        mainContent.innerHTML =
            '<div class="scenario-screen recap-screen">' +
                '<div class="recap-top-bar">' +
                    '<div class="scenario-progress recap-prog-bar">' + progressStepsHTML + '</div>' +
                    '<button class="recap-quiz-final-badge">Quiz final</button>' +
                '</div>' +
                '<div class="recap-status-row">' +
                    '<div class="recap-mini-bars">' + miniBarsHTML + '</div>' +
                    '<span class="recap-question-counter">Question ' + (currentIndex + 1) + '/' + total + '</span>' +
                '</div>' +
                '<div class="recap-question-row">' +
                    '<p class="recap-question">' + question.question + '</p>' +
                '</div>' +
                '<div class="recap-answer-layout">' +
                    '<div id="recap-answers" class="recap-answers">' + answersHTML + '</div>' +
                    '<img src="assets/images/Chip_question.svg" alt="" class="recap-chip" id="recap-chip">' +
                '</div>' +
                '<div id="recap-feedback" class="recap-feedback" style="display:none;"></div>' +
                '<button id="recap-next-button" class="feedback-button recap-next-button" style="display:none;">' +
                    (isLast ? 'Terminer' : 'Question suivante ->') +
                '</button>' +
            '</div>' +
            '<div class="recap-status-panel">' +
                '<div class="recap-status-item recap-status-correct">' +
                    '<span class="recap-status-count" id="recap-count-correct">' + correctCount + '</span>' +
                    '<span class="recap-status-label">Correctes</span>' +
                '</div>' +
                '<div class="recap-status-divider"></div>' +
                '<div class="recap-status-item recap-status-error">' +
                    '<span class="recap-status-count" id="recap-count-wrong">' + wrongCount + '</span>' +
                    '<span class="recap-status-label">Erreurs</span>' +
                '</div>' +
                '<div class="recap-status-divider"></div>' +
                '<div class="recap-status-item recap-status-remaining">' +
                    '<span class="recap-status-count" id="recap-count-remaining">' + remaining + '</span>' +
                    '<span class="recap-status-label">Restantes</span>' +
                '</div>' +
            '</div>';

        var answerButtons = document.querySelectorAll('.recap-answer-button');

        answerButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var selectedIndex = parseInt(button.dataset.index);
                var isCorrect = selectedIndex === question.correctAnswer;
                recapResults[currentIndex] = isCorrect;
                answerButtons.forEach(function(btn) { btn.disabled = true; });
                button.classList.add(isCorrect ? 'recap-correct' : 'recap-incorrect');
                if (!isCorrect) {
                    answerButtons[question.correctAnswer].classList.add('recap-correct');
                }
                var chip = document.getElementById('recap-chip');
                if (chip) chip.style.display = 'none';
                var allBars = document.querySelectorAll('.recap-mini-bar');
                if (allBars[currentIndex]) {
                    allBars[currentIndex].style.background = isCorrect ? '#07B29A' : '#BC2252';
                }
                var cNow = recapResults.filter(function(r) { return r === true; }).length;
                var wNow = recapResults.filter(function(r) { return r === false; }).length;
                var rNow = total - cNow - wNow;
                var elC = document.getElementById('recap-count-correct');
                var elW = document.getElementById('recap-count-wrong');
                var elR = document.getElementById('recap-count-remaining');
                if (elC) elC.textContent = cNow;
                if (elW) elW.textContent = wNow;
                if (elR) elR.textContent = rNow;
                var feedback = document.getElementById('recap-feedback');
                feedback.innerHTML =
                    '<p class="recap-feedback-label ' + (isCorrect ? 'recap-feedback-correct-label' : 'recap-feedback-incorrect-label') + '">' +
                    (isCorrect ? '✓ Bonne réponse' : '✗ Mauvaise réponse') +
                    '</p><p>' + question.explanation + '</p>';
                feedback.style.display = 'block';
                document.getElementById('recap-next-button').style.display = 'block';
            });
        });

        document.getElementById('recap-next-button').addEventListener('click', function() {
            if (!isLast) {
                displayRecapQuiz(currentIndex + 1);
            } else {
                mainContent.innerHTML =
                    '<div class="scenario-screen">' +
                        '<h1>Quiz terminé !</h1>' +
                        '<p>Vous avez complété le récapitulatif des bonnes pratiques IA.</p>' +
                        '<br><p>Voici les principaux points à retenir :</p>' +
                        '<ul class="recap-summary-list">' +
                            '<li>Protéger les données personnelles avant toute utilisation dans une IA.</li>' +
                            '<li>V\u00e9rifier l\'identit\u00e9 des demandeurs d\'informations sensibles.</li>' +
                            '<li>Ne jamais partager de données confidentielles dans une IA publique.</li>' +
                            '<li>Toujours vérifier les réponses générées par IA.</li>' +
                            '<li>Garder un esprit critique face aux contenus IA (CV, vidéos, messages…).</li>' +
                        '</ul>' +
                        '<br><p><strong>N\'oubliez pas : l\'IA est un assistant, pas un rempla\u00e7ant.</strong></p>' +
                    '</div>';
            }
        });

    }

}
