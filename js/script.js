const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startExperience);

function startExperience() {

    const app = document.getElementById("app");

    const scenario = scenarios[0];

    let attempts = 0;

    app.innerHTML = `
    
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

                alert("Bonne réponse");

            } else {

                attempts++;

                if (attempts === 1) {

                    alert("Mauvaise réponse. Vous avez encore une tentative.");

                } else {

                    alert("Mauvaise réponse. Plus de tentative disponible.");

                }

            }

        });

    });

}