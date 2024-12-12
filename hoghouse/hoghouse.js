function submitQuiz() {
    // Correct answers
    const answers = {
        question1: 'c',
        question2: 'b',
        question3: 'b'
    };

    // Getting the form data
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);

    // Check answers
    let score = 0;
    for (const [question, answer] of formData.entries()) {
        if (answers[question] === answer) {
            score++;
        }
    }

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `You scored ${score} out of ${Object.keys(answers).length}.`;
}