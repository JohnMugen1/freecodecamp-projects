const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const displayOutput = document.getElementById("output");



const checkUserInput = () => {

  let number = parseInt(numberInput.value);
  displayOutput.style.display = "block";

  if (!number) {
    displayOutput.textContent = "Please enter a valid number";
    return;
  }else if(number < 0) {
    displayOutput.textContent = "Please enter a number greater than or equal to 1";
    clear();
    return;
  }else if (number >= 4000) {
    displayOutput.textContent = "Please enter a number less than or equal to 3999";
    clear();
    return;
  } else {
    displayRomanValue();
    clear();
  }
}


const romanNumeralConverter = (num) => {
  let romanNum = "";
  let numbers = [];

  const numeralConverter = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M"
  };
 //collect all the properties that are less than or equal to num
  for (const key_val in numeralConverter) {
     if (key_val <= num) {
      numbers.push(key_val);
     }
  }
  //determine the largest number
  let max_val = Math.max(...numbers);
  //solve for roman Numerals
  if (max_val === num) {
    romanNum += numeralConverter[max_val];
  } else {
  romanNum += numeralConverter[max_val];
  romanNum += romanNumeralConverter(num - max_val);
  }
  return romanNum;

}

const displayRomanValue = () => {
  displayOutput.textContent = romanNumeralConverter(parseInt(numberInput.value));
  displayOutput.style.display = "block";
  
}

const clear = () => {
  numberInput.value = "";
  convertBtn.textContent = "Convert Again?";
}

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
})
convertBtn.addEventListener("click", checkUserInput);