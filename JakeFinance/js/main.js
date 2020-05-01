/* jshint esversion:6 */
//#region Initializing
const orgNr = document.querySelector(`[name="orgBox"]`);
const newNr = document.querySelector(`[name="newBox"]`);
const outP = document.querySelector(`[name="outBox"]`);
const newPrice = document.querySelector(`[name="newPriceBox"]`);
const orgPrice = document.querySelector(`[name="orgPriceBox"]`);
const outPrice = document.querySelector(`[name="outPriceBox"]`);
const btnCalc = document.querySelector(`[name="btnCalc"]`);
const elast = document.querySelector(`[id="RES"]`);
const myDiv = document.querySelector(`[id="checkDIV"]`);

const dataInput = document.querySelector(`[name="dataBox"]`);
const btnVari = document.querySelector(`[name="btnVarience"]`);
const varience = document.querySelector(`[name="txtVarience"]`);
//#endregion Initializing

//#region Helper Algorithms
function percChange(n, o) { //(new - original)
  return ((n - o) / o) * 100;
}
function calcMean(coll) {
  if (coll.length === 0) return; //array length cant be 0 (divbyzero)
  var sum = 0;
  for (var i = 0; i < coll.length; i++) {
    sum += parseInt(coll[i],10); //don't forget to add the base
  }
  return sum / coll.length;
}
function summation(set, avg) {
  let sum = 0;
  for (let i = 0; i < set.length; i++){
    sum += Math.pow((parseInt(set[i],10) - avg),2);
  }
  return sum;
}
//#endregion Helper Algoritms

//#region Variance Calculations
const  calcPopulationVarience = (set, avg) => {return ((1/set.length) * summation(set, avg)).toFixed(2);};
const  calcSampleVarience = (set, avg) => {return (1/(set.length-1) * summation(set, avg)).toFixed(2);};
function calcVarience() {
  const dataSet = dataInput.value.split(',').filter(e => (e !== '' && !isNaN(e)));
  let dataMean = calcMean(dataSet);

  const selValue = document.querySelector(`[name="selVar"]`).value;

  switch(selValue) {
    case "sample":
      varience.value = `${calcSampleVarience(dataSet,dataMean)} \t(mean: ${dataMean.toFixed(2)})`;
      break;
    case "population":
      varience.value = `${calcPopulationVarience(dataSet,dataMean)} \t(mean: ${dataMean.toFixed(2)})`;
      break;
    default:
      break;
  }
}
//#endregion Variance Calculations

//#region Elasticity Calculations
function calcElast() {
  let nDem = parseInt(newNr.value,10); //new Qx
  let oDem = parseInt(orgNr.value,10); //org Qx

  outP.value = +percChange(nDem, oDem).toFixed(2); //sets to 2 decimals, '+' deletes trailing 0s

  let nPrice = parseFloat(newPrice.value);
  let oPrice = parseFloat(orgPrice.value);

  outPrice.value = +percChange(nPrice, oPrice).toFixed(2);

  let res = parseFloat(outP.value) / parseFloat(outPrice.value);
  console.log(res);
  elast.value = +res.toFixed(2);

  switch (true) { //TODO: make efficient
    case (res < 1):
      myDiv.setAttribute("style", "background-color: #FFC600;");
      myDiv.innerHTML = "inelastic";
      break;
    case (res === 1):
      myDiv.setAttribute("style", "background-color: aqua;");
      myDiv.innerHTML = "unitary";
      break;
    case (res > 1):
      myDiv.setAttribute("style", "background-color: chartreuse;");
      myDiv.innerHTML = "elastic";
      break;
    default:
      break;
  }
}
//#endregion Elasticity Calculations
/* Events */
btnCalc.addEventListener("click", calcElast);
btnVari.addEventListener("click", calcVarience);