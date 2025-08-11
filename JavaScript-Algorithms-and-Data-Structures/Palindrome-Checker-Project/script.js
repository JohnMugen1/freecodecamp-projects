const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const displayResults = document.getElementById('result');

const palindrome = (str) => {
  let isMatchChar = true;
  let refined_str = str.replace(/[^a-z0-9]/ig, "").toLowerCase();
  let reversed_str = refined_str.split("")
                                .reverse()
                                .join("");

  for (let i = 0; i < refined_str.length; i++) {
    if (refined_str[i] !== reversed_str[i]) {
      isMatchChar = false;
      break;
    }
  }
  if (isMatchChar) {
    return `${str} is a palindrome`;
  }
  return `${str} is not a palindrome`;
}

const showResults = () => {
  if (textInput.value === "") {
    alert("Please input a value");
    return;
  }
  let palindrome_result = palindrome(textInput.value);
  
  displayResults.textContent = palindrome_result;
}

checkBtn.addEventListener('click', showResults);