class LotteryWidget {
  constructor() {
    const widget = document.getElementById('lottery-widget');
    console.log(widget);
    this.name = widget.dataset.lotteryName;
    this.submitUrl = widget.dataset.submitUrl;
    this.pickUrl = widget.dataset.pickUrl;
  }

  getPreviousWinners() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        buildList(xmlHttp.responseText);
    };
    xmlHttp.open('GET', this.pickUrl, true);
    xmlHttp.send(null);
  }

  buildList(list) {
    try {
      const winners = JSON.parse(list);

      const historyList = document.getElementById('history');

      const list = document.createElement('div');
      list.setAttribute('class', 'lw-history-list');

      historyList.appendChild(list);

      for (const winner of winners) {
        const listItem = document.createElement('div');
        listItem.setAttribute('class', 'lw-history-list-item');

        listItem.innerText = winner.users.join(', ');

        if (winner.hasWinner === false) {
          listItem.innerText = 'No lucky contestants.';
        }

        list.appendChild(listItem);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const lottery = new LotteryWidget();

lottery.getPreviousWinners();
