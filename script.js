let Questions;

let currQuestion = 0;

let score = 0;

let indexOfCorAns=0;

let time=0;

let corAns=0;

document.getElementById('registration-form')?.addEventListener('submit', function(event) {

 

    event.preventDefault();

   

    var entryForm=document.getElementById('registration-form');

    var numberOfQuestions = document.getElementById('number-question').value;

    var level = document.querySelector('input[name="level"]:checked').value;

    var questionCategory = document.querySelector('input[name="category"]:checked').value;

    fetch('https://opentdb.com/api.php?amount=' + numberOfQuestions + '&category=' + questionCategory + '&difficulty=' + level + '&type=' + 'multiple')

    .then(function(response) {

        if (!response.ok) {

            throw new Error(response.status);

        }

        entryForm.style.display="none";

       

        return response.json();

    })

    .then(function(data) {

        Questions = data;

        showQuestion();

    })

    .catch(function(error) {

        displayError(error);

    });

});

 

function showQuestion() {

    timer();

    const submitButton=document.getElementById('submit-button');

    submitButton.style.display="block";

    const questionContainer = document.getElementById('quiz-questions');

    const optionsContainer = document.getElementById('quiz-options');

    const questionNumber=currQuestion+1;

    questionContainer.textContent ="Question : "+questionNumber+" "+ Questions.results[currQuestion].question;

    optionsContainer.innerHTML = '';

 

    const options = [...Questions.results[currQuestion].incorrect_answers, Questions.results[currQuestion].correct_answer];

    shuffle(options);

    indexOfCorAns=options.indexOf(Questions.results[currQuestion].correct_answer);

   

    options.forEach((option, index) => {

        const optionElement = document.createElement('div');

        optionElement.classList.add('option');

 

        const input = document.createElement('input');

        input.type = 'radio';

        input.name = 'answer';

        input.value = index;

 

        const label = document.createElement('label');

        label.textContent = option;

   

        optionElement.appendChild(input);

        optionElement.appendChild(label);

 

        optionsContainer.appendChild(optionElement);

         

    });

    corAns=Questions.results[currQuestion].correct_answer;

   

}

 

function checkAnswer() {

    clearInterval(time);

 

    const selectedOption = parseInt(document.querySelector('input[name="answer"]:checked').value);

    const correctIndex = indexOfCorAns;

 

    if (selectedOption === correctIndex) {

        score++;

        alert("Yay! you gave a correct answer!")

    }

    else{

        alert("Oops! Incorrect Answer. Correct Answer is: " + corAns)

    }

     

    currQuestion++;

 

    if (currQuestion < Questions.results.length) {

        showQuestion();

    } else {

        displayScore();

    }

}

 

function displayScore() {

    const scoreElement = document.getElementById('score');

    scoreElement.textContent = `Your Score: ${score} out of ${Questions.results.length}`;

    scoreElement.style.display = 'block';

}

 

 

function timer(){

    const timerHeading=document.querySelector(".timer");

    timerHeading.style.display="block";

    var sec = 20;

     time = setInterval(function(){

        document.getElementById('safeTimerDisplay').innerHTML='00:'+sec;

        sec--;

        if (sec < 0) {

            clearInterval(time);

            alert("You ran out of time! Correct answer is "+corAns);

            currQuestion++;

            showQuestion();

        }

    }, 1000);

}

function shuffle(array) {

    let currentIndex = array.length,  randomIndex;

 

   

    while (currentIndex > 0) {

 

      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;

 

     

      [array[currentIndex], array[randomIndex]] = [

        array[randomIndex], array[currentIndex]];

    }

 

    return array;

  }

function displayError(error) {

    var errorElement = document.getElementById('error-block');

    errorElement.innerHTML = '<p>Error: ' + error.message + '</p>';

}

 