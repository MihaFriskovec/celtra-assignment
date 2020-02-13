(function() {
  function appendCss() {
    var cssLink = document.createElement("link");
    cssLink.href = "./index.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    var head = document.getElementsByTagName("head")[0];
    head.append(cssLink);
  }

  function buildBox() {
    var boxDiv = document.createElement("div");
    boxDiv.setAttribute("class", "sa-box");
    boxDiv.setAttribute("style", "left: 0");
    boxDiv.setAttribute("id", "box");

    return boxDiv;
  }

  var interval;
  var speed = 10;
  var slowMotion = -1;
  var direction = 1;

  function animation() {
    var elem = document.getElementById("box");

    interval = setInterval(frame, speed);
    var pos = parseInt(elem.style.left); // Parse int to remove px

    function frame() {
      if (pos === 700) {
        direction = -1;
      } else if (pos === 0) {
        direction = 1;
      }

      pos = pos + 1 * direction;
      elem.style.left = pos + "px";
    }
  }

  function changeSpeed() {
    slowMotion = slowMotion * -1;
    speed = slowMotion === -1 ? 5 : 15;
    clearInterval(interval);

    animation();
  }

  function buildButton() {
    var buttonWrapper = document.createElement("div");
    buttonWrapper.setAttribute("class", "sa-button-wrap");

    var button = document.createElement("button");
    button.innerText = "Submit";
    button.setAttribute("class", "sa-button");
    button.onmousedown = changeSpeed;
    button.onmouseup = changeSpeed;

    buttonWrapper.appendChild(button);

    return buttonWrapper;
  }

  function main() {
    appendCss();

    var container = document.getElementById("container");
    container.appendChild(buildBox());
    container.appendChild(buildButton());

    animation();
  }

  main();
})();
