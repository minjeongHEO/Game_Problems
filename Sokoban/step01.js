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

document.getElementById('reg-btn').addEventListener('click', function (e) {
  const inputValue = document.getElementById('text-area').value;
  if (inputValue == '' || inputValue === null || inputValue === undefined) {
    alert('텍스트를 입력해주세요');
    document.getElementById('text-area').focus();
  } else {
    readLine(inputValue);
  }
});
