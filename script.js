const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = document.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');

const optionList = document.querySelector('.option_list');

//if start quiz button clicked
startBtn.onclick = () => {
    infoBox.classList.add('activeInfo'); //show info box
}
//if exit button clicked
exitBtn.onclick = () => {
    infoBox.classList.remove('activeInfo'); //hide info box
}
//if continue button clicked
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo'); //hide info box
    quizBox.classList.add('activeQuiz'); //show quiz box
    showQuestions(0);
    queCounter(1);
}

let queCount = 0;
let queNumb = 1;

const nextBtn = quizBox.querySelector('.next_btn');
//if next btn clicked
nextBtn.onclick = () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
    } else {
        console.log('questions completed');
    }
}

//getting questions and options from array
function showQuestions(index) {
    const queText = document.querySelector('.que_text');
    let queTag = `<span>` + questions[index].numb + "." + questions[index].question + `</span>`;
    let optionTag = `<div class="option">` + questions[index].options[0] + `<span></span></div>`
        + `<div class="option">` + questions[index].options[1] + `<span></span></div>`
        + `<div class="option">` + questions[index].options[2] + `<span></span></div>`
        + `<div class="option">` + questions[index].options[3] + `<span></span></div>`;
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if(userAns == correctAns) {
        answer.classList.add('correct');
    } else {
        answer.classList.add('incorrect');
        //if answer is incorrect then automatically selected the correct answer 
        for(let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct");
            }            
        }
    }

    //once user selected disabled all options
    for(let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
}

function queCounter(index) {
    const bottomQuesCounter = document.querySelector('.total_que');
    let totalQuesCountTag = `<span><p>` + index + `</p>of<p>` + questions.length + `</p>Questions</span>`;
    bottomQuesCounter.innerHTML = totalQuesCountTag;
}
