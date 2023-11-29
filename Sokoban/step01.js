/** 맵 출력 */
function displayMapInfo(map) {
  console.log(`Stage ${map.stageNum}`);
  console.log(``);
  console.log(`${map.mapToString}`);
  console.log(``);
  console.log(`가로크기: ${map.width}`);
  console.log(`세로크기: ${map.height}`);
  console.log(`구멍의 수: ${map.hall}`);
  console.log(`공의 수: ${map.ball}`);
  console.log(`플레이어 위치: ${map.playerLoc[0]}행 ${map.playerLoc[1]}열`);
  console.log(``);
}

// (2) 데이터 저장하기
// 객체에는 스테이지 정보 및 원래 지도 정보가 들어있어야 한다.
// 위 값을 읽고 저장할 수 있는 적당한 객체 (혹은 클래스)를 생성하고 문자열로부터 읽은 값을 변환해서 저장한다.
class Savemap {
  constructor(textArr, stageNum) {
    this.stageNum = stageNum;
    this.map = textArr;
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
            this.playerLoc = [i, j];
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

/** 2.맵 객체 생성 */
function createObj(arrays) {
  for (let i = 0; i < arrays.length; i++) {
    let maps = new Savemap(arrays[i], i + 1);
    displayMapInfo(maps);
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

/** 0.입력버튼 클릭 시 */
document.getElementById('reg-btn').addEventListener('click', function (e) {
  const inputValue = document.getElementById('text-area').value;
  if (inputValue == '' || inputValue === null || inputValue === undefined) {
    alert('텍스트를 입력해주세요');
    document.getElementById('text-area').focus();
  } else {
    createObj(convertArray(inputValue));
  }
});

/**
 * 1) 클래스의 인스턴스 메서드 (this.processMap())
 *    : 메서드 내에서 this 키워드를 사용하여 클래스의 속성들을 접근할 수 있다
 *    클래스의 인스턴스 메서드는 메서드 내에서 this로 해당 클래스의 인스턴스를 가리킨다
 *    ex) this.hall, this.ball, this.player,... 등의 속성은 processMap 메서드에서 this를 통해 접근할 수 있다.
 * 2) - Math.max 함수
 *    : 인자로 받은 값 중에서 최댓값을 반환하는 자바스크립트의 내장 함수
 *    ex) maxRowLength와 this.map[i].length 중에서 더 큰 값을 maxRowLength에 할당
 *        따라서 이 코드는 현재까지의 최대 길이를 계속해서 갱신하는 역할을 합니다.
 *        반복문이 끝날 때에는 이 maxRowLength에는 가장 긴 행의 길이가 저장되어 있게 됩니다.
 */

/*
Stage 1
#####
#OoP#
#####
=====
Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  # 
 ########
 */
