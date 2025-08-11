const getTime = document.getElementById("date-time");

const date = new Date();
const hour = date.getHours();
const minutes  = date.getMinutes();
const time = `${hour}:${minutes}`;

getTime.textContent = time;

const buttonOk = document.getElementById("check-btn");
const cancelBtn = document.getElementById("clear-btn");
const textArea = document.getElementById("results-div");
const numberInput = document.getElementById("user-input");

const numberValidator = () => {
    const tel_no = numberInput.value;
    if (tel_no === "") {
         alert("Please provide a phone number");
         return;
    }

    const numberRegex = /^1?\s?(\({1}\d{3}\){1}|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
    numberRegex.test(tel_no) ? textArea.textContent = `Valid US number: ${tel_no}`
    : textArea.textContent = `Invalid US number: ${tel_no}`;

}

const clearInput = () => {
    numberInput.value = "";
    textArea.textContent = "";
}
numberInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        numberValidator();
    }
});
buttonOk.addEventListener('click', numberValidator);
cancelBtn.addEventListener('click', clearInput);