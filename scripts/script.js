window.onload = function () {
  let form = document.querySelector(".form");
  function disableRefresh(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", disableRefresh);
};

document
  .querySelector(".buttonCalculate")
  .addEventListener("click", drawCircle);

let bar;

function drawCircle() {
  if (!checkInputs()) {
    resetButtonEvents();
    return;
  }
  console.log("uso");
  document.querySelector(".buttonCalculate").disabled = true;
  document.getElementById("progressCircleContainer").style.visibility =
    "visible";
  document.getElementById("circle").scrollIntoView();
  let BMI = calculateBMI();
  let props = determineColor(BMI);
  bar = new ProgressBar.Circle(progressCircleContainer, {
    color: "white",
    strokeWidth: 4,
    trailWidth: 1,
    easing: "easeInOut",
    duration: 1400,
    from: { color: "#ff0000", width: 1 },
    to: props,
    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);
      circle.path.setAttribute("stroke-width", state.width);
      var value = circle.value() * BMI;
      circle.setText(value.toFixed(2));
    },
  });
  bar.text.style.fontSize = "2rem";
  document.querySelector(".bmiContainer").scrollIntoView();
  bar.animate(1, [], function () {
    determineCategory(BMI);
    allowNewCalculation();
    document.querySelector(".buttonCalculate").disabled = false;
  });
}

function resetButtonEvents() {
  document
    .querySelector(".buttonCalculate")
    .removeEventListener("click", removeCircle);
  document
    .querySelector(".buttonCalculate")
    .addEventListener("click", drawCircle);
}

function allowNewCalculation() {
  document
    .querySelector(".buttonCalculate")
    .removeEventListener("click", drawCircle);
  document
    .querySelector(".buttonCalculate")
    .addEventListener("click", removeCircle);
}

function removeCircle() {
  bar.destroy();
  hideFeedback();
  resetButtonEvents();
  drawCircle();
}

function hideFeedback() {
  const feedbackParagraphs = document.querySelectorAll(".feedbackParagraph");
  const helpLists = document.querySelectorAll(".helpList");

  feedbackParagraphs.forEach((paragraph) => {
    paragraph.style.display = "none";
  });

  helpLists.forEach((list) => {
    list.style.display = "none";
  });
}

function determineColor(BMI) {
  const green = "#00ff00";
  const red = "#DC143C";
  const yellow = "#EED202";
  let props = { color: green, width: 4 };
  if (BMI <= 18.5) {
    props.color = yellow;
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    props.color = green;
  } else if (BMI >= 25 && BMI <= 29.9) {
    props.color = yellow;
  } else {
    props.color = red;
  }
  return props;
}

function calculateBMI() {
  let weight = document.querySelector("#weight").value;
  let height = document.querySelector("#height").value;
  let BMI = (weight / height ** 2) * 10000;
  return BMI.toFixed(2);
}

function determineCategory(BMI) {
  if (BMI <= 18.5) {
    showUnderweightData(BMI);
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    showRegularweightData(BMI);
  } else if (BMI >= 25 && BMI <= 29.9) {
    showOverweightData(BMI);
  } else {
    showObeseData(BMI);
  }
}

function showUnderweightData(BMI) {
  const feedback =
    "Your BMI is " +
    BMI +
    '. This means that you are <span class = "resultYellow">underweight</span>.';
  document.querySelector(".underweightFeedback").innerHTML = feedback;
  document.querySelector(".underweightFeedback").style.display = "block";
  document.querySelector(".underweightHelp").style.display = "block";

  document.querySelector(".underweightHelp").scrollIntoView();
}

function showRegularweightData(BMI) {
  const feedback =
    "Your BMI is " +
    BMI +
    '. This means that your weight is <span class = "resultGreen">fine</span>, congratulations!';
  document.querySelector(".regularweightFeedback").innerHTML = feedback;
  document.querySelector(".regularweightFeedback").style.display = "block";
  document.querySelector(".regularweightHelp").style.display = "block";
  document.querySelector(".regularweightHelp").scrollIntoView();
}

function showOverweightData(BMI) {
  const feedback =
    "Your BMI is " +
    BMI +
    '. This means that you are <span class = "resultYellow">overweight</span>.';
  document.querySelector(".overweightFeedback").innerHTML = feedback;
  document.querySelector(".overweightFeedback").style.display = "block";
  document.querySelector(".overweightHelp").style.display = "block";
  document.querySelector(".overweightHelp").scrollIntoView();
}

function showObeseData(BMI) {
  const feedback =
    "Your BMI is " +
    BMI +
    '. This means that you are <span class = "resultRed">obese</span>.';
  document.querySelector(".obeseFeedback").innerHTML = feedback;
  document.querySelector(".obeseFeedback").style.display = "block";
  document.querySelector(".obeseHelp").style.display = "block";
  document.querySelector(".obeseHelp").scrollIntoView();
}

function checkInputs() {
  let height = checkHeight();
  let weight = checkWeight();
  if (!height || !weight) {
    document.getElementById("progressCircleContainer").style.display = "none";
    return false;
  }

  document.getElementById("progressCircleContainer").style.display = "flex";
  return true;
}

function checkHeight() {
  let height = document.getElementById("height").value;
  if (height == "" || height <= 0) {
    document.getElementById("inputErrorHeight").style.visibility = "visible";
    document.getElementById("height").style.border = "1px solid red";
    return false;
  }
  document.getElementById("inputErrorHeight").style.visibility = "hidden";
  document.getElementById("height").style.border = "1px solid black";
  return true;
}

function checkWeight() {
  let weight = document.getElementById("weight").value;
  if (weight == "" || weight <= 0) {
    document.getElementById("inputErrorWeight").style.visibility = "visible";
    document.getElementById("weight").style.border = "1px solid red";
    return false;
  }
  document.getElementById("weight").style.border = "1px solid black";
  document.getElementById("inputErrorWeight").style.visibility = "hidden";
  return true;
}
