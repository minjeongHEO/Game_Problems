/** 카드 더 받을 지 여부 */
function moreCard(state) {
  new Promise((resolve, reject) => {
    // console.log('4. moreCard() 더 카드를 받을지 여부');

    let answer = prompt('카드를 더 받겠습니까? (Y / N)');
    console.log(`카드를 더 받겠습니까? (Y / N) ${answer}`);
    if (!(answer == 'Y' || answer == 'y' || answer == 'N' || answer == 'n' || answer == null || answer == 'codesquad')) {
      console.log('잘못 입력하셨습니다.');
      // resolve(moreCard(state));
      reject(new Error('retry'));
    }

    let seperate = '';
    let [dealerCard, dealerSum] = cardSum(state, 'dealer');

    //받음
    if (answer == 'Y' || answer == 'y') {
      if (dealerSum <= 16) {
        seperate = 'both';
      } else if (dealerSum >= 17) {
        seperate = 'player';
      }

      //안받음
    } else if (answer == 'N' || answer == 'n') {
      if (dealerSum <= 16) {
        seperate = 'dealer';
      } else if (dealerSum >= 17) {
        seperate = '';
      }

      //치트
    } else if (answer == 'codesquad') {
      seperate = 'codesquad';
    }

    resolve({ state, seperate });
  })
    .then(({ state, seperate }) => moreCardAfter(state, seperate)) //카드승패여부를 확인
    .catch((error) => {
      if (error.message === 'retry') {
        return moreCard(state); // 재시도
      }
      throw error; // 다른 에러는 다시 던지기
    });
}

/** 카드 합계 */
function cardSum(state, seperate) {
  // console.log('cardSum() 카드 합계');
  let sum = 0;
  let card = '';
  let BLACKJACK;
  if (seperate == 'dealer') {
    BLACKJACK = state.dealer;
  } else if (seperate == 'player') {
    BLACKJACK = state.player;
  } else if (seperate == 'codesquad') {
    BLACKJACK = state.cards;
  }
  BLACKJACK.forEach((element) => {
    sum += element;
    card += `[${element.toString().padStart(2)}] `;
  });
  return [card, sum];
}

/** 게임 종료 */
function finishGame(state) {
  console.log(`${state.win}승 ${state.tie}무 ${state.lose}패로 🤑${state.money}원의 자산이 남았습니다.`);
  console.log(`플레이 해 주셔서 감사합니다.`);

  // 각 게임이 종료되었을 경우 다시 게임하기를 선택할 수 있다.
  setTimeout(() => {
    if (confirm('다시 게임하시겠습니까?')) {
      main();
    }
  }, 1000);
}

/** 한 게임 더 */
function moreGame(state) {
  let answer = prompt('한 게임 더 하시겠습니까? (Y / N)');
  console.log(`한 게임 더 하시겠습니까? (Y / N) ${answer}`);

  if (!(answer == 'Y' || answer == 'y' || answer == 'N' || answer == 'n' || answer == null)) {
    console.log('잘못 입력하셨습니다.');
    return moreGame(state);
  }

  // 게임 더
  if (answer == 'Y' || answer == 'y') {
    state.turn += 1;
    // 플레이어의 자산이 0이 되었다면 강제로 게임이 종료된다.
    if (state.money == 0) {
      return finishGame(state);
    } else {
      // 덱의 카드가 10장 이하로 남아 있을 경우
      if (state.cards.length <= 10) {
        state.cards = randomCard();
      }
      return betMoney(state);
    }

    //게임 끝
  } else if (answer == 'N' || answer == 'n' || answer == null) {
    return finishGame(state);
  }
}

/** 승패 여부 */
function winLose(state, playerSum, dealerSum) {
  // console.log('6. winLose() 승패 비교');

  // [1. 나의 승리 (플레이어 승리)]
  if (playerSum > dealerSum || dealerSum >= 22) {
    if (playerSum == 21) {
      // 블랙잭(합이 21)으로 승리할 경우 베팅한 금액의 두 배를 돌려받는다.
      let bettingMoney = state.betting * 2;
      state.money += bettingMoney;
    } else {
      let bettingMoney = state.betting;
      state.money += bettingMoney;
    }
    state.win += 1;
    state.betting = 0;

    console.log('🎉당신의 승리입니다.');
    console.log(`🤑현재 남은 자산: ${state.money}`);

    // [2. 나의 패배 (딜러 승리)]
  } else if (dealerSum > playerSum || playerSum >= 22 || dealerSum == 21) {
    state.lose += 1;
    state.money -= state.betting;
    state.betting = 0;
    console.log(`💸당신의 패배입니다. 🤑현재 재산: ${state.money}`);

    // [3. 무승부]
  } else if (playerSum == dealerSum) {
    state.tie += 1;
    console.log(`🧊비겼습니다. 🤑현재 재산: ${state.money}`);
  }

  if (state.money >= 100) {
    moreGame(state);
  } else {
    finishGame(state);
  }
}

/** 카드 받기 후 */
function moreCardAfter(BLACKJACK, seperate) {
  // console.log('5. moreCardAfter() 카드 받기 후');
  // console.log(BLACKJACK);

  // 플레이어가 카드를 더 안 받기로 결정하면 딜러의 카드합과 승부결과를 출력해 준다.
  if (seperate == 'dealer' || seperate == '') {
    if (seperate == 'dealer') {
      BLACKJACK = devideCard(BLACKJACK, seperate);
    }
    let [dealerCard, dealerSum] = cardSum(BLACKJACK, 'dealer');
    console.log(`딜러: ${dealerCard}`);
    console.log(`딜러의 카드 합계는 ${dealerSum}입니다.`);

    let [playerCard, playerSum] = cardSum(BLACKJACK, 'player');
    winLose(BLACKJACK, playerSum, dealerSum);

    //입력화면에서 'codesquad' 라고 입력할 경우 남아 있는 덱의 카드를 순서대로 6장 보여준다.
  } else if (seperate == 'codesquad') {
    let [deckCard, deckSum] = cardSum(BLACKJACK, 'codesquad');
    console.log(`덱의 카드 ${deckCard}`);
    return moreCard(BLACKJACK);

    // 카드를 더 받기로 결정
  } else if (seperate == 'both' || seperate == 'player') {
    devideCard(BLACKJACK, seperate);
    printResult(BLACKJACK);
    let [playerCard, playerSum] = cardSum(BLACKJACK, 'player');
    let [dealerCard, dealerSum] = cardSum(BLACKJACK, 'dealer');
    winLose(BLACKJACK, playerSum, dealerSum);
  }
}

/** 결과 출력 */
function printResult(state) {
  // console.log('3. printResult() 결과 출력');
  // console.log(state);
  // console.log(`=========== Game ${state.turn} ===========`);

  let [card, playerSum] = cardSum(state, 'player');
  console.log(`플레이어 : ${card}`);
  console.log(`총합 : ${playerSum}`);

  return state;
}

/** 배팅금액 체크 */
function checkMoney(state) {
  // console.log('1. checkMoney() 배팅금액 체크');
  let currentMoney = state.money;
  let bettingMoney = state.betting;

  if (currentMoney < bettingMoney) {
    console.log('배팅 금액은 현재 재산을 초과할 수 없습니다.');
    return betMoney(state);
  }

  return state;
}

/** 카드 할당받기 */
function devideCard(state, who) {
  // console.log('2. devideCard() 카드 할당받기');
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
  // console.log('0. betMoney() 얼마를 배팅할지');
  return new Promise((resolve, reject) => {
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

      console.log(`=========== Game ${state.turn} ===========`);

      state.betting = parseInt(money);
      resolve(state);
    }, 500);
  })
    .then((BLACKJACK) => checkMoney(BLACKJACK)) //배팅금액 체크
    .then((BLACKJACK) => devideCard(BLACKJACK, 'both')) //카드할당받기
    .then((BLACKJACK) => printResult(BLACKJACK)) //결과 출력
    .then((BLACKJACK) => moreCard(BLACKJACK)) //더 카드를 받을지 여부
    .catch((error) => {
      console.error(error);
    });
}

/** 카드 뽑기 */
function randomCard() {
  // 카드 덱에는 52장의 카드들
  // let mixCards = Array.from({ length: 51 });

  let cards = [];
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
    turn: 1,
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
