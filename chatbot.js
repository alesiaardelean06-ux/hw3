let questions = [
    {
        question: "Have you ever volunteered before??",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "That is wonderful! Volunteering is a great way to help others and grow as a person.",
        incorrectResponse: "That is okay! Volunteering can be a beautiful experience to try in the future."
    },
    {
        question: "Would you like to help your community?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Great! Every small act of kindness can make a difference.",
        incorrectResponse: "Maybe one day!"
    },
    {
        question: "Do you think volunteering can bring people together?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Exactly! This is one of the many benefits of volunteering.",
        incorrectResponse: "Actually, volunteering is a fantastic way to create stronger bonds!"
    },
    {
        question: "Which of these is a benefit of volunteering?",
        options: {
            a: "Helping others and developing new skills",
            b: "Only earning money"
        },
        correctAnswer: "a",
        correctResponse: "Correct! I like the way you think!",
        incorrectResponse: "Not quite... Volunteering is mainly about helping others. Please reflect on this."
    },
    {
        question: "Can teenagers make a real difference through volunteering?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Absolutely! Young people can have a powerful impact.",
        incorrectResponse: "They definitely can! Many important volunteer projects are created and led by teenagers."
    }
    ,
      {
        question: "Have you heard of Interact before?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "You are on the right path then!",
        incorrectResponse: "Do not worry! Interact is a service club, sponsored by Rotary clubs around the world."
    },
    {
        question: "Who is Interact mainly created for?",
        options: {
            a: "Young people aged 12 to 18",
            b: "Only adults over 30"
        },
        correctAnswer: "a",
        correctResponse: "Correct! Interact gives teenagers the chance to shine!",
        incorrectResponse: "Not quite. Interact is designed for young people, aged 12 to 18."
    },
    {
        question: "What is one main purpose of Interact?",
        options: {
            a: "Community service and leadership",
            b: "Selling products"
        },
        correctAnswer: "a",
        correctResponse: "Exactly! Interact encourages service, leadership, and international understanding.",
        incorrectResponse: "Actually, Interact focuses on community service, leadership, and helping young people create positive change."
    },
    {
        question: "Interact clubs are sponsored by...",
        options: {
            a: "Rotary clubs",
            b: "Sports clubs"
        },
        correctAnswer: "a",
        correctResponse: "Correct! Interact clubs are supported by Rotary clubs.",
        incorrectResponse: "Not exactly. Interact clubs are sponsored by Rotary clubs."
    },
    {
        question: "Can Interact clubs organize charity projects?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Yes! Charity events and community projects are an important part of Interact.",
        incorrectResponse: "They certainly can. Interact clubs often organize charity events, fundraisers, and service projects."
    },
    {
        question: "What can members of Interact develop through volunteering?",
        options: {
            a: "Leadership, teamwork, and empathy",
            b: "Nothing"
        },
        correctAnswer: "a",
        correctResponse: "Exactly! Interact helps members become more responsible, confident, and caring.",
        incorrectResponse: "The best answer is leadership, teamwork, and empathy — all important values in Interact."
    },
    {
        question: "Would you like to take part in a volunteer project one day?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Wonderful! A single project can be the beginning of a meaningful journey.",
        incorrectResponse: "That is okay."
    }
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");
displayQuestion();

function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = Object.keys(currentQuestion.options).map(key => `${key}. ${currentQuestion.options[key]}`).join('');

    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");
    botResponse.innerHTML = `<strong>BOT:</strong> ${currentQuestion.question} ${optionsHTML}`;
    chatContainer.appendChild(botResponse);
}

function scrollChatContainerToBottom() {
    let chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let userResponse = userInput.value.toLowerCase();

    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>YOU:</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];
    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");
    botResponse.innerHTML = `<strong>BOT:</strong> `;
    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML += currentQuestion.correctResponse;
    } else {
        botResponse.innerHTML += currentQuestion.incorrectResponse;
    }
    chatContainer.appendChild(botResponse);

    currentQuestionIndex = (currentQuestionIndex + 1 ) % questions.length;
    userInput.value ="";
    displayQuestion();

    scrollChatContainerToBottom();
});