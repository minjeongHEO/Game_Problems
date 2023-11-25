const PUZZLE = {
  turn: 0,
  numberArray: [],
};

/** 위치의 x,y값 찾기 */
function findLoc(loc) {
  let location = null; // 초기값을 null로 설정

  PUZZLE.numberArray.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
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
    let [changeX, changeY] = findLoc(parseInt(inputNumber));

    puzzle[x][y] = inputNumber;
    puzzle[changeX][changeY] = '';
    PUZZLE.numberArray = JSON.parse(JSON.stringify(puzzle));
  } else {
    console.log(`입력하신 '${inputNumber}'은 교체 불가능합니다.`);
  }
}

/** 퍼즐 완성 확인 - 2 */
function checkArrayEquality(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

/** 퍼즐 완성 확인 - 1 */
function checkSuccess() {
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
    let inputNum = prompt('숫자 입력 > ');
    // 사용자가 '취소' 버튼을 눌렀을 때
    if (inputNum === null) {
      alert('입력이 취소되었습니다. 게임을 종료합니다.');
      reject('reset');
    }

    if (inputNum !== null) {
      inputNum = inputNum.trim();
    }

    //숫자인지 확인
    if (isNaN(inputNum)) {
      alert('숫자를 입력해주세요.');
      return inputNumber();
    } else {
      resolve(inputNum);
    }
  })
    .then((inputNum) => checkNumbers(inputNum))
    .then(({ result, inputNumber, x, y }) => changePuzzle(result, inputNumber, x, y))
    .then(() => printArray())
    .then(() => checkSuccess())
    .catch((error) => {
      if (error === 'reset') {
        console.log('입력이 취소되었습니다. 게임이 리셋됩니다.');
      } else {
        console.log(error);
      }
    });
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
    let nums = Array.from({ length: rows * cols - 1 }, (_, index) => index + 1);
    // 배열섞기
    for (let i = nums.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // 이차 배열 생성
    let array = Array.from({ length: rows }, () => {
      return Array.from({ length: cols }, () => {
        return '';
      });
    });

    // 공백 들어갈 랜덤 값
    let random = Math.floor(Math.random() * nums.length);

    // 이차 배열에 값 넣기
    let afterBlank = false;
    let k = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (k == random) {
          array[i][j] = '';
          afterBlank = true;
        } else {
          if (afterBlank) {
            array[i][j] = nums[k - 1];
          } else {
            array[i][j] = nums[k];
          }
        }
        k++;
      }
    }

    // 깊은 복사를 통해 PUZZLE.numberArray에 array 할당 // *1)
    PUZZLE.numberArray = JSON.parse(JSON.stringify(array));

    resolve();
  })
    .then(() => printArray())
    .then(() => inputNumber());
}

function main() {
  console.log('PUZZLE GAME - step02🧩');
  console.log(`🔴 Turn : ${PUZZLE.turn}`);

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
    배열 출력 (방법1)
    // arrayHtml = '';
    // PUZZLE.numberArray.forEach((row) => {
    //   // console.log(row);
    //   row.forEach((col) => {
    //     // console.log(col);
    //     arrayHtml += `[${col.toString().padStart(2)}]`;
    //   });
    //   arrayHtml += `\n`;
    // });

    배열 출력 (방법2) // *2,3)
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
