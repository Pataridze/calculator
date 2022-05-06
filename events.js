

function round(number, digits) {
  const num = parseFloat(number.toFixed(digits))
  return num
}

class Calculator {
  constructor(rate, npr, prvalue, currentPeriod) {
    this.r = (rate / 100) / 12;
    this.n = npr * 12;
    this.presentValue = prvalue;
    this.curPeriod = currentPeriod;
    this.calculatePmt();
  }
  calculatePmt() {
    const totalPmt = this.presentValue / ((Math.pow((1 + this.r), this.n) - 1) / (this.r * Math.pow((1 + this.r), this.n)))
    const pmt = parseFloat(totalPmt.toFixed(2))
    let periodStBalance = this.presentValue;
    let intPmt;
    let pPmt; 
    let perEndBalance;
    let sumIntPmt = 0;
    let contents;
    contents = document.getElementById('hook')

    for (let i = 1; i < this.n + 1; i++) {
      intPmt = periodStBalance * ((this.r * 12) / 360 ) * 30;
      pPmt = (i === this.n) ? periodStBalance : pmt - intPmt;
      let thePmt = (i === this.n) ? pPmt + intPmt : pmt;
      // pPmt = pmt - intPmt; 
      perEndBalance = periodStBalance - pPmt;
      sumIntPmt += intPmt
      contents.innerHTML += `
        <tr>
        <td>${i}</td>
        <td>${round(periodStBalance,2).toLocaleString()}</td>
        <td>${round(thePmt,2).toLocaleString()}</td>
        <td>${round(intPmt,2).toLocaleString()}</td>
        <td>${round(pPmt,2).toLocaleString()}</td>
        <td>${round(perEndBalance,2).toLocaleString()}</td>
        </tr>
      `
      periodStBalance = perEndBalance 
    }

    // visibility turns on
    summaryBox.style.display = 'block'    
    mainBox.style.display = 'block'
    
    let buttons = document.querySelectorAll('button');
    console.log(buttons)

    buttons[1].textContent = 'Total Interest Paid: ' + round(sumIntPmt,).toLocaleString() + ' GEL'
    buttons[2].textContent = 'Real Interest Rate: ' + round(100 * sumIntPmt / this.presentValue, 2) + '%'
    
    console.log(
      {
        loanStartingAmount: this.presentValue + ' ლარი',
        monthlyPayment: round(pmt,2) + ' ლარი',
        period: this.n + ' თვე',
        periodStBalance: round(periodStBalance,2) + ' ლარი',
        // periodInterestPayment: round(intPmt,2) + ' ლარი',
        // principalPayment: roundpPmt + ' ლარი',
        periodEndingBalance: round(perEndBalance,2) + ' ლარი',
        totalIntPayment: round(sumIntPmt,2) + ' ლარი',
      }
      )

  }

}



let userInputs = [];

const submit = document.querySelector('form');

submit.addEventListener('submit', event => {
  event.preventDefault();
  let i = 0;
  while ( i < 3) {
    userInputs.push(parseInt(event.target[i].value))
    i++;
  }
  // console.log(userInputs[0] + userInputs[1])
  let calc = new Calculator(userInputs[1], userInputs[2], userInputs[0])
  // console.log(userInputs)

})
const mainBox = document.getElementById('main-box');
const summaryBox = document.getElementById('summary');

