$(document).ready(function() {
    let wordsEasy = [
    { en: "always", ua: "завжди" },
    { en: "never", ua: "ніколи" },
    { en: "apple", ua: "яблуко" },
    { en: "house", ua: "будинок" },
    { en: "water", ua: "вода" },
    { en: "friend", ua: "друг" },
    { en: "book", ua: "книга" },
    { en: "car", ua: "машина" },
    { en: "school", ua: "школа" },
    { en: "time", ua: "час" }
];
    let wordsMedium = [
    { en: "journey", ua: "подорож" },
    { en: "weather", ua: "погода" },
    { en: "knowledge", ua: "знання" },
    { en: "promise", ua: "обіцянка" },
    { en: "success", ua: "успіх" },
    { en: "danger", ua: "небезпека" },
    { en: "beautiful", ua: "красивий" },
    { en: "remember", ua: "пам'ятати" },
    { en: "understand", ua: "розуміти" },
    { en: "different", ua: "різний" }
];
    let wordsHard = [
    { en: "opportunity", ua: "можливість" },
    { en: "environment", ua: "навколишнє середовище" },
    { en: "responsible", ua: "відповідальний" },
    { en: "achievement", ua: "досягнення" },
    { en: "experience", ua: "досвід" },
    { en: "influence", ua: "вплив" },
    { en: "independent", ua: "незалежний" },
    { en: "consequence", ua: "наслідок" },
    { en: "government", ua: "уряд" },
    { en: "advantage", ua: "перевага" }
];
    let currentWords = [...wordsEasy];
    let currentStep = 0;
    let correct = 0;
    let wrong = 0;

    function updateUI() {
        $("#currentStepText").text(currentStep + 1);
        $("#navStepText").text(currentStep + 1);
    }

    function showWord() {
        if (currentStep < 0) currentStep = 0;
        if (currentStep >= currentWords.length) currentStep = currentWords.length - 1;

        $("#card").fadeOut(200, function() {
            $(this).text(currentWords[currentStep].en);
            updateUI();
            $("#userInput").val("").focus();
            $(this).fadeIn(200);
        });
    }

    function checkAnswer() {
        let userAnswer = $("#userInput").val().trim().toLowerCase();
        if (userAnswer === "") return;

        let correctAnswer = currentWords[currentStep].ua.toLowerCase();

        if (userAnswer === correctAnswer) {
            correct++;
            $("#correctCount").text(correct);
            $("#card").css("background", "#d4edda");
        } else {
            wrong++;
            $("#wrongCount").text(wrong);
            $("#card").css("background", "#f8d7da");
        }

        currentStep++;
        setTimeout(() => {
            $("#card").css("background", "#fff");
            if (currentStep < currentWords.length) {
                showWord();
            } else {
                $("#card").text("Гру завершено!");
                $("#userInput").prop("disabled", true);
            }
        }, 600);
    }

    $("#card").click(checkAnswer);
    $("#userInput").keypress(e => { if (e.which === 13) checkAnswer(); });

    $("#prevBtn").click(function() {
        if (currentStep > 0) { currentStep--; showWord(); }
    });

    $("#nextBtn").click(function() {
        if (currentStep < currentWords.length - 1) { currentStep++; showWord(); }
    });

    $('input[name="level"]').change(function() {
        let level = $(this).val();
        if (level === "easy") currentWords = [...wordsEasy];
        if (level === "medium") currentWords = [...wordsMedium];
        if (level === "hard") currentWords = [...wordsHard];
        
        currentWords.sort(() => Math.random() - 0.5);
        currentStep = 0; correct = 0; wrong = 0;
        $("#correctCount").text(0); $("#wrongCount").text(0);
        $("#userInput").prop("disabled", false);
        showWord();
    });

    $("#statsBtn").click(function() {
        let total = correct + wrong;
        let percent = total === 0 ? 0 : Math.round((correct / total) * 100);
        alert("Статистика:\nВірно: " + correct + "\nНевірно: " + wrong + "\nУспішність: " + percent + "%");
    });

    currentWords.sort(() => Math.random() - 0.5);
    showWord();
});