// TODO: fetch test JSON object with 10 total mark as a defult value for each question
const Test = {
  totalMark: 0,
  Questions: {
    question1: {
      result: 10,
      mistakes: {
        taradud: 0,
        tanbeh: 0,
        harakah: 0,
        harf: 0,
        kalemah: 0,
        tajweed: 0,
      },
    },
    question2: {
      result: 10,
      mistakes: {
        taradud: 0,
        tanbeh: 0,
        harakah: 0,
        harf: 0,
        kalemah: 0,
        tajweed: 0,
      },
    },
  },
};

updateUI();

// Function to update the object values with the input values "Controlled inputs"
function ControlledInput(element) {
  Test.Questions["question" + element.id.slice(-1)].mistakes[element.name] =
    parseInt(element.value);
  calculateResult();
  updateUI();
}

// looping through the <span> tags to update the text content with the question total mark for easch
function updateUI() {
  Object.keys(Test.Questions).forEach((key) => {
    const questionResult = document.getElementById(key); // span IDs must be = to the object key's names
    if (questionResult) {
      questionResult.textContent = Test.Questions[key].result;
    }
  });
}

// Attach the calculateResult function to input change events
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    ControlledInput(this);
  });
});

// Function to calculate the total mark and percentage
function calculateResult() {
  // Calculate question result for each single question in the Test object
  Object.keys(Test.Questions).forEach((q) => {
    const question = Test.Questions[q];

    question.result =
      10 -
      0.25 * Math.max(0, question.mistakes.taradud - 2) -
      0.25 * Math.max(0, question.mistakes.tanbeh - 1) -
      question.mistakes.harakah -
      question.mistakes.harf -
      1.5 * question.mistakes.kalemah -
      0.125 * question.mistakes.tajweed;
  });

  // Calculate overall result in the Test object
  var someOfQuestionMarks = 0;
  var numberOfQuestionMarks = 0;
  Object.keys(Test.Questions).forEach((q) => {
    someOfQuestionMarks += Test.Questions[q].result;
    numberOfQuestionMarks++;
  });
  Test.totalMark = (someOfQuestionMarks / numberOfQuestionMarks / 10) * 100;

  // Display results
  document.getElementById("percentage").value = Test.totalMark.toFixed(2) + "%";

  if (Test.totalMark >= 80.5) {
    document.getElementById("taqdeer").value = "ممتاز";
  } else if (Test.totalMark >= 70.5) {
    document.getElementById("taqdeer").value = "جيد جدا";
  } else if (Test.totalMark >= 60.5) {
    document.getElementById("taqdeer").value = "جيد";
  } else {
    document.getElementById("taqdeer").value = "راسب";
  }
}
