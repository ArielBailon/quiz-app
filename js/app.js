import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
  // cache the DOM
  const quizEl = document.querySelector(".jabquiz");
  const tagLineEl = document.querySelector(".jabquiz__tagline");
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const choicesEl = document.querySelector(".jabquiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  const q1 = new Question(
    "First president of US?",
    ["Barack", "Osama", "Geroge", "Lokis"],
    2
  )

  const q2 = new Question(
    "When was JS created?",
    ["June 1995", "May 1995", "July 23434", "Lokis 2"],
    1
  )

  const q3 = new Question(
    "What does CSS stand for?",
    ["CSS itself", "Osama", "CSS not itself", "Lokis 4"],
    2
  )

  const q4 = new Question(
    "HTML is?",
    ["HTML itself", "CSS", "CSSsdad", "Ratas 1"],
    0
  )

  const q5 = new Question(
    "what am i gonna eat today?",
    ["CSS asdasd", "asdasd", "asd asd itself", "asd 4"],
    3
  )

  const quiz = new Quiz([q1, q2, q3, q4, q5])

  const listeners = _ => {
    nextButtonEl.addEventListener("click", function () {
      const selectedRadioElem = document.querySelector('input[name=choice]:checked');
      if (selectedRadioElem) {
        const key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
      }
    })
    restartButtonEl.addEventListener("click", function () {
      // reset the quiz
      quiz.reset()
      // render all 
      renderAll();
      // restore next button
      nextButtonEl.style.opacity = 1;
      // reset tagline
      tagLineEl.innerHTML = "Pick an option below!";
    })
  }

  const setValue = (elem, value) => {
    elem.innerHTML = value;
  }

  const renderQuestion = _ => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
  }

  const renderChoicesElements = _ => {
    let markup = "";
    const currentQuestion = quiz.getCurrentQuestion().choices;
    currentQuestion.forEach((elem, index) => {
      markup += `
        <li class="jabquiz__choice">
          <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
          <label for="choice${index}" class="jabquiz__label">
            <i></i>
            <span>${elem}</span>
          </label>
       </li>
      `
    });

    setValue(choicesEl, markup);
  }


  const renderTracker = _ => {
    const index = quiz.currentIndex;
    setValue(trackerEl, `${index+1} of ${quiz.questions.length}`)
  }

  const getPercentage = (num1, num2) => {
    return Math.round((num1 / num2) * 100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%";
      }
    }, 3);
  }

  const renderProgress = _ => {
    // Width
    const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
    // launch(0. width)
    launch(0, currentWidth);
  }

  const renderEndScreen = _ => {
    setValue(quizQuestionEl, "Great Job!");
    setValue(tagLineEl, "Complete!");
    setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
    nextButtonEl.style.opacity = 0;
    renderProgress();
  }

  const renderAll = _ => {
    if (quiz.hasEnded()) {
      //renderEndScreen
      renderEndScreen();
    } else {
      // Render question
      renderQuestion();
      // Render the choices elments
      renderChoicesElements();
      // Render Tracker
      renderTracker();
      // Render progress
      renderProgress();
    }
  }

  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();

App.renderAll();
App.listeners();