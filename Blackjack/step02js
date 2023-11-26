/*
카드 덱에는 무한하게 많은 카드들
각각의 카드는 숫자 값을 가지며 크기는 1 - 11

[처음에만]
1. 플레이어의 카드를 무작위로 선택해서 출력
2. 플레이어 카드 아래에는 딜러의 카드도 무작위로 선택해서 출력

[승패결정]
플레이어의 카드 값 > 딜러의 카드 값 => 플레이어의 승리
플레이어의 카드 값 < 딜러의 카드 값 => 딜러의 승리
플레이어의 카드 값 == 딜러의 카드 값 => 무승부

[턴마다 반복]
이후 플레이어는 반복적으로 게임 중단 여부를 결정할 수 있다.

[출력 화면]
최초에만 게임의 타이틀표시

게임 횟수
플레이어가 뽑은 카드 누적 출력
딜러가 뽑은 카드 누적 출력
게임의 승리자 출력

게임 지속여부 프롬프트

*/

BLACKJACK = {
  turn: 0,
  player: [],
  dealer: [],
  win: 0,
  lose: 0,
  tie: 0,
};

/** 게임 지속여부 결정 */
function continueGame() {
  setTimeout(() => {
    console.log('한 게임 더 하시겠습니까?');

    const answer = prompt('한 게임 더 하시겠습니까? \n (Y / N)으로만 입력하세요.');

    if (!(answer == 'Y' || answer == 'y' || answer == 'N' || answer == 'n' || answer == null)) {
      console.log('잘못 입력하셨습니다.');
      return continueGame();
    }

    if (answer == 'Y' || answer == 'y') {
      let cards = randomCard();
      compareCard(cards);
    } else if (answer == 'N' || answer == 'n' || answer == null) {
      console.log('게임을 종료합니다.');
      console.log('플레이해주셔서 감사합니다.');
      BLACKJACK = {
        turn: 0,
        player: [],
        dealer: [],
        win: 0,
        lose: 0,
        tie: 0,
      };
    }
  }, 1000);
}

/** 결과 출력 */
function printResult(result) {
  const turn = BLACKJACK.turn;
  let card = '';
  console.log(`=========== Game ${turn + 1} ===========`);
  BLACKJACK.turn += 1;

  BLACKJACK.player.forEach((element) => {
    card += ` [${element.toString().padStart(2)}]`;
  });
  console.log(`You   :${card}`);

  card = '';
  BLACKJACK.dealer.forEach((element) => {
    card += ` [${element.toString().padStart(2)}]`;
  });
  console.log(`Dealer:${card}`);

  if (result == 'player') {
    console.log('🎉당신이 이겼습니다.');
  } else if (result == 'dealer') {
    console.log('💸딜러가 이겼습니다.');
  } else if (result == 'tie') {
    console.log('🧊비겼습니다.');
  }

  BLACKJACK.tie > 0;
  console.log(`현재 전적: ${BLACKJACK.win}승 ${BLACKJACK.tie > 0 ? BLACKJACK.tie + '무 ' : ''}${BLACKJACK.lose}패`);
}

/** 카드 승패 비교 */
function compareCard(cards) {
  return new Promise((resolve, reject) => {
    let player = cards[0];
    let dealer = cards[1];

    BLACKJACK.player.push(player);
    BLACKJACK.dealer.push(dealer);

    if (player > dealer) {
      BLACKJACK.win += 1;
      resolve('player');
    } else if (player < dealer) {
      BLACKJACK.lose += 1;
      resolve('dealer');
    } else {
      BLACKJACK.tie += 1;
      resolve('tie');
    }
  })
    .then((result) => printResult(result))
    .then(() => continueGame());
}

/** 카드 뽑기 */
function randomCard() {
  // 카드의 크기는 1 - 11
  let player;
  let dealer;
  for (let index = 0; index < 2; index++) {
    let card = Math.floor(Math.random() * 11) + 1;
    if (index == 0) {
      // player.push(card);
      player = card;
    } else {
      // dealer.push(card);
      dealer = card;
    }
  }
  return [player, dealer];
}

function main() {
  console.log('BLACKJACK GAME🃏');
  console.log('🎭 간단 카드 게임을 시작합니다.');

  let cards = randomCard();

  compareCard(cards);
}

main();
