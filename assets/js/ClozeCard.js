// ClozeCard constructor
function ClozeCard(text, cloze) {
  // checks to see if the cloze is found within the full text
  if (text.indexOf(cloze) !== -1) {
    if (this instanceof ClozeCard) {
      this.cloze = cloze;
      this.text = text;
      // returns formatted partial text when called
      this.partial = function() {
        return this.text.replace(this.cloze, " ... ");
      };
      // prints question to console
      this.question = function() {
        console.log("-------------------------------------\n" + this.partial() + "\n");
      };
      // verifies answer is correct
      this.answer = function(answer) {
        if (answer === this.cloze) {
          console.log("You got it right!\n-------------------------------------");
        // if wrong, prints correct answer
        } else {
          console.log("The correct response is: " + this.text.replace(this.cloze, "\"" + this.cloze + "\""));
        }
      };
    } else {
      // allows user to create constructor without 'new' keyword
      return new ClozeCard(text, cloze);
    }
  } else {
    // logs an error to the console when cloze isn't found within text
    console.log("Error: \"" + cloze + "\" is not found in \"" + text + "\"");
  }
}

// exports js for use in other files
module.exports = ClozeCard;
