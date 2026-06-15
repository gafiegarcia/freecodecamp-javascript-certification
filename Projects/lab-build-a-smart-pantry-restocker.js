console.log("— Smart Pantry Restocker —\n");

const rawData = [
  "A10|Tomatoes|5|2027-01-01", // no zone field
  "B21|Bananas|10|2027-01-01|fridge", // zone: "fridge"
  "C32|Eggs|3|2027-01-01|pantry", // zone: "pantry"
  "C32|Eggs|3|2027-01-01|pantry", // zone: "pantry"
  "C33|Eggs|3|2027-01-01|pantry", // zone: "pantry"
  "D67|Onions|0|2027-01-01|pantry", // zone: "pantry"
];

function parseShipment(rawData) {
  const processedSkus = [];
  const parsedShipment = [];

  for (const item of rawData) {
    // checking duplicate SKUs
    const processedRawItem = item.split("|");
    if (processedSkus.includes(processedRawItem[0])) {
      continue;
    }

    // initialize output object
    const itemObj = {};
    const props = ["sku", "name", "qty", "expires", "zone"];

    // process item data into output object
    for (let i = 0; i < processedRawItem.length; i++) {
      itemObj[props[i]] = processedRawItem[i];
    }
    itemObj.qty = Number(itemObj.qty);
    if (!itemObj.zone) itemObj.zone = "general";
    processedSkus.push(itemObj.sku);
    parsedShipment.push(itemObj);
  }
  return parsedShipment;
}

// TEST: parseShipment
// console.log(parseShipment(rawData));

function planRestock(pantry, shipment) {
  // init output arr and existing SKUs
  const actions = [];
  const pantrySkus = pantry.map((item) => item.sku);

  // loop over shipment -> decide action to push
  for (const item of shipment) {
    const action = {};

    if (item.qty <= 0) {
      action.type = "discard";
    } else if (pantrySkus.includes(item.sku)) {
      action.type = "restock";
    } else {
      action.type = "donate";
    }

    action.item = item;
    actions.push(action);
  }

  return actions;
}

// TEST: planRestock
const pantry = parseShipment([
  "A10|Tomatoes|5|2027-01-01", // no zone field
  "B21|Bananas|10|2027-01-01|fridge", // zone: "fridge"
  "C32|Eggs|3|2027-01-01|pantry", // zone: "pantry"
]);
const actions = planRestock(pantry, parseShipment(rawData));
// console.log(actions);

function groupByZone(actions) {
  const groupedActions = {};

  for (const action of actions) {
    if (groupedActions[action.item.zone]) {
      groupedActions[action.item.zone].push(action);
    } else {
      groupedActions[action.item.zone] = [action];
    }
  }

  return groupedActions;
}

// TEST: groupByZone
const groupedActions = groupByZone(actions);
// console.log(groupedActions);

function clonePantry(pantry) {
  const clonedPantry = [];

  pantry.forEach((item) => {
    const clonedItem = {};

    for (const prop in item) {
      clonedItem[prop] = item[prop];
    }

    clonedPantry.push(clonedItem);
  });

  return clonedPantry;
}

// TEST: clonePantry
const clonedPantry = clonePantry(pantry);
// console.log(pantry[0]);
// console.log(clonedPantry[0]);
// console.log(pantry[0] === clonedPantry[0]);

console.log(
  groupByZone(planRestock(clonePantry(pantry), parseShipment(rawData))),
);
