const questionsPool = [
    { 
        q: "Quelle proportion des victimes de violences sont des femmes ?", 
        a: "9 fois sur 10", 
        options: ["5 fois sur 10", "7 fois sur 10", "9 fois sur 10"] 
    },
    { 
        q: "Quelle est la part des hommes parmi les personnes condamnées pour violences sexuelles ?", 
        a: "99%", 
        options: ["75%", "90%", "99%"] 
    },
    { 
        q: "À quelle fréquence un viol ou une tentative de viol se produit-il en France ?", 
        a: "Toutes les 2 min 30", 
        options: ["Toutes les 10 min", "Toutes les 2 min 30", "Toutes les heures"] 
    },
    { 
        q: "Combien de femmes ont déjà subi une violence sexuelle en France ?", 
        a: "1 femme sur 2", 
        options: ["1 femme sur 4", "1 femme sur 2", "1 femme sur 10"] 
    },
    { 
        q: "Quel est le taux de plaintes pour violences sexuelles classées sans suite ?", 
        a: "80%", 
        options: ["20%", "50%", "80%"] 
    },
    { 
        q: "Dans combien de cas de violences sexuelles la victime connaît-elle l'agresseur ?", 
        a: "91%", 
        options: ["30%", "60%", "91%"] 
    },
    { 
        q: "Quel est le pourcentage de fausses accusations en matière de violences sexuelles ?", 
        a: "0.1%", 
        options: ["0.1%", "5%", "10%"] 
    },
    { 
        q: "Combien de femmes entrent dans la sexualité par un rapport non consenti ?", 
        a: "1 femme sur 6", 
        options: ["1 femme sur 6", "1 femme sur 20", "1 femme sur 50"] 
    },
    { 
        q: "Quel pourcentage de femmes a subi du harcèlement sexuel dans un lieu public ?", 
        a: "80%", 
        options: ["40%", "60%", "80%"] 
    },
    { 
        q: "Quelle part des Français a subi une maltraitance sexuelle dans l'enfance ?", 
        a: "16%", 
        options: ["5%", "10%", "16%"] 
    },
    { 
        q: "Quelle proportion de filles subit une agression sexuelle avant 16 ans ?", 
        a: "1 fille sur 6", 
        options: ["1 fille sur 20", "1 fille sur 15", "1 fille sur 6"] 
    }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let mistakes = [];

function startQuiz() {
    mistakes = [];
    score = 0;
    currentQuestionIndex = 0;
    // Sélectionne 10 questions au hasard parmi le pool
    currentQuestions = questionsPool.sort(() => 0.5 - Math.random()).slice(0, 10);
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.q;
    const buttonsContainer = document.getElementById("answer-buttons");
    buttonsContainer.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn-quiz");
        // On passe l'option exacte cliquée pour la comparaison
        button.onclick = () => checkAnswer(option, question.a, question.q);
        buttonsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correct, questionText) {
    if (selected === correct) {
        score++;
    } else {
        mistakes.push({
            question: questionText,
            bad: selected,
            good: correct
        });
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("result-container").classList.remove("hide");
    document.getElementById("score-text").innerText = `Votre score : ${score} / 10`;

    const correctionDiv = document.getElementById("correction-list");
    correctionDiv.innerHTML = "";

    if (mistakes.length > 0) {
        correctionDiv.innerHTML = "<h3>Récapitulatif de vos erreurs :</h3>";
        mistakes.forEach(m => {
            const item = document.createElement("div");
            item.classList.add("correction-item");
            item.innerHTML = `
                <p><strong>Question :</strong> ${m.question}</p>
                <p>Votre réponse : <span class="wrong">${m.bad}</span></p>
                <p>La bonne réponse : <span class="correct-ans">${m.good}</span></p>
                <hr>
            `;
            correctionDiv.appendChild(item);
        });
    } else {
        correctionDiv.innerHTML = "<p style='color: #2c7a7b; font-weight: bold;'>Félicitations ! Vous avez répondu correctement à toutes les questions.</p>";
    }
}

// Lancement automatique au chargement de la page
startQuiz();