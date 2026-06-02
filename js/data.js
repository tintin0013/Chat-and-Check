const scenarios = [
    {
        id: 1,
        title: "Le recrutement express",
        role: "Vous êtes assistant RH.",
        description: "Votre responsable vous demande d’analyser rapidement plusieurs CV reçus pour un recrutement. Pour gagner du temps, vous envisagez d’utiliser une IA générative afin d’obtenir un résumé des candidatures.",
        question: "Que faites-vous ?",
        answers: [
            "Copier-coller les CV complets dans l’IA",
            "Anonymiser les CV avant utilisation puis demander un résumé",
            "Envoyer les CV à une IA publique via votre compte personnel"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        title: "Le mail urgent du directeur",
        role: "Vous êtes assistant administratif.",
        description: "À 17h45, vous recevez un mail semblant provenir du directeur général. Il vous demande d’envoyer rapidement la liste complète des salariés avec leurs coordonnées afin de préparer une réunion urgente. L’adresse ressemble à celle du directeur mais contient une légère différence.",
        question: "Que faites-vous ?",
        answers: [
            "J’envoie immédiatement les informations demandées",
            "Je transfère le mail à plusieurs collègues pour leur demander leur avis",
            "Je vérifie l’identité de l’expéditeur via un autre canal avant toute action"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        title: "Le compte-rendu disciplinaire",
        role: "Vous êtes assistant RH.",
        description: "Un manager vous demande de rédiger un compte-rendu à partir d’un document contenant des informations disciplinaires concernant plusieurs salariés. Vous pensez utiliser une IA pour accélérer la rédaction.",
        question: "Quelle est la meilleure décision ?",
        answers: [
            "Utiliser directement le document dans une IA publique",
            "Anonymiser les informations sensibles avant toute utilisation",
            "Partager le document avec un collègue qui possède un abonnement IA"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        title: "La réponse convaincante",
        role: "Vous êtes assistant administratif.",
        description: "Un collaborateur vous demande combien de jours de télétravail sont autorisés dans l’entreprise. Vous interrogez une IA qui répond : 'Les salariés ont droit à 3 jours de télétravail par semaine selon la politique interne.' Vous ne connaissez pas la règle officielle.",
        question: "Que faites-vous ?",
        answers: [
            "Je transmets directement la réponse",
            "Je demande à l’IA de confirmer sa réponse",
            "Je consulte la politique interne officielle avant de répondre"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        title: "Le candidat idéal",
        role: "Vous participez à un recrutement.",
        description: "Vous recevez un CV remarquable accompagné d’une vidéo de présentation très professionnelle. Un collègue vous rappelle que certains candidats utilisent désormais des contenus générés par IA ou des deepfakes.",
        question: "Quelle est la meilleure réaction ?",
        answers: [
            "Rejeter automatiquement tous les candidats utilisant l’IA",
            "Vérifier les informations du candidat et organiser un entretien",
            "Accepter immédiatement la candidature"
        ],
        correctAnswer: 1
    }
];

const recapQuizData = [
    {
        id: 1,
        question: "Peut-on envoyer un CV complet contenant des données personnelles dans une IA publique ?",
        answers: ["Oui", "Non"],
        correctAnswer: 1,
        explanation: "Les CV doivent être anonymisés avant utilisation."
    },
    {
        id: 2,
        question: "Un mail semble venir du directeur et demande des données sensibles. Faut-il lui répondre immédiatement ?",
        answers: ["Oui", "Non"],
        correctAnswer: 1,
        explanation: "Toujours vérifier l'identité via un autre canal (Exemple Teams)."
    },
    {
        id: 3,
        question: "Peut-on utiliser des données sensibles dans une IA interne sécurisée validée par l’entreprise ?",
        answers: ["Oui", "Non"],
        correctAnswer: 0,
        explanation: "L’utilisation est autorisée lorsque l’outil est interne, conforme aux règles de sécurité et approuvé par l’entreprise."
    },
    {
        id: 4,
        question: "Peut-on faire aveuglément confiance à une réponse donnée par une IA ?",
        answers: ["Oui", "Non"],
        correctAnswer: 1,
        explanation: "Une réponse IA n'est jamais une preuve. Toujours vérifier dans les sources officielles."
    },
    {
        id: 5,
        question: "Peut-on accepter un candidat qui a utilisé l’IA dans son CV ?",
        answers: ["Oui", "Non"],
        correctAnswer: 0,
        explanation: "L’usage de l’IA n’est pas un problème tant que les informations sont vraies. Il faut donc vérifier les compétences et l’identité du candidat lors de l’entretien."
    }
];