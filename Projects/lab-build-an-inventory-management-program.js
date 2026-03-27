console.log("Inventory Management Program" + "\n");

const inventory = [];

function findProductIndex(productName) {
  for (let i = 0; i < inventory.length; i++) {
    if (productName.toLowerCase() === inventory[i].name) {
      return i;
    }
  }
  return -1;
}

function addProduct(product) {
  if (findProductIndex(product.name) !== -1) {
    inventory[findProductIndex(product.name)].quantity += product.quantity;
    console.log(`${inventory[findProductIndex(product.name)].name} quantity updated`)
  } else {
    inventory.push({ name: product.name.toLowerCase(), quantity: product.quantity});
    console.log(`${inventory[findProductIndex(product.name)].name} added to inventory`)
  }
}

function removeProduct(productName, productQuantity) {
  if (findProductIndex(productName) === -1) {
    console.log(`${productName.toLowerCase()} not found`)
  } else if (inventory[findProductIndex(productName)].quantity - productQuantity > 0) {
    inventory[findProductIndex(productName)].quantity -= productQuantity;
    console.log(`Remaining ${productName.toLowerCase()} pieces: ${inventory[findProductIndex(productName)].quantity}`)
  } else if (inventory[findProductIndex(productName)].quantity - productQuantity === 0) {
    inventory.splice(findProductIndex(productName), 1)
  } else if (inventory[findProductIndex(productName)].quantity - productQuantity < 0) {
    console.log(`Not enough ${productName.toLowerCase()} available, remaining pieces: ${inventory[findProductIndex(productName)].quantity}`)
  }
}

// TESTS
inventory.push({name: "flour", quantity: 20}, {name: "rice", quantity: 5});
console.log(inventory);
removeProduct("FLOUR", 5);
