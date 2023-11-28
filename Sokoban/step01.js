/** 문자열 입력받기 */
function readLine(inputValue) {
  let inputLine = inputValue.split('\n');
  console.log(inputLine);
  textArr = [];
  for (let i = 0; i < inputLine.length; i++) {
    let inputText = inputLine[i].split('');
    textArr.push(inputText);
  }
  console.log(textArr);
}

// (2) 데이터 저장하기
// 위 값을 읽고 저장할 수 있는 적당한 객체 (혹은 클래스)를 생성하고 문자열로부터 읽은 값을 변환해서 저장한다.
class Savemap {
  constructor(text) {
    this.map = text;
  }
}
let map = new Savemap(textArr);

document.getElementById('reg-btn').addEventListener('click', function (e) {
  const inputValue = document.getElementById('text-area').value;
  if (inputValue == '' || inputValue === null || inputValue === undefined) {
    alert('텍스트를 입력해주세요');
    document.getElementById('text-area').focus();
  } else {
    readLine(inputValue);
  }
});
