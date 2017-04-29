// BasicCard constructor
function BasicCard(front, back) {
  // allows for setting var to constructor without 'new' keyword
  if (this instanceof BasicCard) {
    this.front = front;
    this.back = back;
    // prints question to console
    this.question = function() {
      console.log("-------------------------------------\n" + this.front);
    };
    // verifies answer is correct
    this.answer = function(answer) {
      if (answer === this.back) {
        console.log("You got it right!\n-------------------------------------");
      // if incorrect, prints correct answer to console
      } else {
        console.log("The correct answer is : " + this.back);
      }
    };
  } else {
    return new BasicCard(front, back);
  }
}

// exports constructor to be used in other files
module.exports = BasicCard;
