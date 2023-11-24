const PUZZLE = {
  turn: 0,
  numberArray: [],
};

// /** 퍼즐 완성 확인하기 */
// function completeCheck() {
//   const array = PUZZLE.numberArray;
//   const sortArray = PUZZLE.numberArray.toSorted();

//   // *5)
//   let isEqual = array.length === sortArray.length && array.every((value, index) => value === sortArray[index]);

//   if (isEqual) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /** 입력받은 수 교환하기 */
// function changeArray() {
//   const array = PUZZLE.numberArray;
//   const i = parseInt(PUZZLE.numberA);
//   const j = parseInt(PUZZLE.numberB);
//   const indexI = array.indexOf(i);
//   const indexJ = array.indexOf(j);

//   [array[indexI], array[indexJ]] = [j, i];

//   PUZZLE.numberArray = array;
//   console.log(`[${PUZZLE.numberArray}]`);
// }

// function processResponse(result) {
//   if (result == 'reset') {
//     PUZZLE.turn = 0;
//     PUZZLE.numberArray = [];
//     PUZZLE.numberA = 0;
//     PUZZLE.numberB = 0;
//   } else if (result) {
//     PUZZLE.turn += 1;
//     console.log(`🔴 Turn : ${PUZZLE.turn}`);
//     changeArray();

//     if (completeCheck()) {
//       console.log(`축하합니다! ${PUZZLE.turn}턴만에 퍼즐을 완성하셨습니다! \n `);
//     } else {
//       checkNumbers();
//     }
//   } else {
//     console.log(`잘못 입력하셨습니다. 다시 입력해 주세요. \n `);
//     checkNumbers();
//   }
// }

// /** 숫자 입력 후 유효성 체크 */
// function checkNumbers() {
//   return new Promise((resolve, reject) => {
//     numbers = prompt('교환할 두 숫자을 입력 \n(","로 구분하여 입력합니다.) > ');

//     // 사용자가 '취소' 버튼을 눌렀을 때
//     if (numbers === null) {
//       alert('입력이 취소되었습니다. 게임이 리셋됩니다.');
//       resolve('reset');
//     }

//     // 1. 쉼표를 기준으로 나누어진 두 숫자를 입력받는다.
//     // *3)
//     if (numbers === '' || numbers === undefined || !numbers.includes(',')) {
//       resolve(false);
//     }
//     numberA = numbers.split(',')[0];
//     numberB = numbers.split(',')[1].trim(); // 단 쉼표 다음에는 스페이스 한 칸이 추가로 있을 수 있다.

//     // 2. 정상적인 입력이 아닌 경우 다시 입력을 받는다.
//     // 입력이 하나 X
//     if (numbers === undefined || numberA === undefined || numberB === undefined || numbers.split(',').length > 2) {
//       alert('두개의 수를 입력해주세요.');
//       resolve(false);
//     }

//     // 시작에 공백 X
//     if (numberA.charAt(0) == ' ') {
//       alert('공백을 제거 후 입력해주세요');
//       resolve(false);
//     }

//     // 한글로 입력 X  // *4)
//     if (isNaN(numberA) || isNaN(numberB)) {
//       alert('숫자를 입력해주세요.');
//       resolve(false);
//     }

//     // 범위 초과 X // *3)
//     if (!PUZZLE.numberArray.includes(parseInt(numberA)) || !PUZZLE.numberArray.includes(parseInt(numberB))) {
//       alert('입력한 수가 범위를 초과합니다.');
//       resolve(false);
//     }

//     console.log(`${numbers}\n `);
//     PUZZLE.numberA = numberA;
//     PUZZLE.numberB = numberB;
//     resolve(true);
//   })
//     .then((result) => processResponse(result))
//     .catch((error) => console.log(error));
// }

/** 위치의 x,y값 찾기 */
function findLoc(loc) {
  let location = null; // 초기값을 null로 설정

  PUZZLE.numberArray.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      // console.log('loc: ', loc);
      // console.log('col: ', col);
      if (col == loc) {
        location = [rowIdx, colIdx];
      }
    });
  });

  return location;
}

/** 주변 값이 맞는지 확인 */
function checkNumbers(inputNumber) {
  PUZZLE.turn += 1;
  let result = false;
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let around = [];
  const puzzle = PUZZLE.numberArray;
  const puzzleLen = puzzle.length;

  let [x, y] = findLoc('');
  //상  우  하  좌
  for (let i = 0; i < 4; i++) {
    let nx = x + dir[i][0];
    let ny = y + dir[i][1];

    if (nx >= 0 && ny >= 0 && nx < puzzleLen && ny < puzzleLen) {
      around.push(parseInt(puzzle[nx][ny]));
    }
  }

  if (around.includes(parseInt(inputNumber))) {
    result = true;
  }

  console.log(`🔴 Turn : ${PUZZLE.turn}`);
  return { result, inputNumber, x, y };
}

/** 입력한 퍼즐 변경 */
function changePuzzle(result, inputNumber, x, y) {
  if (result) {
    const puzzle = PUZZLE.numberArray;
    console.log('inputNumber: ', inputNumber);
    console.log('parseInt(inputNumber): ', parseInt(inputNumber));
    let [changeX, changeY] = findLoc(parseInt(inputNumber));

    puzzle[x][y] = inputNumber;
    puzzle[changeX][changeY] = '';
    PUZZLE.numberArray = JSON.parse(JSON.stringify(puzzle));

    // console.log(`🔴 Turn : ${PUZZLE.turn}`);
  }
}

/** 퍼즐 완성 확인 - 2 */
function checkArrayEquality(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

/** 퍼즐 완성 확인 - 1 */
function checkSuccess() {
  console.log('checkSuccess');
  const numArr = Array.from({ length: 15 }, (_, index) => index + 1);
  const puzzle = PUZZLE.numberArray;
  const puzzleLen = puzzle.length;
  const directions = ['rowDownRight', 'colDownRight', 'rowDownLeft', 'colUpRight', 'rowUpLeft', 'colUpLeft', 'rowUpRight', 'colDownLeft'];

  for (const dir of directions) {
    const checkArr = [];
    for (let i = 0; i < puzzleLen; i++) {
      const row = [];
      const col = [];
      for (let j = 0; j < puzzleLen; j++) {
        if (puzzle[i][j] !== '') {
          // row.push(parseInt(puzzle[i][j].trim()));
          row.push(parseInt(puzzle[i][j]));
        }
        if (puzzle[j][i] !== '') {
          // col.push(parseInt(puzzle[j][i].trim()));
          col.push(parseInt(puzzle[j][i]));
        }
      }
      if (dir.includes('Down')) {
        checkArr.push(...row);
      } else {
        checkArr.push(...col);
      }
    }

    if (checkArrayEquality(checkArr, numArr)) {
      console.log(`🎉 축하합니다! ${PUZZLE.turn}턴만에 퍼즐을 완성하셨습니다!`);
      return true;
    }
  }
  console.log('퍼즐이 완성되지 않았습니다. 다시 숫자를 입력하세요.');
  inputNumber();
  return false;
}

/** 숫자 입력 */
function inputNumber() {
  return new Promise((resolve, reject) => {
    console.log('prompt');
    let inputNum = prompt('숫자 입력 > ').trim();

    //숫자인지 확인
    if (isNaN(inputNum)) {
      alert('숫자를 입력해주세요.');
      return inputNumber();
    }

    resolve(inputNum);
  })
    .then((inputNum) => checkNumbers(inputNum))
    .then(({ result, inputNumber, x, y }) => changePuzzle(result, inputNumber, x, y))
    .then(() => printArray())
    .then(() => checkSuccess())
    .catch((error) => console.log(error));
}

/** array 출력 */
function printArray() {
  arrayHtml = '';
  PUZZLE.numberArray.forEach((row) => {
    row.forEach((col) => {
      arrayHtml += `[${col.toString().padStart(2)}]`;
    });
    arrayHtml += `\n`;
  });
  console.log(arrayHtml);
}

/** 랜덤 함수 생성 */
function createRandomArray() {
  return new Promise((resolve, reject) => {
    const rows = 4;
    const cols = 4;

    // 숫자 배열을 생성
    let nums = Array.from({ length: rows * cols }, (_, index) => index + 1);

    // 이차 배열 생성
    let array = Array.from({ length: rows }, () => {
      return Array.from({ length: cols }, () => {
        return '';
      });
    });

    // 공백 들어갈 랜덤 값
    let random = Math.floor(Math.random() * nums.length);

    // 값 넣기
    let k = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (k == random) {
          array[i][j] = '';
        } else {
          array[i][j] = nums[k];
        }
        k++;
      }
    }

    // 깊은 복사를 통해 PUZZLE.numberArray에 array 할당 // *1)
    PUZZLE.numberArray = JSON.parse(JSON.stringify(array));
    // console.log('PUZZLE.numberArray: ', PUZZLE.numberArray);

    // 배열 출력 (방법1)
    // arrayHtml = '';
    // PUZZLE.numberArray.forEach((row) => {
    //   // console.log(row);
    //   row.forEach((col) => {
    //     // console.log(col);
    //     arrayHtml += `[${col.toString().padStart(2)}]`;
    //   });
    //   arrayHtml += `\n`;
    // });

    // 배열 출력 (방법2) // *2,3)
    // const flattenedArray = PUZZLE.numberArray.flat();
    // arrayHtml = '';
    // for (let i = 0; i < flattenedArray.length; i++) {
    //   if (i != 0 && i % cols == 0) {
    //     arrayHtml += `\n`;
    //     arrayHtml += `[${flattenedArray[i].toString().padStart(2, ' ')}]`;
    //   } else {
    //     arrayHtml += `[${flattenedArray[i].toString().padStart(2, ' ')}]`;
    //   }
    // }

    // console.log(arrayHtml);
    // console.log(array);
    // return array;
    resolve();
  })
    .then(() => printArray())
    .then(() => inputNumber());
}

function main() {
  console.log('PUZZLE GAME - step02🧩');
  console.log(`🔴 Turn : ${PUZZLE.turn}`);

  // console.log(randomArray());
  // PUZZLE.numberArray = randomArray();
  createRandomArray();
}

main();

/**
 * 1) JavaScript에서 객체나 배열을 복사할 때, 일반적으로 새로운 배열이나 객체를 만들면 얕은 복사(shallow copy)가 일어납니다.
 *    얕은 복사는 복사된 배열이나 객체 안에 있는 객체들을 참조로 가져와서, 내부 객체의 변경이 원본과 공유되는 문제가 발생할 수 있습니다.
 *    깊은 복사는 내부 객체들까지 모두 복사하여 독립적인 객체나 배열을 만듭니다.
 *    그러나 JavaScript에는 기본적으로 깊은 복사를 수행하는 내장 함수가 없습니다.
 *    따라서 일반적으로 JSON.stringify와 JSON.parse를 사용하여 간단한 객체나 배열을 깊은 복사합니다.
 * 
 * 2) - flat() 메서드
 *    : 중첩된 배열을 1차원 배열로 펼쳐줍니다.
 *       만약 깊이를 더 지정하고 싶다면 Array.flat(depth) 형식으로 사용할 수 있습니다.
      ex) const nestedArray = [1, [2, [3, [4]]]];
          const flatArray = nestedArray.flat(Infinity);
            console.log(flatArray); // 출력: [1, 2, 3, 4]
          const deeplyFlatArray = deeplyNestedArray.flat(2);
            console.log(deeplyFlatArray); // 출력: [1, 2, 3, [4]]
 *           
 * 3) - padStart()
 *    : 문자열의 시작 부분을 특정 문자로 채워 전체 문자열이 지정한 길이가 되도록 합니다. 
 *      첫 번째 인자로는 전체 문자열의 길이를, 
 *      두 번째 인자로는 채워 넣을 문자를 전달합니다. 
 *      두 번째 인자를 생략하면 공백(' ')이 기본값으로 사용됩니다.
      ex) let num = "2";
          console.log(num.padStart(3, '0')); // 출력: '002'
 *
 */
