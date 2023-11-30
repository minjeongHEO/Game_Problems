4가지 문제를 구현해봅니다.

# 문제 1: 숫자 퍼즐

1.  출력

    ✔ 콘솔에 게임 타이틀을 출력한다.

    ✔ 다음 줄에 현재 턴을 출력한다.

        PUZZLE.turn

    ✔ 다음 줄에 1 - 15 까지의 숫자와 빈공백 하나를 섞어 [ ] 모양으로 출력한다.

        createRandomArray()
        printArray()

2.  입력

    ✔ 숫자 입력 > 이라는 프롬프트를 출력한다.

        inputNumber()

    ✔ 입력 받은 숫자가 공백 주변의 숫자인지 확인한다.

        checkNumbers()

    ✔ 입력 받은 것이 숫자가 아닌 경우 다시 입력을 받는다.

        inputNumber()

3.  동작

    ✔ 공백칸의 위치를 확인 후 입력받은 수의 칸과 교환한다.

        findLoc()
        changePuzzle()

    ✔ 퍼즐 출력.

        printArray()

    ✔ 퍼즐 완성 여부를 확인한다.

        checkSuccess()

    ✔ 모든 숫자가 올바르게 정렬되었을 경우 축하메시지와 턴을 출력하고 프로그램을 종료한다.

        checkArrayEquality()

---

1.  `createRandomArray()` 함수에서 Promise 객체를 생성한다.

    퍼즐 배열 생성이 완료되면,

2.  `printArray()` 함수에서 퍼즐을 출력한다.
3.  `inputNumber()` 함수에서 숫자를 입력받는다.

    숫자를 입력 받으면, 유효성 체크를 끝낸다.

    - 사용자가 입력prompt를 취소 할 시

      `reject = 'reset'`

    - 정상적인 입력이 아닐 시

      `return inputNumber();`

    - 정상적인 값을 입력 시

      ```js
      let inputNum = prompt('숫자 입력 > ');
      resolve(inputNum);
      ```

4.  `checkNumbers()` 함수로 `inputNum`값을 전달하여 주변 값이 맞는지 확인한다.

    `findLoc()` 함수로 공백의 위치값을 찾아서 `inputNum`값이 그 주변 값이 맞는지 확인한다.

    ```js
    let [x, y] = findLoc('');
    return { result, inputNumber, x, y };
    ```

5.  `changePuzzle()` 함수로 공백칸과 입력받은칸과 교환.

6.  `printArray()` 함수로 교환된 퍼즐 출력.

7.  `checkSuccess()`,`checkArrayEquality()` 함수로 퍼즐 완성인지 확인한다.

    - ✔ 정렬 됐으면 (`checkArrayEquality() == true`)

            🎉축하 메시지를 출력하고 프로그램 종료

    - ❌ 정렬 안됐으면

            inputNumber() 재호출

# 문제 2: 소코반

1.  입력

    ✔ 맵 정보 문자열 변수를 문자열로 변환시킨다.  
     (입력받은 문자열에서 "=", "Stage" 줄은 제외 후 배열로 변환)

        convertArray()

2.  동작

        convertArray()

    ✔ Class를 사용하여 맵 객체 생성한다.

        createObj()

            new Savemap()

3.  출력

    ✔ 결과 출력 후

        displayMapInfo()

    ✔ 프롬프트로 명령어 입력 받는다.

            orderPrompt()

    ✔ 입력받은 명령어를 순서대로 처리해서 단계별 상태를 출력한다.

            readOrder()

            - 구멍에 빠졌을 때 || q(게임종료)를 입력받았을 때
                : gameOver();
            - 벽이나 공 등 다른 물체에 부딪힐때 || 맵을 벗어날 때
                : (경고!)문 출력
            - 정상 수행 가능할 때
                : new Savemap() 객체 재생성하여 이동시킨 지도 표시

# 문제 3: 간단 블랙잭

1.  입력

    ✔ 얼마를 배팅할지 여부를 결정.

        betMoney()

2.  동작

    ✔ 배팅 금액 체크

        checkMoney()

    ✔ 카드 할당 받기

        devideCard()

3.  출력

    ✔ 결과를 출력 후

        printResult()

4.  동작

    ✔ 카드를 더 받을 지 여부

        moreCard()

    ✔ 그 결과에 따라

            moreCardAfter()

            ✔ 카드 할당 받고
                devideCard()

            ✔ 승패 여부
                winLose()

                - 잔액이 없으면 게임 종료 ❌
                        finishGame()
                        - 다시 게임 시작하려면
                                main()

                - 잔액이 있으면 게임 계속 ✔
                        moreGame()

---

# 문제 4: 그림판
