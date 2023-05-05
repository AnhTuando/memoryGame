let timeValue = document.querySelector(".time-value");
let readyBtn = document.querySelector(".rd-btn");
let readyBtnBox = document.querySelector(".ready-box");
let outOfTimeBox = document.querySelector(".out-of-time-box");
let scoreBox = document.querySelector(".user-score-box");
let backBtn = document.querySelector(".back-btn");
let remain = document.querySelector(".remain-value");
let score = document.querySelector(".score-value");
let userScoreValue = document.querySelector(".user-score-value");
// Render Game
// hàm để tạo danh sách ngẫu nhiên các chỉ số từ 0 đến n-1
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
function renderGame() {
  let container = document.querySelector(".wrap-box");
  let elements = container.children;
  let indexList = shuffleArray([...Array(elements.length).keys()]); // tạo một danh sách ngẫu nhiên các chỉ số từ 0 đến 15

  // sử dụng thuộc tính "order" của CSS để đặt thứ tự hiển thị của các thẻ div con
  for (let i = 0; i < indexList.length; i++) {
    elements[indexList[i]].style.order = i + 1;
  }
}
window.onload = function () {
  renderGame();
};

// Count Time
function countTime() {
  let i = 30;
  let interval = setInterval(function () {
    i--;
    timeValue.innerHTML = `${i}`;
    // show out of time
    if (i == 0) {
      outOfTimeBox.classList.remove("none");
      clearInterval(interval);
    }
  }, 1000);

  restartBtn.onclick = function () {
    clearInterval(interval);
    readyBtnBox.classList.remove("none");
    timeValue.innerHTML = `${30}`;
  };
}
// restart click
let restartBtn = document.querySelector(".restart-btn");

restartBtn.onclick = function () {
  readyBtnBox.classList.remove("none");
};

// readyBtb click
readyBtn.onclick = function () {
  readyBtnBox.classList.add("none");
  let boxes = document.querySelectorAll(".box");
  // convert obj to arr
  var newArr = Array.from(boxes);
  newArr = [...boxes];
  newArr.forEach(function (box) {
    box.style.opacity = 1;
    box.children[0].style.opacity = 0;
  });
  score.innerHTML = 0;
  userScoreValue.innerHTML = 0;
  remain.innerHTML = 0;
  countTime();
};
// out of time onclick
outOfTimeBox.onclick = function () {
  outOfTimeBox.classList.add("none");
  scoreBox.classList.remove("none");
  userScoreValue.innerHTML = `${score.textContent}`;
};
// backBtn click
backBtn.onclick = function () {
  scoreBox.classList.add("none");
};

window.onload = function () {
  renderGame();
};
// Play
function handlePlay() {
  let boxes = document.querySelectorAll(".box");
  // convert obj to arr
  var newArr = Array.from(boxes);
  newArr = [...boxes];
  let i = 0;
  let valueArr = [];
  let valueBox = [];
  let valueText = [];
  let remainValue = 7;
  let scoreValue = 1;
  newArr.forEach(function (box) {
    // Each Box onclick
    box.addEventListener("click", function () {
      valueBox[i] = box;
      valueArr[i] = parseInt(box.textContent);
      valueText[i] = box.children[0];

      box.children[0].style.opacity = 1;
      i++;
      if (i == 2) {
        console.log(valueBox[0], valueBox[1]);
        console.log(valueArr[0], valueArr[1]);
        console.log(valueText[0], valueText[1]);
        if (valueBox[0] == valueBox[1]) {
          console.log(true);
          valueBox[0].children[0].style.opacity = 0;
        } else {
          if (valueArr[0] == valueArr[1]) {
            // Matched
            setTimeout(function () {
              valueBox[0].textContent = "";
              valueBox[1].textContent = "null";
            }, 200);
            valueBox[0].style.opacity = 0;
            valueBox[1].style.opacity = 0;
            remain.innerHTML = `${remainValue}`;
            remainValue--;
            score.innerHTML = `${scoreValue}`;
            if (scoreValue == 8) {
              scoreBox.classList.remove("none");
              userScoreValue.innerHTML = `${scoreValue}`;
              backBtn.onclick = function () {
                scoreBox.classList.add("none");
              };
            }
            scoreValue++;

            // Failed
          } else {
            setTimeout(function () {
              valueText[0].style.opacity = 0;
              valueText[1].style.opacity = 0;
            }, 200);
          }
        }
        i = 0;
        valueArr = [];
        valueBox = [];
      }
    });
  });
}
handlePlay();
// attetion onclick
let attetionBtn = document.querySelector(".attention-btn");
attetionBtn.onclick = function () {
  attetionBtn.parentElement.classList.add("none");
};
