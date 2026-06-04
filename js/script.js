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

    let recapResults = [];

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
                                ${scenarioStatus[index] === "warning" ? "warning" : ""}
                                ${scenarioStatus[index] === "failed" ? "failed" : ""}
                                ${index === currentScenario ? "current" : ""}">

                                ${
                                  scenarioStatus[index] === "success"
                                    ? "✓"
                                    : scenarioStatus[index] === "warning"
                                        ? "!"
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
                        ${scenarioStatus[index] === "warning" ? "warning" : ""}
                        ${scenarioStatus[index] === "failed" ? "failed" : ""}
                        ${index === currentScenario ? "current" : ""}">

                        ${
                          scenarioStatus[index] === "success"
                            ? "✓"
                            : scenarioStatus[index] === "warning"
                                ? "!"
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
            if (attempts === 0) {
                scenarioStatus[currentScenario] = "success";
            } else {
                scenarioStatus[currentScenario] = "warning";
            }

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
          scenarioStatus[currentScenario] = "warning";

          // ========================================
          // PREMIÈRE ERREUR
          // ========================================
          if (attempts === 1) {
            // ========================================
            // AFFICHAGE DE L'ÉCRAN DE PREMIÈRE ERREUR
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
                        ${scenarioStatus[index] === "warning" ? "warning" : ""}
                        ${scenarioStatus[index] === "failed" ? "failed" : ""}

                        ${index === currentScenario ? "current" : ""}">

                        ${

                          scenarioStatus[index] === "success"
                            ? "✓"
                           : scenarioStatus[index] === "warning"
                            ? "!"
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

        <!-- Réponse choisie -->

        <div class="selected-answer-box">

            <div class="selected-answer-label">

                Vous avez choisi :

            </div>

            <div class="selected-answer-text selected-answer-text-error">

                ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}

            </div>

        </div>

        <!-- Bloc erreur -->

        <div class="feedback-box feedback-error">

            <div class="feedback-title">

                Attention

            </div>

            <div class="feedback-text">

                ${scenario.wrongFeedback}

            </div>

        </div>

        <!-- Mascotte erreur -->

        <img

            src="assets/images/Chip_question.svg"

            alt="Question"

            class="chatty-first-error"

        />

        <!-- Points à retenir -->

        <div class="takeaway-box takeaway-box-error">

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


        <button id="retry-button" class="feedback-button">

            Réessayer - 1 tentative restante ↻

        </button>

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
                    ${scenarioStatus[index] === "warning" ? "warning" : ""}
                    ${scenarioStatus[index] === "failed" ? "failed" : ""}

                    ${index === currentScenario ? "current" : ""}">

                    ${

                      scenarioStatus[index] === "success"
                        ? "✓"
                        : scenarioStatus[index] === "warning"
                          ? "!"
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

    <!-- Réponse choisie -->

    <div class="selected-answer-box">

        <div class="selected-answer-label">

            Vous avez choisi :

        </div>

        <div class="selected-answer-text selected-answer-text-error">

            ${String.fromCharCode(65 + selectedAnswer)} - ${scenario.answers[selectedAnswer]}

        </div>

    </div>

    <!-- Bloc erreur -->

    <div class="feedback-box feedback-error">

        <div class="feedback-title">

            Mauvaise réponse

        </div>

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

    <!-- Mascotte erreur -->

    <img

        src="assets/images/Chip_incorrect.svg"

        alt="Erreur"

        class="chatty-success"

    />

    <!-- Points à retenir -->

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

    recapResults = new Array(recapQuizData.length).fill(null);

    // On démarre le quiz récapitulatif à la question 1
    displayRecapQuiz(0);
});
  }

    function getEssentialRules() {
        return [
            "Protéger les données personnelles avant toute utilisation dans une IA.",
            "Vérifier l'identité des demandeurs d'informations sensibles.",
            "Ne jamais partager de données confidentielles dans une IA publique.",
            "Toujours vérifier les réponses générées par IA.",
            "Garder un esprit critique face aux contenus IA (CV, vidéos, messages…)."
        ];
    }

    function downloadEssentialRulesPdf(finalScore, finalTotal, finalResultContent) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            window.alert("Le téléchargement PDF n'est pas disponible pour le moment.");
            return;
        }

        var jsPDF = window.jspdf.jsPDF;
        var pdf = new jsPDF({ unit: "mm", format: "a4" });
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var margin = 18;
        var cursorY = 22;
        var contentWidth = pageWidth - margin * 2;
        var essentialRules = getEssentialRules();

        function addWrappedText(text, fontSize, color, spacingAfter, isBold) {
            pdf.setFont("helvetica", isBold ? "bold" : "normal");
            pdf.setFontSize(fontSize);
            pdf.setTextColor(color[0], color[1], color[2]);
            var lines = pdf.splitTextToSize(text, contentWidth);
            if (cursorY + lines.length * (fontSize * 0.42) > pageHeight - margin) {
                pdf.addPage();
                cursorY = margin;
            }
            pdf.text(lines, margin, cursorY);
            cursorY += lines.length * (fontSize * 0.42) + spacingAfter;
        }

        addWrappedText("Chat & Check", 20, [47, 44, 220], 8, true);
        addWrappedText("Resultat du quiz final", 12, [139, 139, 140], 6, true);
        addWrappedText("Score : " + finalScore + "/" + finalTotal, 16, [124, 58, 237], 4, true);
        addWrappedText(finalResultContent.label, 12, [7, 178, 154], 4, true);
        addWrappedText(finalResultContent.title, 14, [26, 22, 48], 3, true);
        addWrappedText(finalResultContent.description, 11, [114, 114, 122], 8, false);
        addWrappedText("Les 5 regles essentielles", 14, [139, 139, 140], 6, true);

        essentialRules.forEach(function(rule, index) {
            addWrappedText((index + 1) + ". " + rule, 11, [26, 22, 48], 4, false);
        });

        pdf.save("chat-and-check-5-regles.pdf");
    }

    function getRecapResultContent(finalScore, finalTotal) {
        if (finalTotal === 5) {
            if (finalScore === 5) {
                return {
                    label: "NIVEAU EXCELLENT",
                    title: "Excellente maîtrise des bons réflexes",
                    description: "Vous appliquez les bonnes pratiques de confidentialité et d'utilisation de l'IA avec rigueur."
                };
            }

            if (finalScore === 4) {
                return {
                    label: "NIVEAU BON A RENFORCER",
                    title: "Vous êtes sur la bonne voie",
                    description: "Quelques points à retravailler sur la confidentialité des données."
                };
            }

            if (finalScore === 3) {
                return {
                    label: "NIVEAU MOYEN A RENFORCER",
                    title: "Les bases sont là, mais restent à consolider",
                    description: "Plusieurs réflexes doivent encore être renforcés pour sécuriser l'usage des données avec l'IA."
                };
            }

            if (finalScore === 2) {
                return {
                    label: "NIVEAU FRAGILE",
                    title: "Une vigilance plus régulière est nécessaire",
                    description: "Des notions importantes sur la confidentialité et les usages sûrs de l'IA restent à revoir."
                };
            }

            if (finalScore === 1) {
                return {
                    label: "NIVEAU INSUFFISANT",
                    title: "Des repères essentiels sont encore à acquérir",
                    description: "Un renforcement rapide est recommandé pour éviter les erreurs sur les données sensibles."
                };
            }

            return {
                label: "NIVEAU CRITIQUE",
                title: "Une remise à niveau est indispensable",
                description: "Les fondamentaux de confidentialité et de prudence avec l'IA doivent être repris en priorité."
            };
        }

        var scoreRatio = finalTotal > 0 ? finalScore / finalTotal : 0;

        if (scoreRatio === 1) {
            return {
                label: "NIVEAU EXCELLENT",
                title: "Excellente maîtrise des bons réflexes",
                description: "Vous appliquez les bonnes pratiques de confidentialité et d'utilisation de l'IA avec rigueur."
            };
        }

        if (scoreRatio >= 0.8) {
            return {
                label: "NIVEAU BON A RENFORCER",
                title: "Vous êtes sur la bonne voie",
                description: "Quelques points à retravailler sur la confidentialité des données."
            };
        }

        if (scoreRatio >= 0.6) {
            return {
                label: "NIVEAU MOYEN A RENFORCER",
                title: "Les bases sont là, mais restent à consolider",
                description: "Plusieurs réflexes doivent encore être renforcés pour sécuriser l'usage des données avec l'IA."
            };
        }

        if (scoreRatio >= 0.4) {
            return {
                label: "NIVEAU FRAGILE",
                title: "Une vigilance plus régulière est nécessaire",
                description: "Des notions importantes sur la confidentialité et les usages sûrs de l'IA restent à revoir."
            };
        }

        if (scoreRatio > 0) {
            return {
                label: "NIVEAU INSUFFISANT",
                title: "Des repères essentiels sont encore à acquérir",
                description: "Un renforcement rapide est recommandé pour éviter les erreurs sur les données sensibles."
            };
        }

        return {
            label: "NIVEAU CRITIQUE",
            title: "Une remise à niveau est indispensable",
            description: "Les fondamentaux de confidentialité et de prudence avec l'IA doivent être repris en priorité."
        };
    }


    //         recapResults = new Array(recapQuizData.length).fill(null);
    //         displayRecapQuiz(0);


    // // Vérifie si l'on se trouve sur la dernière question
    // const isLast = currentIndex === recapQuizData.length - 1;


    // }

    function displayRecapQuiz(currentIndex) {

        var question = recapQuizData[currentIndex];
        var isLast = currentIndex === recapQuizData.length - 1;
        var total = recapQuizData.length;

        var correctCount = recapResults.filter(function(r) { return r === true; }).length;
        var wrongCount = recapResults.filter(function(r) { return r === false; }).length;
        var remaining = total - correctCount - wrongCount;

        // var progressStepsHTML = '';
        // for (var i = 0; i < total; i++) {
        //     if (i > 0) progressStepsHTML += '<div class="recap-progress-line"></div>';
        //     if (recapResults[i] === true) {
        //         progressStepsHTML += '<div class="recap-progress-step recap-progress-step-correct">✓</div>';
        //     } else if (recapResults[i] === false) {
        //         progressStepsHTML += '<div class="recap-progress-step recap-progress-step-wrong">✕</div>';
        //     } else if (i === currentIndex) {
        //         progressStepsHTML += '<div class="recap-progress-step recap-progress-step-current">' + (i + 1) + '</div>';
        //     } else {
        //         progressStepsHTML += '<div class="recap-progress-step">' + (i + 1) + '</div>';
        //     }
        // }


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
                    '<div class="scenario-progress">' +
                        '<div class="progress-step start-step active">✓</div>' +
                        '<div class="progress-line completed"></div>' +
                        Array.from({ length: scenarios.length + 1 }, function (_, index) {
                            return (
                                (index > 0
                                    ? '<div class="progress-line ' + (index <= currentScenario ? 'completed' : '') + '"></div>'
                                    : '') +
                                '<div class="progress-step ' +
                                    (scenarioStatus[index] === 'success' ? 'validated ' : '') +
                                    (scenarioStatus[index] === 'warning' ? 'warning ' : '') +
                                    (scenarioStatus[index] === 'failed' ? 'failed ' : '') +
                                    (index === scenarios.length ? 'active ' : '') +
                                    '">' +
                                    (scenarioStatus[index] === 'success'
                                        ? '✓'
                                        : scenarioStatus[index] === 'warning'
                                            ? '!'
                                            : scenarioStatus[index] === 'failed'
                                                ? '✗'
                                                : index === scenarios.length
                                                    ? '<span style="color:white;">Q</span>'
                                                    : index + 1) +
                                '</div>'
                            );
                        }).join('') +
                    '</div>' +
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
                var allProgressSteps = document.querySelectorAll('.recap-progress-step');
                if (allProgressSteps[currentIndex]) {
                    allProgressSteps[currentIndex].classList.remove('recap-progress-step-current');
                    allProgressSteps[currentIndex].classList.add(isCorrect ? 'recap-progress-step-correct' : 'recap-progress-step-wrong');
                    allProgressSteps[currentIndex].textContent = isCorrect ? '✓' : '✕';
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
                var finalScore = recapResults.filter(function(r) { return r === true; }).length;
                var finalTotal = recapQuizData.length;
                var finalResultContent = getRecapResultContent(finalScore, finalTotal);
                var restartIconPath = 'assets/images/arrow.png';
                var downloadIconPath = 'assets/images/upload.png';
                var essentialRulesHTML = getEssentialRules().map(function(rule, index) {
                    return '<li class="quiz-finished-rule-item">' +
                        '<span class="quiz-finished-rule-number">' + (index + 1) + '</span>' +
                        '<span class="quiz-finished-rule-text">' + rule + '</span>' +
                    '</li>';
                }).join('');

                mainContent.innerHTML =
                    '<div class="scenario-screen quiz-finished-screen">' +
                        '<div class="quiz-finished-header">' +
                            '<div class="quiz-finished-summary">' +
                                '<div class="quiz-finished-score-ring" aria-label="Score final">' +
                                    '<span class="quiz-finished-score-value">' + finalScore + '</span>' +
                                    '<span class="quiz-finished-score-total">/' + finalTotal + '</span>' +
                                '</div>' +
                                '<div class="quiz-finished-copy">' +
                                    '<p class="quiz-finished-kicker">' + finalResultContent.label + '</p>' +
                                    '<p class="quiz-finished-title">' + finalResultContent.title + '</p>' +
                                    '<p class="quiz-finished-description">' + finalResultContent.description + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<button id="close-kit-button" class="quiz-finished-close-button">Fermer le kit</button>' +
                        '</div>' +
                        '<div class="quiz-finished-takeaways">' +
                            '<h2 class="quiz-finished-rules-title">LES 5 REGLES ESSENTIELLES</h2>' +
                            '<ol class="quiz-finished-rules-list">' + essentialRulesHTML + '</ol>' +
                            
                        '</div>' +
                        '<div class="quiz-finished-actions">' +
                                '<button id="restart-path-button" class="quiz-finished-action-button quiz-finished-action-button-primary">' +
                                    '<span>Recommencer le parcours</span>' +
                                    '<img src="' + restartIconPath + '" alt="" class="quiz-finished-action-icon">' +
                                '</button>' +
                                '<button id="download-rules-button" class="quiz-finished-action-button quiz-finished-action-button-secondary">' +
                                    '<span>Télécharger les 5 règles</span>' +
                                    '<img src="' + downloadIconPath + '" alt="" class="quiz-finished-action-icon">' +
                                '</button>' +
                            '</div>' +
                    '</div>';

                document.getElementById('close-kit-button').addEventListener('click', function() {
                    window.location.reload();
                });

                document.getElementById('restart-path-button').addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    startExperience();
                });

                document.getElementById('download-rules-button').addEventListener('click', function() {
                    downloadEssentialRulesPdf(finalScore, finalTotal, finalResultContent);
                });
            }
        });

    }
}
