(function() {
  var submitUrl = encodeURI("http://localhost:8081/api/submit");
  var drawUrl = encodeURI("http://localhost:8081/api/draw");

  var placeholder = document.getElementById("lottery-widget");
  if (!placeholder) throw new Error("Placeholder not found");

  main();

  function buildList() {
    try {
      var winners = JSON.parse(list);

      var historyList = document.getElementById("history");

      var list = document.createElement("div");
      list.setAttribute("class", "lw-history-list");

      historyList.appendChild(list);

      for (var i = 0; i < winners.length; i++) {
        var winner = winners[i];

        var listItem = document.createElement("div");
        listItem.setAttribute("class", "lw-history-list-item");

        listItem.innerText = winner.users.join(", ");

        if (winner.hasWinner === false) {
          listItem.innerText = "No lucky contestants.";
        }

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
    xmlHttp.send(null);
  }

  function buildSceleton() {
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "lw-main");

    var countdownDiv = document.createElement("div");
    countdownDiv.setAttribute("class", "lw-countdown");
    countdownDiv.innerHTML = "New winner in ";

    mainDiv.appendChild(countdownDiv);

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "lw-content");

    mainDiv.appendChild(contentDiv);

    var historyDiv = document.createElement("div");
    historyDiv.setAttribute("class", "lw-history");

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

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("class", "lw-input");

    inputDiv.appendChild(nameInput);

    var numberInput = document.createElement("input");
    numberInput.setAttribute("type", "text");
    numberInput.setAttribute("id", "number");
    numberInput.setAttribute("placeholder", "number");
    numberInput.setAttribute("class", "lw-input");

    inputDiv.appendChild(numberInput);

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

  function calculateNextTick(data) {}

  function draw() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        buildList(xmlHttp.responseText);
        calculateNextTick(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", drawUrl, true);
    xmlHttp.send(null);
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
