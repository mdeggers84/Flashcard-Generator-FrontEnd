// requires ClozeCard js file and inquirer package
var questionArr = require("./questions.json");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var asciify = require("asciify");
var inquirer = require("inquirer");

// function wrapper that cycles through cards and prompts user for answers
function askQuestion(count, type, score) {
  var newCard;
  // sets count equal to number of questions
  if (count < questionArr.length) {
    // the constructor works with or without the 'new' keyword
    if (type === "Basic") {
      // newCard = new BasicCard(questionArr[count].question, questionArr[count].answer);
      newCard = BasicCard(questionArr[count].question, questionArr[count].answer);
    } else if (type === "Cloze") {
      // newCard = new ClozeCard(questionArr[count].text, questionArr[count].answer);
      newCard = ClozeCard(questionArr[count].text, questionArr[count].answer);
    }

    // updates count after pulling the correct question from array
    count++;

    // calls newCard function question, allowing diff style of question
    // based on card style chose (basic vs cloze)
    newCard.question();

    // prompts user for answer to question
    inquirer.prompt([
      {
        type: "input",
        message: "Answer: ",
        name: "answer"
      }
    ]).then(function(user) {
      // calls newCard function to check answer
      score += newCard.answer(user.answer);
      // asks next question with updated count
      askQuestion(count, type, score);
    });
  } else if (score === 5) {
    asciify("Awesome!", function(err, res) { console.log(res); });
  } else if (score >= 3) {
    asciify("Ok!", function(err, res) { console.log(res); });
  } else {
    asciify("Meh...", function(err, res) { console.log(res); });
  }
}

// initiating function
function questionStyle() {
  inquirer.prompt([
    {
      type: "list",
      message: "Basic Cards or Cloze Cards?",
      choices: ["Basic", "Cloze"],
      name: "choice"
    }
  ]).then(function(user) {
    // calls with initial count and card type set
    askQuestion(0, user.choice, 0);
  });
}

// calls function prompting user to choose between Basic or Cloze deleting cards
questionStyle();
