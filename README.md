# Puzzle_Game

## 숫자 퍼즐 게임을 구현해봅니다.

1.  출력

    ✔ 콘솔에 게임 타이틀을 출력한다.

    ✔ 다음 줄에 현재 턴을 출력한다. 시작은 0이 아니고 1부터이다.

        PUZZLE.turn

    ✔ 다음 줄에 1 - 8 까지의 숫자를 무작위로 섞고 한 줄로 출력한다.

        randomArray()

    ✔ 마지막 줄에는 교환할 두 숫자를 입력> 라는 프롬프트를 출력한다.

        checkNumbers()

2.  입력

    ✔ 쉼표를 기준으로 나누어진 두 숫자를 입력받는다.

        checkNumbers()

    - 단 쉼표 다음에는 스페이스 한 칸이 추가로 있을 수 있다.

    - 1, 2

    ✔ 정상적인 입력이 아닌 경우 다시 입력을 받는다.

        processResponse()

    - 5 #입력이 하나
    - 1, 2 #시작에 공백
    - 2, 100 #범위 초과
    - 삼, 칠 #한글로 입력

3.  동작

    ✔ 정상적인 입력이 왔을 경우 턴을 증가시켜 출력한다.

        processResponse()

    ✔ 주어진 숫자열에서 입력받은 두 수를 교환해서 출력한다.

        changeArray()

    ✔ 만약 모든 수가 오름차순으로 정렬되었다면 축하 메시지를 출력하고 프로그램을 종료한다.

        completeCheck()

---

1.  `checkNumbers()` 함수에서 Promise 객체를 생성한다.

    숫자를 입력 받으면, 유효성 체크를 끝낸다.

    - 사용자가 입력prompt를 취소 할 시

      `resolve = 'reset'`

    - 정상적인 입력이 아닐 시

      `resolve = false`

    - 정상적인 값을 입력 시

      `resolve = true`

2.  `processResponse()` 함수로 resolve값을 전달한다.

    - `resolve == 'reset'`

      변수 초기화

    - `resolve == true`

      - `changeArray()` : 입력받은 두 수 교환하기

      - `completeCheck()` : 교환 후 퍼즐이 오름차순으로 정렬됐는지 확인

        - ✔ 정렬 됐으면

              🎉축하 메시지를 출력하고 프로그램 종료

        - ❌ 정렬 안됐으면

              `checkNumbers()` 재호출

    - `resolve == false`

          `checkNumbers()` 재호출
