const price = 19.5;
let cid = [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
    let cash = parseFloat(document.getElementById("cash").value);
    let changeDue = document.getElementById("change-due");
    
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }
    if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }
    
    let change = cash - price;
    let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);
    
    if (parseFloat(totalCid) < change) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }
    
    let changeArray = [];
    let currencyUnits = {
        "PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1, "QUARTER": 0.25, 
        "ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100
    };
    
    let cidCopy = JSON.parse(JSON.stringify(cid));
    let changeGiven = 0;

    for (let i = cidCopy.length - 1; i >= 0; i--) {
        let [unit, amount] = cidCopy[i];
        let unitValue = currencyUnits[unit];
        let amountToReturn = 0;
        
        while (change >= unitValue && amount > 0) {
            change -= unitValue;
            change = Math.round(change * 100) / 100;
            amount -= unitValue;
            amountToReturn += unitValue;
        }
        
        cid[i][1] = amount; // Update main cash drawer
        changeGiven += amountToReturn;
        
        if (amountToReturn > 0) {
            changeArray.push([unit, amountToReturn]);
        }
    }
    
    if (change > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }
    
    let remainingCid = cid.reduce((sum, curr) => sum + curr[1], 0);

    if (parseFloat(remainingCid.toFixed(2)) === 0) {
        changeDue.textContent = `Status: CLOSED ${changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
    } else {
        changeDue.textContent = `Status: OPEN ${changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
    }
});
