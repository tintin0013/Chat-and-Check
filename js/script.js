// ========================================
// BOUTON DE DÉMARRAGE
// ========================================

// Récupération du bouton "Je commence"
const startButton = document.getElementById("start-button");

// Lorsque l'utilisateur clique sur le bouton,
// on démarre l'expérience
startButton.addEventListener("click", startExperience);

// ========================================
// FONCTION PRINCIPALE DU PARCOURS
// ========================================
function startExperience() {
  // Zone principale dans laquelle tous les écrans
  // du parcours seront affichés
  const mainContent = document.getElementById("main-content");

  // Index du scénario actuellement affiché
  let currentScenario = 0;

  // Nombre de tentatives effectuées sur le scénario courant
  let attempts = 0;

  // Score global du joueur
  let score = 0;

  // Tableau permettant de suivre l'état de chaque scénario
  // pending = non joué
  // success = réussi
  // failed = raté
  let scenarioStatus = Array(scenarios.length).fill("pending");

  // Affichage immédiat du premier scénario
  displayScenario();

  // ========================================
  // AFFICHAGE D'UN SCÉNARIO
  // ========================================
  function displayScenario() {
    // Récupération du scénario en cours
    const scenario = scenarios[currentScenario];

    // Construction complète de l'écran du scénario
    mainContent.innerHTML = `
        
            <div class="score-box">
                Score : ${score} / ${scenarios.length * 2}
            </div>

            <div class="scenario-screen">

                <!-- Barre de progression -->
                <div class="scenario-progress">

                    <!-- Point de départ -->
                    <div class="progress-step start-step active">

                        ✓

                    </div>

                    <div class="progress-line completed"></div>

                    ${Array.from(
                      { length: scenarios.length + 1 },
                      function (_, index) {
                        return `
                            ${
                              index > 0
                                ? `<div class="progress-line ${index <= currentScenario ? "completed" : ""}"></div>`
                                : ""
                            }

                            <!-- Cercle représentant un scénario -->
                            <div class="progress-step
                                ${scenarioStatus[index] === "success" ? "validated" : ""}
                                ${scenarioStatus[index] === "failed" ? "failed" : ""}
                                ${index === currentScenario ? "current" : ""}">

                                ${
                                  scenarioStatus[index] === "success"
                                    ? "✓"
                                    : scenarioStatus[index] === "failed"
                                      ? "✗"
                                      : index === scenarios.length
                                        ? "Q"
                                        : index + 1
                                }

                            </div>
                        `;
                      },
                    ).join("")}

                </div>

                <!-- Badge indiquant le scénario actuel -->
                <div class="scenario-badge">

                    ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}

                </div>

                <!-- Contexte métier du scénario -->
                <div class="scenario-context">

                    <strong>Contexte :</strong>

                    ${scenario.role}

                    ${scenario.description}

                </div>

                <!-- Question posée à l'utilisateur -->
                <div class="scenario-question">

                    ${scenario.question}

                </div>

                <!-- Réponse A -->
                <button class="answer-button" data-answer="0">
                    ${scenario.answers[0]}
                </button>

                <!-- Réponse B -->
                <button class="answer-button" data-answer="1">
                    ${scenario.answers[1]}
                </button>

                <!-- Réponse C -->
                <button class="answer-button" data-answer="2">
                    ${scenario.answers[2]}
                </button>

            </div>
        
        `;

    // Récupération de tous les boutons de réponse
    const answerButtons = document.querySelectorAll(".answer-button");

    // Ajout d'un événement click sur chaque réponse
    answerButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Réponse choisie par l'utilisateur
        const selectedAnswer = parseInt(button.dataset.answer);

        // ========================================
        // CAS N°1 : BONNE RÉPONSE
        // ========================================
        if (selectedAnswer === scenario.correctAnswer) {
          // Bonne réponse trouvée du premier coup
          if (attempts === 0) {
            score = score + 2;
          } else {
            // Bonne réponse trouvée après une erreur
            score = score + 1;
          }
          // ========================================
          // AFFICHAGE DE L'ÉCRAN DE BONNE RÉPONSE
          // ========================================
          mainContent.innerHTML = `
                    
    <div class="scenario-screen">

        <!-- Barre de progression -->
        <div class="scenario-progress">

            <div class="progress-step start-step active">
                ✓
            </div>

            <div class="progress-line completed"></div>

            ${Array.from({ length: scenarios.length + 1 }, function (_, index) {
              return `
                    ${
                      index > 0
                        ? `<div class="progress-line ${index <= currentScenario ? "completed" : ""}"></div>`
                        : ""
                    }

                    <div class="progress-step
                        ${scenarioStatus[index] === "success" ? "validated" : ""}
                        ${scenarioStatus[index] === "failed" ? "failed" : ""}
                        ${index === currentScenario ? "current" : ""}">

                        ${
                          scenarioStatus[index] === "success"
                            ? "✓"
                            : scenarioStatus[index] === "failed"
                              ? "✗"
                              : index === scenarios.length
                                ? "Q"
                                : index + 1
                        }

                    </div>
                `;
            }).join("")}

        </div>

        <!-- Badge scénario -->
        <div class="scenario-badge">

            ● Scénario 0${scenario.id}/0${scenarios.length} - ${scenario.title}

        </div>

        <!-- Affichage de la réponse choisie -->
        <div class="selected-answer-box">

            <div class="selected-answer-label">
                Vous avez choisi :
            </div>

            <div class="selected-answer-text">
                ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}
            </div>
        </div>

        <!-- Bloc de validation -->
        <div class="feedback-box feedback-success">

            <!-- Titre -->
            <div class="feedback-title">
                Bonne réponse
            </div>

            <!-- Explication -->
            <div class="feedback-text">
                ${scenario.feedback}
            </div>
        </div>

         <!-- Mascotte de réussite -->
            <img
                src="assets/images/Chip_correct.svg"
                alt="Bonne réponse"
                class="chatty-success"
            />

        <!-- Points clés à retenir -->
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

            <!-- Bouton de passage au scénario suivant -->
            <button id="continue-button" class="feedback-button">
                Scénario suivant →
            </button>

    </div>
                    
`;

          // Récupération du bouton Continuer
          const continueButton = document.getElementById("continue-button");

          // Lorsque l'utilisateur clique sur Continuer
          continueButton.addEventListener("click", function () {
            // Le scénario est validé
            scenarioStatus[currentScenario] = "success";

            // Passage au scénario suivant
            currentScenario++;

            // Réinitialisation du nombre de tentatives
            attempts = 0;

            // S'il reste des scénarios à jouer
            if (currentScenario < scenarios.length) {
              displayScenario();
            } else {
              // Sinon affichage de l'écran de fin
              showEndScreen();
            }
          });
        } else {
          // ========================================
          // CAS N°2 : MAUVAISE RÉPONSE
          // ========================================

          // Ajout d'une tentative
          attempts++;

          // Le scénario est temporairement marqué en échec
          scenarioStatus[currentScenario] = "failed";

          // ========================================
          // PREMIÈRE ERREUR
          // ========================================
          if (attempts === 1) {
            // ========================================
            // AFFICHAGE DE L'ÉCRAN DE PREMIÈRE ERREUR
            // ========================================
            mainContent.innerHTML = `
                        
                            <div class="scenario-screen">

                                <div class="feedback-box feedback-error">

                                    <!-- Animation de réflexion -->
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

                                    <!-- Titre -->
                                    <div class="feedback-title">
                                        Attention
                                    </div>

                                    <!-- Explication de l'erreur -->
                                    <div class="feedback-text">
                                       ${scenario.wrongFeedback}
                                    </div>

                                    <!-- Points importants à retenir -->
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

                                    <!-- Message indiquant qu'il reste une tentative -->
                                    <div class="feedback-text">
                                        Vous disposez encore d'une tentative.
                                    </div>

                                    <!-- Bouton permettant de rejouer le scénario -->
                                    <button id="retry-button" class="feedback-button">
                                        Réessayer
                                    </button>

                                </div>

                            </div>
                        
                        `;

            // Récupération du bouton Réessayer
            const retryButton = document.getElementById("retry-button");

            // Lorsque l'utilisateur clique sur Réessayer
            retryButton.addEventListener("click", function () {
              // Réaffichage du scénario courant
              displayScenario();
            });
          } else {
            // ========================================
            // AFFICHAGE DE L'ÉCRAN DE DEUXIÈME ERREUR
            // L'utilisateur a utilisé ses deux tentatives
            // ========================================
            mainContent.innerHTML = `
                        
                            <div class="scenario-screen">

                                <div class="feedback-box feedback-error">

                                    <!-- Animation d'échec -->
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

                                    <!-- Titre -->
                                    <div class="feedback-title">
                                        Mauvaise réponse
                                    </div>

                                    <!-- Message indiquant que toutes les tentatives ont été utilisées -->
                                    <div class="feedback-text">
                                        Vous avez utilisé vos deux tentatives.
                                    </div>

                                    <!-- Affichage de la bonne réponse -->
                                    <div class="feedback-text">
                                        La bonne réponse était :
                                        <br><br>
                                        <strong>${scenario.answers[scenario.correctAnswer]}</strong>
                                    </div>

                                    <!-- Explication pédagogique -->
                                    <div class="feedback-text">
                                        ${scenario.feedback}
                                    </div>

                                    <!-- Points clés à retenir -->
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

                                    <!-- Bouton permettant de passer au scénario suivant -->
                                    <button id="continue-button" class="feedback-button">
                                        Continuer
                                    </button>

                                </div>

                            </div>
                        
                        `;

            // Récupération du bouton Continuer
            const continueButton = document.getElementById("continue-button");

            // Lorsque l'utilisateur clique sur Continuer
            continueButton.addEventListener("click", function () {
              // Le scénario est définitivement marqué comme échoué
              scenarioStatus[currentScenario] = "failed";

              // Passage au scénario suivant
              currentScenario++;

              // Réinitialisation du compteur de tentatives
              attempts = 0;

              // S'il reste des scénarios
              if (currentScenario < scenarios.length) {
                displayScenario();
              } else {
                // Sinon affichage de l'écran de fin
                showEndScreen();
              }
            });
          }
        }
      });
    });
  }

  // ========================================
  // CALCUL DU MESSAGE DE FIN
  // EN FONCTION DU SCORE
  // ========================================
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

  // ========================================
  // ÉCRAN DE FIN DU PARCOURS
  // ========================================
  function showEndScreen() {
    // Construction de l'écran affiché lorsque
    // tous les scénarios ont été terminés
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

                <!-- Bouton permettant d'accéder au quiz final -->
                <button id="recap-button" class="feedback-button" style="margin-top: 20px;">
                    Récapitulatif
                </button>

            </div>

        `;

    // Lorsque l'utilisateur clique sur Récapitulatif
    document
      .getElementById("recap-button")
      .addEventListener("click", function () {
        // On démarre le quiz récapitulatif à la question 1
        displayRecapQuiz(0);
      });
  }

  // ========================================
  // QUIZ RÉCAPITULATIF
  // ========================================
  function displayRecapQuiz(currentIndex) {
    // Question actuellement affichée
    const question = recapQuizData[currentIndex];

    // Vérifie si l'on se trouve sur la dernière question
    const isLast = currentIndex === recapQuizData.length - 1;

    // Construction de l'écran du quiz
    mainContent.innerHTML = `

            <div class="scenario-screen">

                <h1>Quiz récapitulatif</h1>

                <p class="recap-subtitle">Bonnes pratiques IA &amp; données sensibles</p>

                <!-- Progression du quiz -->
                <div class="recap-progress">${currentIndex + 1} / ${recapQuizData.length}</div>

                <!-- Question -->
                <p class="recap-question">${question.question}</p>

                <!-- Réponses -->
                <div id="recap-answers">
                    ${question.answers
                      .map(function (answer, index) {
                        return `<button class="answer-button recap-answer-button" data-index="${index}">${answer}</button>`;
                      })
                      .join("")}
                </div>

                <!-- Zone de feedback cachée au départ -->
                <div id="recap-feedback" class="recap-feedback" style="display:none;"></div>

                <!-- Bouton suivant caché au départ -->
                <button id="recap-next-button" class="feedback-button recap-next-button" style="display:none;">
                    ${isLast ? "Terminer" : "Question suivante"}
                </button>

            </div>

        `;

    // Récupération de tous les boutons de réponse
    const answerButtons = document.querySelectorAll(".recap-answer-button");

    // Ajout d'un événement sur chaque réponse
    answerButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Réponse sélectionnée par l'utilisateur
        const selectedIndex = parseInt(button.dataset.index);

        // Vérification de la réponse
        const isCorrect = selectedIndex === question.correctAnswer;

        // Désactivation de tous les boutons après sélection
        answerButtons.forEach(function (btn) {
          btn.disabled = true;
        });

        // Mise en couleur de la réponse choisie
        button.classList.add(isCorrect ? "recap-correct" : "recap-incorrect");

        // Si la réponse est fausse,
        // on affiche également la bonne réponse
        if (!isCorrect) {
          answerButtons[question.correctAnswer].classList.add("recap-correct");
        }

        // Zone d'explication
        const feedback = document.getElementById("recap-feedback");

        // Construction du message explicatif
        feedback.innerHTML = `
                    <p class="recap-feedback-label ${isCorrect ? "recap-feedback-correct-label" : "recap-feedback-incorrect-label"}">
                        ${isCorrect ? "✓ Bonne réponse" : "✗ Mauvaise réponse"}
                    </p>
                    <p>${question.explanation}</p>
                `;

        // Affichage du bloc d'explication
        feedback.style.display = "block";

        // Affichage du bouton permettant de passer
        // à la question suivante
        document.getElementById("recap-next-button").style.display = "block";
      });
    });

    // Gestion du bouton suivant
    document
      .getElementById("recap-next-button")
      .addEventListener("click", function () {
        // S'il reste des questions,
        // on affiche la suivante
        if (!isLast) {
          displayRecapQuiz(currentIndex + 1);
        } else {
          // ========================================
          // ÉCRAN FINAL DU QUIZ
          // ========================================
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

                        <p>
                            <strong>
                                N'oubliez pas : l'IA est un assistant, pas un remplaçant.
                            </strong>
                        </p>

                    </div>

                `;
        }
      });
  }
}
