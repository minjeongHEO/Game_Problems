/*

플레이의 처음 자산 1000원

[처음에만]
1. 최초에만 게임의 타이틀표시
2. 덱 카드 섞기
  카드 덱에는 52장의 카드들
  각각의 카드는 숫자 값을 가지며 크기는 1 - 11
  1-10까지는 각 4장
  11은 12장

2. 플레이어 카드 아래에는 딜러의 카드도 무작위로 선택해서 출력

[승패결정]
플레이어의 카드 값 > 딜러의 카드 값 => 플레이어의 승리
플레이어의 카드 값 < 딜러의 카드 값 => 딜러의 승리
플레이어의 카드 값 == 딜러의 카드 값 => 무승부

[턴마다 반복]
배팅할 금액 100원단위로 입력(최대금액은 현재 보유한 전 재산)
카드 덱에서 무조건 한 장의 카드를 받고 이를 콘솔에 출력한다.
이후 플레이어는 반복적으로 카드를 받을지 여부를 결정할 수 있다.

[출력 화면]

게임 횟수
플레이어의 자산
플레이어가 뽑은 카드합 출력
 - 더 카드를 받을지 여부를 표시하고 플레이어의 입력을 받는다.
카드를 더 안 받기로 결정하면 딜러의 카드합과 승부결과를 출력해 준다.

[각 게임 종료시]
플레이어의 남은 자산
다시 게임하기를 선택
게임 종료를 선택할 경우 지금까지의 승무패 기록과 남은 재산을 보여주고 게임을 종료한다.

딜러가 뽑은 카드 누적 출력
게임의 승리자 출력

게임 지속여부 프롬프트

*/

/** 게임 지속여부 결정 */
// function continueGame() {
//   setTimeout(() => {
//     console.log('한 게임 더 하시겠습니까?');

//     const answer = prompt('한 게임 더 하시겠습니까? \n (Y / N)으로만 입력하세요.');

//     if (!(answer == 'Y' || answer == 'y' || answer == 'N' || answer == 'n' || answer == null)) {
//       console.log('잘못 입력하셨습니다.');
//       return continueGame();
//     }

//     if (answer == 'Y' || answer == 'y') {
//       let cards = randomCard();
//       compareCard(cards);
//     } else if (answer == 'N' || answer == 'n' || answer == null) {
//       console.log('게임을 종료합니다.');
//       console.log('플레이해주셔서 감사합니다.');
//       BLACKJACK = {
//         turn: 0,
//         player: [],
//         dealer: [],
//         win: 0,
//         lose: 0,
//         tie: 0,
//       };
//     }
//   }, 1000);
// }

// 카드 승패 비교
// if(딜러의승리){
//     console.log(`당신의 패배입니다. 현재 재산: 900`);

//     console.log(`한 게임 더 하시겠습니까? (Y / N) yes`);
// }
// else if(플레이어의 승리) {
//   console.log(`딜러: [10][10]`);
//     console.log(`딜러의 카드 합계는 20입니다.`);
//     console.log(`당신의 승리입니다. `);
//     console.log(`현재 남은 자산: 2700`);

//     console.log('한 게임 더 하시겠습니까? (Y / N) y');
//   }else{
//     console.log('카드를 더 받겠습니까? (Y / N)');
//   }

function moreCardAfter() {}

/** 카드 더 받을 지 여부 */
function moreCard(state) {
  // let BLACKJACK = state;
  console.log('4. moreCard() 더 카드를 받을지 여부');
  // console.log(state);

  let answer = prompt('카드를 더 받겠습니까? (Y / N)');
  if (!(answer == 'Y' || answer == 'y' || answer == 'N' || answer == 'n' || answer == null || answer == 'codesquad')) {
    console.log('잘못 입력하셨습니다.');
    return moreCard(state);
  }

  console.log(`카드를 더 받겠습니까? (Y / N) ${answer}`);

  let seperate = '';
  if (answer == 'Y' || answer == 'y') {
    seperate = 'player';
    return { state, seperate };
  } else if (answer == 'N' || answer == 'n') {
    seperate = 'dealer';
    return { state, seperate };
  } else if (answer == 'codesquad') {
    seperate = 'pass';
    return { state, seperate };
    //입력화면에서 'codesquad' 라고 입력할 경우 남아 있는 덱의 카드를 순서대로 6장 보여준다.
    // console.log('덱의 카드 [2][10][9][5][7]');
    // devideCard(state, 'pass');
  } else {
    return { state, seperate };
  }
}

function promptType() {
  // moreCard(); //카드를 더 받겠습니까?
  // moreGame(); //한 게임 더 하시겠습니까?
}

/** 카드 합계 */
function cardSum(state, seperate) {
  console.log('cardSum() 카드 합계');
  let sum = 0;
  let card = '';
  let BLACKJACK;
  if (seperate == 'dealer') {
    BLACKJACK = state.dealer;
    console.log(BLACKJACK);
  } else if (seperate == 'player') {
    BLACKJACK = state.player;
  }
  BLACKJACK.forEach((element) => {
    sum += element;
    card += `[${element.toString().padStart(2)}] `;
  });
  return [card, sum];
}

/** 카드 승패 비교 */
function compareCard(BLACKJACK, seperate) {
  console.log('5. compareCard() 카드 승패 비교');
  // console.log(BLACKJACK);

  // 플레이어가 카드를 더 안 받기로 결정하면 딜러의 카드합과 승부결과를 출력해 준다.
  if (seperate == 'dealer') {
    let [dealerCard, dealerSum] = cardSum(BLACKJACK, 'dealer');
    console.log(`딜러: ${dealerCard}`);
    console.log(`딜러의 카드 합계는 ${dealerSum}입니다.`);

    // [2. 플레이어의 승리]
    // 플레이어의 카드 합이 딜러보다 크다면 플레이어의 승리이다.
    // 딜러의 카드가 22 이상이어도 플레이어의 승리이다.
    let [playerCard, playerSum] = cardSum(BLACKJACK, 'player');
    if (playerSum > dealerSum || dealerSum >= 22) {
      if (playerSum == 21) {
        // 블랙잭(합이 21)으로 승리할 경우 베팅한 금액의 두 배를 돌려받는다.
        let bettingMoney = BLACKJACK.betting * 2;
        BLACKJACK.money += bettingMoney;
      } else {
        let bettingMoney = BLACKJACK.betting;
        BLACKJACK.money += bettingMoney;
      }
      BLACKJACK.win += 1;
      console.log('당신의 승리입니다.');
      console.log(`현재 남은 자산: ${BLACKJACK.money}`);
    }
  }

  //카드 승패 비교
  // 블랙잭(합이 21)으로 승리할 경우 베팅한 금액의 두 배를 돌려받는다.
  // 단 딜러가 21을 뽑을 경우도 딜러가 승리한다.
  // if (playerSum == 21) {
  //   //플레이어 승리
  // } else if (dealerSum == 21) {
  //   //딜러 승리
  // }

  // // [1. 딜러의 승리]
  // // if 플레이어가 받은 카드의 합이 22이상이면 무조건 플레이어의 패배(딜러의 승리)이다.
  // // 이 때 딜러는 카드를 받지 않는다.
  // // 딜러의 카드합이 더 큰 값이라면 딜러의 승리이다.
  // if (playerSum >= 22 || playerSum < dealerSum) {
  //   // 패배하면 베팅한 금액은 사라진다.
  //   let bettingMoney = BLACKJACK.betting;
  //   BLACKJACK.money -= bettingMoney;
  //   BLACKJACK.lose += 1;
  //   resolve(BLACKJACK, 'dealer'); //딜러승리

  //   // [3. 무승부]
  //   // 같은 값이라면 서로 비기게 된다.
  // } else if (playerSum == dealerSum) {
  //   BLACKJACK.tie += 1;
  //   resolve(BLACKJACK, 'tie'); //무승부
  // }

  // // console.log(`카드를 더 받겠습니까? (Y / N) => codesquad`);
  // // //입력화면에서 'codesquad' 라고 입력할 경우 남아 있는 덱의 카드를 순서대로 6장 보여준다.
  // // console.log(`덱의 카드 [2][10][9][5][7]`);

  // // if 딜러는 16 이하이면 무조건 카드를 받고, else      17 이상이면 카드를 받지 않는다.
  // if (dealerSum <= 16) {
  //   BLACKJACK = devideCard(BLACKJACK, 'dealer');
  // }
}
/** 카드 승패 비교 */
// function compareCard(state, playerSum, dealerSum) {
//   return new Promise((resolve, reject) => {
//     let BLACKJACK = state;

//     //카드 승패 비교
//     // 블랙잭(합이 21)으로 승리할 경우 베팅한 금액의 두 배를 돌려받는다.
//     // 단 딜러가 21을 뽑을 경우도 딜러가 승리한다.
//     if (playerSum == 21) {
//       //플레이어 승리
//     } else if (dealerSum == 21) {
//       //딜러 승리
//     }

//     // [1. 딜러의 승리]
//     // if 플레이어가 받은 카드의 합이 22이상이면 무조건 플레이어의 패배(딜러의 승리)이다.
//     // 이 때 딜러는 카드를 받지 않는다.
//     // 딜러의 카드합이 더 큰 값이라면 딜러의 승리이다.
//     if (playerSum >= 22 || playerSum < dealerSum) {
//       // 패배하면 베팅한 금액은 사라진다.
//       let bettingMoney = BLACKJACK.betting;
//       BLACKJACK.money -= bettingMoney;
//       BLACKJACK.lose += 1;
//       resolve(BLACKJACK, 'dealer'); //딜러승리

//       // [2. 플레이어의 승리]
//       // 플레이어의 카드 합이 딜러보다 크다면 플레이어의 승리이다.
//       // 딜러의 카드가 22 이상이어도 플레이어의 승리이다.
//     } else if (playerSum > dealerSum || dealerSum >= 22) {
//       if (playerSum == 21) {
//         //블랙잭(합이 21)으로 승리할 경우 베팅한 금액의 두 배를 돌려받는다.
//         let bettingMoney = BLACKJACK.betting * 2;
//         BLACKJACK.money += bettingMoney;
//       } else {
//         let bettingMoney = BLACKJACK.betting;
//         BLACKJACK.money += bettingMoney;
//       }
//       BLACKJACK.win += 1;
//       resolve(BLACKJACK, 'player'); //플레이어 승리

//       // [3. 무승부]
//       // 같은 값이라면 서로 비기게 된다.
//     } else if (playerSum == dealerSum) {
//       BLACKJACK.tie += 1;
//       resolve(BLACKJACK, 'tie'); //무승부
//     }

//     // return { BLACKJACK, playerSum, dealerSum };
//     // }

//     // console.log(`카드를 더 받겠습니까? (Y / N)`);
//     // console.log(`플레이어: [10][11]`);
//     // console.log(`총합: 21`);

//     // console.log(`당신의 패배입니다. 현재 재산: 900`);
//     // console.log(`한 게임 더 하시겠습니까? (Y / N) yes`);

//     // console.log(`딜러: [10][10]`);
//     // console.log(`딜러의 카드 합계는 20입니다.`);
//     // console.log(`당신의 승리입니다. `);
//     // console.log(`현재 남은 자산: 2700`);
//     // console.log('한 게임 더 하시겠습니까? (Y / N) y');

//     // console.log(`카드를 더 받겠습니까? (Y / N) => codesquad`);
//     // //입력화면에서 'codesquad' 라고 입력할 경우 남아 있는 덱의 카드를 순서대로 6장 보여준다.
//     // console.log(`덱의 카드 [2][10][9][5][7]`);

//     // if 딜러는 16 이하이면 무조건 카드를 받고, else      17 이상이면 카드를 받지 않는다.
//     if (dealerSum <= 16) {
//       BLACKJACK = devideCard(BLACKJACK, 'dealer');
//     }

//     // 플레이어가 카드를 더 이상 안 받기로 결정한 시점에서
//     // 딜러도 카드를 받는다.

//     // 한 게임이 종료되면 플레이어는 다시 게임을 할지 여부를 결정할 수 있다.
//     // let player = cards[0];

//     // let dealer = cards[1];

//     // BLACKJACK.player.push(player);
//     // BLACKJACK.dealer.push(dealer);
//   });
//   // .then((result) => printResult(result))
//   // .then(() => continueGame());
// }

/** 결과 출력 */
function printResult(state) {
  console.log('3. printResult() 결과 출력');
  // console.log(state);
  let BLACKJACK = state;
  BLACKJACK.turn += 1;
  const turn = BLACKJACK.turn;
  console.log(`=========== Game ${turn} ===========`);

  let [card, playerSum] = cardSum(state, 'player');
  console.log(`플레이어 : ${card}`);
  console.log(`총합 : ${playerSum}`);

  return BLACKJACK;
}

/** 결과 출력 */
function printResult(state) {
  console.log('3. printResult() 결과 출력');
  // console.log(state);
  state.turn += 1;
  console.log(`=========== Game ${state.turn} ===========`);

  let [card, playerSum] = cardSum(state, 'player');
  console.log(`플레이어 : ${card}`);
  console.log(`총합 : ${playerSum}`);

  return state;
}

/** 배팅금액 체크 */
function checkMoney(state) {
  console.log('1. checkMoney() 배팅금액 체크');
  let currentMoney = state.money;
  let bettingMoney = state.betting;

  if (currentMoney < bettingMoney) {
    console.log('배팅 금액은 현재 재산을 초과할 수 없습니다.');
    return betMoney(state);
  }

  // BLACKJACK.money -= bettingMoney;

  return state;
}

/** 카드 할당받기 */
function devideCard(state, who) {
  console.log('2. devideCard() 카드 할당받기');
  // console.log(state);
  const money = state.betting;
  let BLACKJACK = state;

  let seperate = who === undefined ? 'both' : who;

  if (seperate === 'player' || seperate === 'both') {
    BLACKJACK.player.push(BLACKJACK.cards.pop());
  }
  if (seperate === 'dealer' || seperate === 'both') {
    BLACKJACK.dealer.push(BLACKJACK.cards.pop());
  }

  return BLACKJACK;
}

/** 얼마를 배팅할지 */
function betMoney(state) {
  console.log('0. betMoney() 얼마를 배팅할지');
  return (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let money = prompt('얼마를 거시겠습니까? \n(100원 단위의 숫자만 입력하세요.)');
        //머니 유효성 체크 (숫자인지)
        if (isNaN(money)) {
          console.log('숫자만 입력하세요.');
          return betMoney(state);
        }
        //머니 유효성 체크 (100원 단위인지)
        if (parseInt(money) % 100 != 0) {
          console.log('금액은 100원 단위로만 입력하세요.');
          return betMoney(state);
        }

        console.log(`얼마를 거시겠습니까? ${money}`);
        state.betting = parseInt(money);
        resolve(state);
      }, 500);
    })
      .then((BLACKJACK) => checkMoney(BLACKJACK)) //배팅금액 체크
      .then((BLACKJACK) => devideCard(BLACKJACK, 'both')) //카드할당받기
      .then((BLACKJACK) => printResult(BLACKJACK)) //결과 출력
      .then((BLACKJACK) => moreCard(BLACKJACK)) //더 카드를 받을지 여부
      .then(({ state, seperate }) => compareCard(state, seperate)) //카드승패여부를 확인후
      // .then(({ BLACKJACK, playerSum, dealerSum }) => compareCard(BLACKJACK, playerSum, dealerSum)) //카드승패여부를 확인후
      // .then(({ BLACKJACK, type }) => promptType(BLACKJACK, type)) //더 카드를 받을지 여부를 표시
      .catch((error) => {
        console.error(error);
      })
  );
}

/** 카드 뽑기 */
function randomCard() {
  // 카드 덱에는 52장의 카드들
  // let mixCards = Array.from({ length: 51 });

  cards = [];
  // 1-10까지는 각 4장
  for (let i = 1; i < 11; i++) {
    for (let j = 0; j < 4; j++) {
      cards.push(i);
    }
  }
  // 11은 12장
  for (let j = 0; j < 12; j++) {
    cards.push(11);
  }

  //섞기
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function main() {
  BLACKJACK = {
    turn: 0,
    player: [],
    dealer: [],
    win: 0,
    lose: 0,
    tie: 0,
    money: 1000,
    betting: 0,
    cards: [],
  };
  console.log('BLACKJACK GAME🃏');
  console.log('🎭 간단 카드 게임을 시작합니다.');
  console.log('🤑현재 재산 : 1000'); //BLACKJACK.money

  BLACKJACK.cards = randomCard();
  // BLACKJACK.cards = JSON.parse(JSON.stringify(randomCard()));

  betMoney(BLACKJACK);
}

main();
