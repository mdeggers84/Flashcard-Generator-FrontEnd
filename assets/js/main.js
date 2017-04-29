// requires ClozeCard js file and inquirer package
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");

// arr of objects to hold predefined questions
var questionArr = [
  {
    text: "George Lucas officially gave the producers clearance to do \"Star Wars\" gags because he's a fan of the show.",
    question: "Who officially gave the producers clearance to do \"Star Wars\" gags because he's a fan of the show?",
    answer: "George Lucas"
  },
  {
    text: "Seth MacFarlane based the voice of Peter Griffin on a security guard he knew while going to college.",
    question: "Who's voice was based on a security guard Seth MacFarlane knew while going to college?",
    answer: "Peter Griffin"
  },
  {
    text: "Seth MacFarlane has admitted that the family's constant abuse of Meg is a result of \"a bunch of male writers not knowing how to write for a teenage girl\".",
    question: "The family's constance abuse of this person is the result of \"a bunch of male writers not knowing how to write for a teenage girl\".",
    answer: "Meg"
  },
  {
    text: "Meg's friends assumed her name was short for Megan. In actuality, when Lois hands Meg's birth certificate, to Peter, he alters it; Meg's birth name is Megatron Griffin.",
    question: "What did Peter alter Meg's first name to on her birth certificate?",
    answer: "Megatron"
  },
  {
    text: "The big chicken that always fights Peter is named Ernie.",
    question: "What is the name of the big chicken that always fights Peter?",
    answer: "Ernie"
  }
];

// function wrapper that cycles through cards and prompts user for answers
function askQuestion(count, type) {
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
      newCard.answer(user.answer);

      // asks next question with updated count
      askQuestion(count, type);
    });
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
    askQuestion(0, user.choice);
  });
}

// calls function prompting user to choose between Basic or Cloze deleting cards
questionStyle();
