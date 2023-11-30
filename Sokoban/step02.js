/** 4.맵 출력 */
function displayMapInfo(map) {
  console.log(`Stage 2`);
  console.log(``);
  console.log(`${map.mapToString}`);
  console.log(``);
}

/** 3.객체 데이터 저장*/
class Savemap {
  constructor(textArr) {
    this.map = textArr; // , ,#,#,#,#,#,#,#,#,#,#, , ,O, , ,#,#,#,#, , , , ,o, , , , ,#,#, ,O,o, ,P, ,o,O, ,#,#,#,#, , ,o, , ,#,#,#, ,#, , , ,O, , ,#, , ,#,#,#,#,#,#,#,#
    this.mapToString = '';
    this.hall = 0; //O	구멍(Hall)	=> 1
    this.ball = 0; //o	공(Ball)	=> 2
    this.player = 0; //P	플레이어(Player)	=> 3
    this.playerLoc = [0, 0];
    this.wall = 0; //#	벽(Wall)	=> 4
    this.width = 0;
    this.height = 0;
    // =	스테이지 구분자	값 없음
    this.processMap(); // *1)
  }

  processMap() {
    let maxRowLength = 0; //변수 초기화 추가
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.mapToString += this.map[i][j];
        switch (this.map[i][j]) {
          case 'O':
            this.hall++;
            break;
          case 'o':
            this.ball++;
            break;
          case 'P':
            this.player++;
            this.playerLoc = [i + 1, j + 1];
            break;
          case '#':
            this.wall++;
            break;
          case '=':
            // 스테이지 구분자의 경우 특별히 처리할 필요가 없다면 아무 작업도 필요 없음
            break;
        }
        // 최대 길이 갱신 // *2)
        maxRowLength = Math.max(maxRowLength, this.map[i].length);
      }
      this.mapToString += '\n';
    }
    this.width = maxRowLength;
    this.height = this.map.length;
  }
}

function gameOver() {
  console.log('💣Bye~');

  if (confirm('다시 하시겠습니까?')) {
    main();
  }
}

function readOrder(orderArr, maps) {
  const dir = ['w', 'a', 's', 'd', 'q'];
  const explan = ['위쪽', '왼쪽', '아래쪽', '오른쪽'];
  const loc = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const width = maps.width;
  const height = maps.height;

  for (let i = 0; i < orderArr.length; i++) {
    let x = maps.playerLoc[0];
    let y = maps.playerLoc[1];
    let order = orderArr[i];

    //게임 종료
    if (order == 'q') {
      return gameOver();
    }

    let idx = dir.indexOf(order);
    let nx = x + loc[idx][0];
    let ny = y + loc[idx][1];

    if (nx > 0 && nx <= height && ny > 0 && ny <= width) {
      if (maps.map[nx - 1][ny - 1] == 'O') {
        console.log(`${order} : 구멍에 빠졌습니다!`);
        return gameOver();
      }

      // 이동 중 벽이나 공등 다른 물체에 부딪히면
      if (maps.map[nx - 1][ny - 1] == '#' || maps.map[nx - 1][ny - 1] == 'o') {
        console.log(maps.mapToString);
        console.log(`${orderArr[i]} : (경고!) 해당 명령을 수행할 수 없습니다! 물체에 가로막혀 있습니다.`);
        console.log('');
        continue;
      } else {
        maps.map[x - 1][y - 1] = ' ';
        maps.map[nx - 1][ny - 1] = 'P';
        maps.playerLoc = [nx, ny];
        maps = new Savemap(maps.map); //3.객체 재생성;

        console.log(maps.mapToString);
        console.log(`${orderArr[i]} : ${explan[idx]}으로 이동합니다.`);
        console.log('');
      }
    } else {
      console.log(maps.mapToString);
      console.log(maps.map);
      console.log(`${orderArr[i]} : (경고!) 해당 명령을 수행할 수 없습니다! 해당 맵을 벗어납니다.`);
      continue;
    }
  }
  orderPrompt(maps);
}

/** 5.간단한 프롬프트 */
function orderPrompt(maps) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let order = prompt('SOKOBAN > \nw: 위쪽, a: 왼쪽, s: 아래쪽, d: 오른쪽, q: 프로그램 종료');

      if (order === null) {
        return;
      }

      if (order.length < 1) {
        alert('하나 이상의 문자를 입력해주세요 \nw: 위쪽, a: 왼쪽, s: 아래쪽, d: 오른쪽, q: 프로그램 종료');
        return orderPrompt(maps);
      }
      // *3)
      if (!/^[wasdqWASDQ]+$/.test(order)) {
        alert('(경고) 지원하지 않는 명령입니다!');
        return orderPrompt(maps);
      }
      orderArr = order.toLowerCase().split('');
      console.log(`SOKOBAN> ${order.toLowerCase()}`);

      resolve({ orderArr, maps });
    }, 500);
  }).then(({ orderArr, maps }) => readOrder(orderArr, maps));
}

/** 2.맵 객체 생성 */
function createObj(arrays) {
  for (let i = 0; i < arrays.length; i++) {
    // let maps = new Savemap(arrays[i], i + 1); //3.객체 생성
    let maps = new Savemap(arrays[i]); //3.객체 생성
    displayMapInfo(maps); //4. 출력
    orderPrompt(maps); //5.간단한 프롬프트
  }
}

/** 1.문자열 입력받기 */
function convertArray(inputValue) {
  let inputLine = inputValue.split('\n');
  stageArr = [];
  textArr = [];
  for (let i = 0; i < inputLine.length; i++) {
    if (inputLine[i].startsWith('=')) {
      continue;
    }
    if (inputLine[i].startsWith('Stage')) {
      if (textArr.length > 0) stageArr.push(textArr);
      textArr = [];
      continue;
    }
    let inputText = inputLine[i].split('');
    textArr.push(inputText);
  }
  stageArr.push(textArr);
  return stageArr;
}

let inputValue = `Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  # 
 ########`;

function main() {
  createObj(convertArray(inputValue));
}
main();

/**
 * 1) 클래스의 인스턴스(;클래스를 통해 생성된 객체) 메서드 (this.processMap())
 *    : 메서드 내에서 this 키워드를 사용하여 클래스의 속성들을 접근할 수 있다
 *    클래스의 인스턴스 메서드는 메서드 내에서 this로 해당 클래스의 인스턴스를 가리킨다
 *    ex) this.hall, this.ball, this.player,... 등의 속성은 processMap 메서드에서 this를 통해 접근할 수 있다.
 * 2) - Math.max 함수
 *    : 인자로 받은 값 중에서 최댓값을 반환하는 자바스크립트의 내장 함수
 *    ex) maxRowLength와 this.map[i].length 중에서 더 큰 값을 maxRowLength에 할당
 *        따라서 이 코드는 현재까지의 최대 길이를 계속해서 갱신하는 역할을 합니다.
 *        반복문이 끝날 때에는 이 maxRowLength에는 가장 긴 행의 길이가 저장되어 있게 됩니다.
 * 3) 정규식
 *    ^ : 문자열의 시작
 */
