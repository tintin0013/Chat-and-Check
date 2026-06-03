const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startExperience);

function startExperience() {

    const mainContent = document.getElementById("main-content");

    let currentScenario = 0;

    let attempts = 0;

    let score = 0;

    let scenarioStatus = Array(scenarios.length).fill("pending");

    displayScenario();

    function displayScenario() {

        const scenario = scenarios[currentScenario];

        mainContent.innerHTML = `
        
            <div class="score-box">
                Score : ${score} / ${scenarios.length * 2}
            </div>

            <div class="scenario-screen">

                <div class="scenario-progress">

                    <div class="progress-step start-step active">

                        ✓

                    </div>

                    <div class="progress-line completed"></div>

                    ${Array.from({ length: scenarios.length + 1 }, function (_, index) {

                        return `
                            ${index > 0
                                ? `<div class="progress-line ${index <= currentScenario ? 'completed' : ''}"></div>`
                                : ''
                            }

                            <div class="progress-step
                                ${scenarioStatus[index] === 'success' ? 'validated' : ''}
                                ${scenarioStatus[index] === 'failed' ? 'failed' : ''}
                                ${index === currentScenario ? 'current' : ''}">

                                ${
                                    scenarioStatus[index] === 'success'
                                        ? '✓'
                                        : scenarioStatus[index] === 'failed'
                                            ? '✗'
                                            : index === scenarios.length
                                                ? 'Q'
                                                : index + 1
                                }

                            </div>
                        `;

                    }).join('')}

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

                        <div class="selected-answer-box">

                            <div class="selected-answer-label">
                                Vous avez choisi :
                            </div>

                            <div class="selected-answer-text">
                                ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}
                            </div>

                        </div>

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

                        scenarioStatus[currentScenario] = "success";

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

                    scenarioStatus[currentScenario] = "failed";

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

                            scenarioStatus[currentScenario] = "failed";

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

            displayRecapQuiz(0);

        });

    }

    function displayRecapQuiz(currentIndex) {

        const question = recapQuizData[currentIndex];

        const isLast = currentIndex === recapQuizData.length - 1;

        mainContent.innerHTML = `

            <div class="scenario-screen">

                <h1>Quiz récapitulatif</h1>

                <p class="recap-subtitle">Bonnes pratiques IA &amp; données sensibles</p>

                <div class="recap-progress">${currentIndex + 1} / ${recapQuizData.length}</div>

                <p class="recap-question">${question.question}</p>

                <div id="recap-answers">
                    ${question.answers.map(function (answer, index) {
                        return `<button class="answer-button recap-answer-button" data-index="${index}">${answer}</button>`;
                    }).join('')}
                </div>

                <div id="recap-feedback" class="recap-feedback" style="display:none;"></div>

                <button id="recap-next-button" class="feedback-button recap-next-button" style="display:none;">
                    ${isLast ? 'Terminer' : 'Question suivante'}
                </button>

            </div>

        `;

        const answerButtons = document.querySelectorAll(".recap-answer-button");

        answerButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedIndex = parseInt(button.dataset.index);

                const isCorrect = selectedIndex === question.correctAnswer;

                answerButtons.forEach(function (btn) {

                    btn.disabled = true;

                });

                button.classList.add(isCorrect ? "recap-correct" : "recap-incorrect");

                if (!isCorrect) {

                    answerButtons[question.correctAnswer].classList.add("recap-correct");

                }

                const feedback = document.getElementById("recap-feedback");

                feedback.innerHTML = `
                    <p class="recap-feedback-label ${isCorrect ? 'recap-feedback-correct-label' : 'recap-feedback-incorrect-label'}">
                        ${isCorrect ? '✓ Bonne réponse' : '✗ Mauvaise réponse'}
                    </p>
                    <p>${question.explanation}</p>
                `;

                feedback.style.display = "block";

                document.getElementById("recap-next-button").style.display = "block";

            });

        });

        document.getElementById("recap-next-button").addEventListener("click", function () {

            if (!isLast) {

                displayRecapQuiz(currentIndex + 1);

            } else {

                mainContent.innerHTML = `

                    <div class="scenario-screen">

                        <h1>Quiz terminé !</h1>

                        <p>Vous avez complété le récapitulatif des bonnes pratiques IA.</p>

                        <br>
                        <p>Voici les principaux points à retenir :</p>
                        <ul class="recap-summary-list">
                            <li>Protéger les données personnelles avant toute utilisation dans une IA.</li>
                            <li>Vérifier l’identité des demandeurs d’informations sensibles.</li>
                            <li>Ne jamais partager de données confidentielles dans une IA publique.</li>
                            <li>Toujours vérifier les réponses générées par IA.</li>
                            <li>Garder un esprit critique face aux contenus IA (CV, vidéos, messages…).</li>
                        </ul>

                        <br>

                        <p><strong>N'oubliez pas : l'IA est un assistant, pas un remplaçant.</strong></p>

                    </div>

                `;

            }

        });

    }

}