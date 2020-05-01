const base1 = document.querySelector(`[name="text_1"]`);
const base2 = document.querySelector(`[name="text_2"]`);
const convertBtn = document.querySelector(`[name="btnConv"]`);
const input = document.querySelector(`[name="inpBox"]`);
const output = document.querySelector(`[name="outpBox"]`);
const sel1 = document.querySelector("#select_1");
const sel2 = document.querySelector("#select_2");

// deprecated
var bases = [];
bases["2"] = ["Select Base...", 8, 10, 16];
bases["8"] = ["Select Base...", 2, 10, 16];
bases["10"] = ["Select Base...", 2, 8, 16];
bases["16"] = ["Select Base...", 2, 8, 10];

// deprecated
function filter(obj, selectNr) {
  var index, targetSel, targetArr, currentItem, i = 0;
  index = obj.options.selectedIndex;
  if(index === 0) return; //invalid selection

  // Put items in list
  targetSel = document.querySelector(`#select_${selectNr}`);
  targetSel.disabled = false;
  //remove existing options
  targetSel.options.length = 0;
  currentItem = 0;
  //build list
  targetArr = bases[obj.options[index].value];
  for (i = 0; i < targetArr.length; i++) {
    currentItem = targetArr[i];
    targetSel.options[i] = new Option(currentItem, currentItem, false, false);
  }
  obj.blur();
}

// deprecated
function convertToBaseAlt() {
  let indexFrom = sel1.options.selectedIndex;
  if(indexFrom === 0) return; //invalid base number
  const fromBase = sel1.options[indexFrom].value;

  let indexTo = sel2.options.selectedIndex;
  if(indexTo === 0) return; //invalid base number
  const toBase = sel2.options[indexTo].value;

  var origin = input.value;
  output.value = parseInt(origin, fromBase).toString(toBase);
}

function convertToBase () {
  let ixFrom = parseInt(base1.value);
  console.log(ixFrom);
  if (ixFrom < 2) return;

  let ixTo = parseInt(base2.value);
  if (ixTo < 2) return;

  output.value = parseInt(input.value, ixFrom).toString(ixTo);
}

// convertBtn.addEventListener("click", convertToBase);
convertBtn.addEventListener("click", convertToBase);