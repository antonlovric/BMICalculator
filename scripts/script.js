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
document
  .querySelector(".calculateAgainButton")
  .addEventListener("click", function () {
    window.location.reload();
  });

function drawCircle() {
  if (!checkInputs()) {
    return;
  }
  document.querySelector(".buttonCalculate").disabled = true;
  document.getElementById("progressCircleContainer").style.visibility =
    "visible";
  document.getElementById("circle").scrollIntoView();
  let BMI = calculateBMI();
  var bar = new ProgressBar.Circle(progressCircleContainer, {
    color: "white",
    strokeWidth: 4,
    trailWidth: 1,
    easing: "easeInOut",
    duration: 1400,
    from: { color: "#ff0000", width: 1 },
    to: { color: "#00ff00", width: 4 },
    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);
      circle.path.setAttribute("stroke-width", state.width);
      var value = circle.value() * BMI;
      circle.setText(value.toFixed(2));
    },
  });
  bar.text.style.fontSize = "2rem";
  document.querySelector(".bmiContainer").scrollIntoView();
  bar.animate(1);
  setTimeout(function () {
    determineCategory(BMI);
    showCalculateAgainButton();
  }, 1400);
}

function showCalculateAgainButton() {
  document.querySelector(".calculateAgainButton").style.display = "block";
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
    "Your BMI is " + BMI + ". This means that you are underweight.";
  document.querySelector(".underweightFeedback").innerText = feedback;
  document.querySelector(".underweightHelp").style.display = "block";
  document.querySelector(".underweightHelp").scrollIntoView();
}

function showRegularweightData(BMI) {
  const feedback =
    "Your BMI is " +
    BMI +
    ". This means that your weight is fine, congratulations!";
  document.querySelector(".regularweightFeedback").innerText = feedback;
  document.querySelector(".regularweightHelp").style.display = "block";
  document.querySelector(".regularweightHelp").scrollIntoView();
}

function showOverweightData(BMI) {
  const feedback =
    "Your BMI is " + BMI + ". This means that you are overweight.";
  document.querySelector(".overweightFeedback").innerText = feedback;
  document.querySelector(".overweightHelp").style.display = "block";
  document.querySelector(".overweightHelp").scrollIntoView();
}

function showObeseData(BMI) {
  const feedback = "Your BMI is " + BMI + ". This means that you are obese.";
  document.querySelector(".obeseFeedback").innerText = feedback;
  document.querySelector(".obeseHelp").style.display = "block";
  document.querySelector(".obeseHelp").scrollIntoView();
}

function checkInputs() {
  let height = checkHeight();
  let weight = checkWeight();
  if (!height || !weight) {
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
