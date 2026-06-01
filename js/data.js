const scenarios = [
    {
        id: 1,
        title: "Utilisation d'un CV dans une IA",
        role: "Vous êtes assistant RH.",
        description: "Votre responsable vous demande d'utiliser une IA générative afin de résumer plusieurs CV reçus pour un recrutement.",
        question: "Que faites-vous ?",
        answers: [
            "Copier les CV complets dans ChatGPT",
            "Anonymiser les CV avant utilisation",
            "Envoyer directement les CV à une IA publique"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        title: "Le mail du directeur général",
        role: "Vous êtes assistant administratif.",
        description: "À 17h45, vous recevez un e-mail semblant provenir du directeur général. Il vous demande de lui transmettre rapidement la liste complète des salariés avec leurs coordonnées afin de préparer une réunion urgente. Le ton du message est inhabituel et l'adresse d'expédition ressemble à celle du directeur mais comporte une légère différence.",
        question: "Que faites-vous ?",
        answers: [
            "Je transfère le mail à plusieurs collègues pour leur demander leur avis",
            "Je vérifie l'adresse de l'expéditeur et contacte le directeur par un autre moyen avant d'agir",
            "J'envoie immédiatement les informations demandées pour éviter de retarder la réunion"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        title: "Le document confidentiel",
        role: "Vous êtes assistant RH.",
        description: "Un manager vous transmet un document contenant des informations disciplinaires concernant plusieurs salariés et vous demande de rédiger un compte-rendu à l'aide d'une IA.",
        question: "Quelle est la meilleure décision ?",
        answers: [
            "Anonymiser les informations sensibles avant toute utilisation",
            "Utiliser directement le document dans une IA publique",
            "Partager le document avec un collègue pour qu'il utilise son compte IA"
        ],
        correctAnswer: 0
    },
    {
        id: 4,
        title: "La politique interne inventée",
        role: "Vous êtes assistant RH.",
        description: "Un collaborateur vous demande combien de jours de télétravail sont autorisés par semaine. Vous posez la question à une IA qui vous répond avec assurance : 'Les salariés ont droit à 3 jours de télétravail par semaine selon la politique interne de l'entreprise'. Vous ne connaissez pas la réponse officielle.",
        question: "Que faites-vous ?",
        answers: [
            "Je transmets directement la réponse de l'IA au collaborateur",
            "Je demande à l'IA de confirmer sa réponse une seconde fois",
            "Je vérifie la politique interne officielle avant de répondre"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        title: "Le faux candidat parfait",
        role: "Vous êtes assistant RH.",
        description: "Lors d'un recrutement, vous recevez un CV exceptionnel accompagné d'une vidéo de présentation très convaincante. Un collègue vous informe que certaines candidatures utilisent désormais des contenus générés par IA et des deepfakes.",
        question: "Quelle est la meilleure réaction ?",
        answers: [
            "Écarter automatiquement tous les candidats utilisant l'IA",
            "Vérifier les informations du candidat et organiser un entretien pour confirmer son identité et ses compétences",
            "Valider immédiatement la candidature car le profil semble excellent"
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
        question: "Peut-on utiliser un document disciplinaire dans une IA publique ?",
        answers: ["Oui", "Non"],
        correctAnswer: 1,
        explanation: "Les données disciplinaires sont hautement sensibles."
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
        question: "Faut-il rejeter automatiquement un candidat parce qu'il utilise l'IA ?",
        answers: ["Oui", "Non"],
        correctAnswer: 1,
        explanation: "L'important est de vérifier les informations et de rencontrer le candidat."
    }
];