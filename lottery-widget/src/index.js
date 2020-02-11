(function() {
  var submitUrl = encodeURI("http://localhost:8081/api/submit");
  var drawUrl = encodeURI("http://localhost:8081/api/draw");

  var placeholder = document.getElementById("lottery-widget");
  if (!placeholder) throw new Error("Placeholder not found");

  main();

  function buildList(data) {
    try {
      var winners = JSON.parse(data).data;

      console.log(winners);

      var historyList = document.getElementById("history");

      var list = document.createElement("div");
      list.setAttribute("class", "lw-history-list");

      historyList.appendChild(list);

      for (var i = 0; i < winners.length; i++) {
        var winner = winners[i];

        var listItem = document.createElement("div");
        listItem.setAttribute("class", "lw-history-list-item");

        var itemP = document.createElement("p");
        itemP.setAttribute("class", "lw-history-text");

        itemP.innerText = winner.users.join(", ");

        var winningNumberSpan = document.createElement("span");
        winningNumberSpan.setAttribute("class", "lw-list-number");
        winningNumberSpan.innerText = "# " + Number(winner.winningNumber);

        itemP.appendChild(winningNumberSpan);

        if (winner.hasWinner === false) {
          itemP.innerText = "No lucky contestants.";
        }

        listItem.appendChild(itemP);

        list.appendChild(listItem);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function submit() {
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
      }
    };
    xmlHttp.open("POST", submitUrl, true);
    xmlHttp.send({ user: name, number: number });
  }

  function buildSceleton() {
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "lw-main");

    var countdownDiv = document.createElement("div");
    countdownDiv.setAttribute("class", "lw-countdown");
    countdownDiv.setAttribute("id", "timer");
    countdownDiv.innerHTML = "New winner in ";

    mainDiv.appendChild(countdownDiv);

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "lw-content");

    mainDiv.appendChild(contentDiv);

    var historyDiv = document.createElement("div");
    historyDiv.setAttribute("class", "lw-history");
    historyDiv.setAttribute("id", "history");

    contentDiv.appendChild(historyDiv);

    var formDiv = document.createElement("div");
    formDiv.setAttribute("class", "lw-form");

    contentDiv.appendChild(formDiv);

    var inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "lw-input-group");

    formDiv.appendChild(inputDiv);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "lw-input-group");

    formDiv.appendChild(buttonDiv);

    var nameInputItem = document.createElement("div");
    nameInputItem.setAttribute("class", "lw-input-item");

    inputDiv.appendChild(nameInputItem);

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("class", "lw-input");

    nameInputItem.appendChild(nameInput);

    var numberInput = document.createElement("input");
    numberInput.setAttribute("type", "text");
    numberInput.setAttribute("id", "number");
    numberInput.setAttribute("placeholder", "number");
    numberInput.setAttribute("class", "lw-input");

    var numberInputItem = document.createElement("div");
    numberInputItem.setAttribute("class", "lw-input-item");

    numberInputItem.appendChild(numberInput);

    inputDiv.appendChild(numberInputItem);

    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute("id", "submit");
    submitButton.onclick = submit;
    submitButton.setAttribute("class", "lw-button submit");

    formDiv.appendChild(submitButton);

    return mainDiv;
  }

  function render() {
    var content = buildSceleton();
    placeholder.appendChild(content);
  }

  function startTime(timeout) {
    var seconds = Math.round(Math.floor(timeout / 1000)) + 1;

    var interval = setInterval(function() {
      seconds--;
      if (seconds <= 0) {
        clearInterval(interval);
      }

      document.getElementById("timer").innerHTML = "New winner in " + seconds;
    }, 1000);

    setTimeout(function() {
      draw();
    }, timeout);
  }

  function calculateNextTick(data) {
    var nextTick = JSON.parse(data).nextTick;
    var currentTime = new Date().getTime();

    var timeout = nextTick - currentTime + 200; // Add 200ms wait before making request

    startTime(timeout);
  }

  function draw() {
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    //   if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    //     buildList(xmlHttp.responseText);
    //     calculateNextTick(xmlHttp.responseText);
    //   }
    // };
    // xmlHttp.open("GET", drawUrl, true);
    // xmlHttp.send(null);
    buildList(
      JSON.stringify({
        nextTick: new Date().getTime() + 2000,
        data: [
          { users: ["Miha"], hasWinner: true, winningNumber: 10 },
          { users: [], hasWinner: false, winningNumber: 10 }
        ]
      })
    );
    calculateNextTick(
      JSON.stringify({
        nextTick: new Date().getTime() + 200000,
        data: [
          { users: ["Miha"], hasWinner: true, winningNumber: 10 },
          { users: [], hasWinner: false, winningNumber: 10 }
        ]
      })
    );
  }

  function main() {
    /** Append CSS **/
    var cssLink = document.createElement("link");
    cssLink.href = "../../lottery-widget/src/index.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    var head = document.getElementsByTagName("head")[0];
    head.append(cssLink);

    /** Render **/
    render();

    /** Initial load **/
    draw();
  }
})();
