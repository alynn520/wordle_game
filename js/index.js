const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:yellow; width:200px; height: 50px;";
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 5) gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnter = () => {
    let correct_count = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const guess_letter = block.innerText;
      const answer_letter = answer[i];
      if (guess_letter === answer_letter) {
        correct_count += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(guess_letter))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }

    if (correct_count === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnter();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const starting_time = new Date();

    function setTime() {
      const current_time = new Date();
      const gone_time = new Date(current_time - starting_time);
      const 분 = gone_time.getMinutes().toString().padStart(2, "0");
      const 초 = gone_time.getSeconds().toString().padStart(2, "0");

      const timerDiv = document.querySelector("#timer");
      timerDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
