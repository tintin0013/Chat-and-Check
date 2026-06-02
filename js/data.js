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
        correctAnswer: 1,
        hint: "Réfléchissez aux informations présentes dans un CV. Certaines données peuvent-elles être considérées comme personnelles ou sensibles ?",
        feedback: "Les CV contiennent des données personnelles (nom, adresse, téléphone, parcours professionnel). Avant toute utilisation dans un outil d’IA, ces informations doivent être anonymisées ou traitées selon les règles internes de l’entreprise. Les données personnelles ne doivent jamais être partagées sans précaution."
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
        correctAnswer: 2,
        hint: "L'urgence d'une demande ne garantit pas son authenticité. Comment pourriez-vous vérifier l'identité de l'expéditeur ?",
        feedback: "Les outils IA permettent aujourd’hui de créer des messages extrêmement crédibles. Avant de transmettre des données sensibles, il faut toujours vérifier l’identité du demandeur. Ne faites jamais confiance à un message uniquement parce qu’il semble authentique."
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
        correctAnswer: 1,
        hint: "Réfléchissez à la nature des informations contenues dans ce document. Peuvent-elles être diffusées sans précaution ?",
        feedback: "Les informations disciplinaires font partie des données particulièrement sensibles. Elles ne doivent pas être transmises à des outils externes sans précautions. L’IA n’est pas un espace de stockage sécurisé pour les données confidentielles."
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
        correctAnswer: 2,
        hint: "Une réponse formulée avec assurance est-elle forcément exacte ? Quelle source pourrait confirmer l'information ?",
        feedback: "L’IA peut produire une réponse convaincante mais incorrecte. Même lorsqu’elle paraît certaine d’elle, ses informations doivent être vérifiées. Une réponse IA n’est pas une preuve."
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
        correctAnswer: 1,
        hint: "Une présentation très convaincante garantit-elle que les informations sont exactes ? Quelle étape permettrait de le vérifier ?",
        feedback: "Les outils IA peuvent aider les candidats à améliorer leur présentation, mais ils peuvent aussi être utilisés pour tromper les recruteurs. La vérification humaine reste indispensable. L’esprit critique reste votre meilleur outil face aux contenus générés par IA."
    }
];