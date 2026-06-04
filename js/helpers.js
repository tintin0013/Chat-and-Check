// UTILITY FUNCTIONS

function getResultMessage(score) {
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

function getEssentialRules() {
  return [
    "Protéger les données personnelles avant toute utilisation dans une IA.",
    "Vérifier l'identité des demandeurs d'informations sensibles.",
    "Ne jamais partager de données confidentielles dans une IA publique.",
    "Toujours vérifier les réponses générées par IA.",
    "Garder un esprit critique face aux contenus IA (CV, vidéos, messages…).",
  ];
}

function getScenarioSummaryContent(scenarioScore, totalScore) {
  if (scenarioScore >= 7) {
    return {
      color: "#07B29A",
      message: "Scénarios OK",
    };
  }

  if (scenarioScore >= 5) {
    return {
      color: "#D38200",
      message: "Scénarios corrects",
    };
  }

  return {
    color: "#DE696B",
    message: "Scénarios à renforcer",
  };
}

function getRecapQuizSummaryContent(finalScore) {
  if (finalScore >= 4) {
    return {
      color: "#07B29A",
      message: "Quiz : OK",
    };
  }

  if (finalScore === 3) {
    return {
      color: "#D38200",
      message: "Quiz : Correct",
    };
  }

  return {
    color: "#DE696B",
    message: "Quiz : À renforcer",
  };
}

function getElapsedQuizLabel() {
  if (countdownStartedAt === null) {
    return "0:00";
  }

  var elapsedMs = Date.now() - countdownStartedAt;

  if (elapsedMs > COUNTDOWN_DURATION_MS) {
    return "+ 10mn";
  }

  var totalSeconds = Math.floor(elapsedMs / 1000);
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  return minutes + ":" + String(seconds).padStart(2, "0");
}

function getRecapResultContent(finalScore, finalTotal) {
  if (finalTotal === 5) {
    if (finalScore === 5) {
      return {
        label: "NIVEAU EXCELLENT",
        title: "Excellente maîtrise des bons réflexes",
        description:
          "Vous appliquez les bonnes pratiques de confidentialité et d'utilisation de l'IA avec rigueur.",
      };
    }

    if (finalScore === 4) {
      return {
        label: "NIVEAU BON A RENFORCER",
        title: "Vous êtes sur la bonne voie",
        description:
          "Quelques points à retravailler sur la confidentialité des données.",
      };
    }

    if (finalScore === 3) {
      return {
        label: "NIVEAU MOYEN A RENFORCER",
        title: "Les bases sont là, mais restent à consolider",
        description:
          "Plusieurs réflexes doivent encore être renforcés pour sécuriser l'usage des données avec l'IA.",
      };
    }

    if (finalScore === 2) {
      return {
        label: "NIVEAU FRAGILE",
        title: "Une vigilance plus régulière est nécessaire",
        description:
          "Des notions importantes sur la confidentialité et les usages sûrs de l'IA restent à revoir.",
      };
    }

    if (finalScore === 1) {
      return {
        label: "NIVEAU INSUFFISANT",
        title: "Des repères essentiels sont encore à acquérir",
        description:
          "Un renforcement rapide est recommandé pour éviter les erreurs sur les données sensibles.",
      };
    }

    return {
      label: "NIVEAU CRITIQUE",
      title: "Une remise à niveau est indispensable",
      description:
        "Les fondamentaux de confidentialité et de prudence avec l'IA doivent être repris en priorité.",
    };
  }

  var scoreRatio = finalTotal > 0 ? finalScore / finalTotal : 0;

  if (scoreRatio === 1) {
    return {
      label: "NIVEAU EXCELLENT",
      title: "Excellente maîtrise des bons réflexes",
      description:
        "Vous appliquez les bonnes pratiques de confidentialité et d'utilisation de l'IA avec rigueur.",
    };
  }

  if (scoreRatio >= 0.8) {
    return {
      label: "NIVEAU BON A RENFORCER",
      title: "Vous êtes sur la bonne voie",
      description:
        "Quelques points à retravailler sur la confidentialité des données.",
    };
  }

  if (scoreRatio >= 0.6) {
    return {
      label: "NIVEAU MOYEN A RENFORCER",
      title: "Les bases sont là, mais restent à consolider",
      description:
        "Plusieurs réflexes doivent encore être renforcés pour sécuriser l'usage des données avec l'IA.",
    };
  }

  if (scoreRatio >= 0.4) {
    return {
      label: "NIVEAU FRAGILE",
      title: "Une vigilance plus régulière est nécessaire",
      description:
        "Des notions importantes sur la confidentialité et les usages sûrs de l'IA restent à revoir.",
    };
  }

  if (scoreRatio > 0) {
    return {
      label: "NIVEAU INSUFFISANT",
      title: "Des repères essentiels sont encore à acquérir",
      description:
        "Un renforcement rapide est recommandé pour éviter les erreurs sur les données sensibles.",
    };
  }

  return {
    label: "NIVEAU CRITIQUE",
    title: "Une remise à niveau est indispensable",
    description:
      "Les fondamentaux de confidentialité et de prudence avec l'IA doivent être repris en priorité.",
  };
}

function downloadEssentialRulesPdf(finalScore, finalTotal, finalResultContent) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert(
      "Le téléchargement PDF n'est pas disponible pour le moment.",
    );
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
  addWrappedText(
    "Score : " + finalScore + "/" + finalTotal,
    16,
    [124, 58, 237],
    4,
    true,
  );
  addWrappedText(finalResultContent.label, 12, [7, 178, 154], 4, true);
  addWrappedText(finalResultContent.title, 14, [26, 22, 48], 3, true);
  addWrappedText(
    finalResultContent.description,
    11,
    [114, 114, 122],
    8,
    false,
  );
  addWrappedText("Les 5 regles essentielles", 14, [139, 139, 140], 6, true);

  essentialRules.forEach(function (rule, index) {
    addWrappedText(index + 1 + ". " + rule, 11, [26, 22, 48], 4, false);
  });

  pdf.save("chat-and-check-5-regles.pdf");
}
