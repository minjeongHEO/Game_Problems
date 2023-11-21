/**
1. 1~8까지 랜덤한 숫자 배열 생성
2. 화면에 출력
3. 두 숫자를 입력
4. 정렬되었는지 검사
5. 아니라면 2번으로 이동
 */
/**
 * 1. 출력 
✔  콘솔에 게임 타이틀을 출력한다.
✔  다음 줄에 현재 턴을 출력한다. 시작은 0이 아니고 1부터이다.
✔  다음 줄에 1 - 8 까지의 숫자를 무작위로 섞고 한 줄로 출력한다.
✔  마지막 줄에는 교환할 두 숫자를 입력> 라는 프롬프트를 출력한다.
  --[출력예시]--
  간단 숫자 퍼즐
  Turn 1
  [2, 4, 8, 6, 7, 3, 5, 1]
  교환할 두 숫자를 입력>

2. 입력
✔  쉼표를 기준으로 나누어진 두 숫자를 입력받는다.
✔  단 쉼표 다음에는 스페이스 한 칸이 추가로 있을 수 있다.
✔  정상적인 입력이 아닌 경우 다시 입력을 받는다.
  --[정상 출력예시]--
  1, 2
  5,3
  --[비정상 출력예시]--
  5 #입력이 하나
  1, 2 #시작에 공백
  2, 100 #범위 초과
  삼, 칠 #한글로 입력

3. 동작
  정상적인 입력이 왔을 경우 턴을 증가시켜 출력한다.
  주어진 숫자열에서 입력받은 두 수를 교환해서 출력한다.
  만약 모든 수가 오름차순으로 정렬되었다면 축하 메시지를 출력하고 프로그램을 종료한다.

 */

const PUZZLE = {
  turn: 0,
  numberArray: [],
  numbers: '',
  numberA: 0,
  numberB: 0,
};

/** 랜덤 함수 */
function randomArray() {
  // 1~8까지의 숫자 배열을 생성 //*1)
  let array = Array.from({ length: 8 }, (_, index) => index + 1);

  // 배열섞기 // *2)
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/** 숫자 입력 후 유효성 체크 */
function checkNumbers() {
  return new Promise((resolve, reject) => {
    numbers = prompt('교환할 두 숫자을 입력 \n(","로 구분하여 입력합니다.) > ');

    // *3)
    if (numbers === '' || numbers === undefined || !numbers.includes(',')) {
      return false;
    }

    // 1. 쉼표를 기준으로 나누어진 두 숫자를 입력받는다.
    numberA = numbers.split(',')[0];
    numberB = numbers.split(',')[1].trim(); // 단 쉼표 다음에는 스페이스 한 칸이 추가로 있을 수 있다.

    // 2. 정상적인 입력이 아닌 경우 다시 입력을 받는다.
    // 입력이 하나 X
    if (numbers === undefined || numberA === undefined || numberB === undefined || numbers.split(',').length > 2) {
      alert('두개의 수를 입력해주세요.');
      // return false;
      resolve(false);
    }

    // 시작에 공백 X
    if (numberA.charAt(0) == ' ') {
      alert('공백을 제거 후 입력해주세요');
      // return false;
      resolve(false);
    }

    // 한글로 입력 X  // *4)
    if (isNaN(numberA) || isNaN(numberB)) {
      alert('숫자를 입력해주세요.');
      // return false;
      resolve(false);
    }

    // 범위 초과 // *3)
    if (!PUZZLE.numberArray.includes(parseInt(numberA)) || !PUZZLE.numberArray.includes(parseInt(numberB))) {
      alert('입력한 수가 범위를 초과합니다.');
      // return false;
      resolve(false);
    }

    console.log(`${numbers}\n `);
    PUZZLE.numberA = numberA;
    PUZZLE.numberB = numberB;
    // return true;
    resolve(true);
  }).then((result) => processResponse(result));
}

/** 입력받은 수 교환하기 */
function changeArray() {
  const array = PUZZLE.numberArray;
  const i = parseInt(PUZZLE.numberA);
  const j = parseInt(PUZZLE.numberB);
  const indexI = array.indexOf(i);
  const indexJ = array.indexOf(j);

  // [array[array.indexOf(i)], array[array.indexOf(j)]] = [j, i];
  [array[indexI], array[indexJ]] = [j, i];

  // console.log('i,j: ', i, j);
  // console.log(array.indexOf(i));
  // console.log(array.indexOf(j));
  // console.log('array 후: ', array);

  PUZZLE.numberArray = array;
  console.log(`[${PUZZLE.numberArray}]`);
}

/** 퍼즐 완성 확인하기 */
function completeCheck() {
  const array = PUZZLE.numberArray;
  const sortArray = PUZZLE.numberArray.toSorted();

  // *5)
  let isEqual = array.length === sortArray.length && array.every((value, index) => value === sortArray[index]);

  if (isEqual) {
    return true;
  } else {
    return false;
  }
}

function processResponse(result) {
  if (result) {
    PUZZLE.turn += 1;
    console.log(`🔴 Turn : ${PUZZLE.turn}`);

    changeArray();

    if (completeCheck()) {
      console.log(`축하합니다! ${PUZZLE.turn}턴만에 퍼즐을 완성하셨습니다! \n `);
    } else {
      checkNumbers();
    }
  } else {
    console.log(`잘못 입력하셨습니다. 다시 입력해 주세요. \n `);
    checkNumbers();
  }
}

function main() {
  console.log('PUZZLE GAME🧩');
  console.log(`🔴 Turn : ${PUZZLE.turn}`);

  PUZZLE.numberArray = randomArray();
  console.log(`[${PUZZLE.numberArray}]`);

  checkNumbers();
}

main();

/**
 * 1) 각 숫자를 생성할 때마다 이미 생성된 숫자와 중복되지 않는지 확인하는 방법도 있습니다.
 *    하지만 이 방법은 숫자의 범위가 커질수록 비효율적
 *    - Math.floor(): 주어진 숫자보다 크지 않은 가장 큰 정수를 반환합니다. 즉, 소수점 이하를 버립니다.
 *    - Math.random(): 0 이상 1 미만의 부동소수점 실수를 무작위로 반환합니다. 즉, 반환되는 숫자는 0이상 1미만
 * 2) 앞에서부터 시작한다면, 이미 처리된 요소가 다시 처리될 수 있어 효율성이 떨어질 수 있습니다
 *    따라서, 일반적으로는 뒤에서부터 처리하는 방식이 선호됩니다.
 *    구조 분해 할당 사용
 * 3) 특정 문자가 포함되어 있는지 확인하려면 includes() 또는 indexOf() 메소드를 사용해야 합니다.
 *    (in 연산자는 **객체에서** 속성을 확인하는 데 사용됩니다.)
 *    따라서 문자열에서 ','(콤마)가 있는지 확인하려면 includes() 또는 indexOf() 메소드를 사용해야 합니다.
 *    - includes() 메소드
 *      : 문자열에 특정 문자 또는 문자열이 포함되어 있는지 확인하고, 그 결과를 true 또는 false로 반환합니다.
 *        그 요소의 타입까지 일치하는지를 확인합니다
 *        ex) [1, 2, 3].includes('1')은 false
 *    - indexOf() 메소드
 *      : 문자열에서 특정 문자 또는 문자열을 찾고, 그 시작 위치의 인덱스를 반환합니다.
 *        배열이나 문자열에서 특정 값을 찾아 그 값의 첫 번째 인덱스를 반환합니다.
 *        만약 그 문자 또는 문자열이 없으면 -1을 반환합니다.
 *        ex) [1, 2, 3].indexOf('1')은 -1을 반환
 * 4) - NaN() 함수
 *      : 입력값이 숫자가 아닌지를 확인합니다.
 *        즉, 숫자가 아닌 값을 입력하면 true를 반환하고, 숫자를 입력하면 false를 반환합니다.
 *        isNaN() 함수는 문자열을 숫자로 변환할 수 있는지 여부를 판단합니다.
 *        예를 들어, isNaN('123')은 false를 반환하고,
 *                  isNaN('abc')는 true를 반환합니다. 또한 isNaN('123abc')는 true를 반환합니다. 왜냐하면 '123abc'는 숫자로 변환할 수 없기 때문입니다.
 *    - Number() 함수
 *      : 입력값을 숫자로 변환하려고 시도합니다.
 *        숫자로 변환할 수 없는 값이 입력되면 NaN을 반환합니다.
 *        예를 들어, Number('123')은 123을 반환하고,
 *                  Number('abc')는 NaN을 반환합니다. 또한 Number('123abc')는 NaN을 반환합니다.
 * 5) - every() 메소드
 *      : 배열의 모든 요소가 주어진 판별 함수를 만족하는지를 확인하는 JavaScript의 배열 메소드입니다.
          판별 함수는 각 요소에 대해 호출되며, 
          판별 함수가 false를 반환하면 every() 메소드는 즉시 false를 반환하고 나머지 요소를 확인하지 않습니다. 
          모든 요소가 판별 함수를 만족하면, 즉 판별 함수가 모든 요소에 대해 true를 반환하면 every() 메소드는 true를 반환합니다.
 */
