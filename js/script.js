const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startExperience);

function startExperience() {

    const app = document.getElementById("app");

    let currentScenario = 0;

    let attempts = 0;

    let score = 0;

    displayScenario();

    function displayScenario() {

        const scenario = scenarios[currentScenario];

        app.innerHTML = `
        
            <div class="score-box">
                Score : ${score} / ${scenarios.length * 2}
            </div>

            <div class="scenario-screen">

                <h1>Scénario ${scenario.id}</h1>

                <h2>${scenario.title}</h2>

                <p>
                    ${scenario.role}
                </p>

                <p>
                    ${scenario.description}
                </p>

                <p>
                    ${scenario.question}
                </p>

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

                    app.innerHTML = `
                    
                        <div class="scenario-screen">

                            <div class="feedback-box feedback-success">

                                <video
                                    class="chatty-video"
                                    autoplay
                                    muted
                                    loop
                                    playsinline
                                >
                                    <source
                                        src="assets/videos/applause.mp4"
                                        type="video/mp4"
                                    >
                                </video>

                                <div class="feedback-title">
                                    Bonne réponse
                                </div>

                                <div class="feedback-text">
                                    Les données sensibles doivent être protégées et vérifiées avant toute utilisation dans une IA.
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

                            app.innerHTML = `
                            
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

                                </div>
                            
                            `;

                        }

                    });

                } else {

                    attempts++;

                    if (attempts === 1) {

                        app.innerHTML = `
                        
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
                                        Cette réponse présente un risque pour la sécurité des données.
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

                        app.innerHTML = `
                        
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

                                app.innerHTML = `
                                
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

                                    </div>
                                
                                `;

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

}