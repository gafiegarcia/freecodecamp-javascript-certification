console.log("Cargo Manifest Validator" + "\n");

function normalizeUnits(manifest) {
  // using shallow copy to not interfere with the original manifest object
  const normalizedManifest = {...manifest};

  if (normalizedManifest.unit === "lb") {
    normalizedManifest.unit = "kg";
    normalizedManifest.weight *= 0.45
  }

  return normalizedManifest;
}

// FUNCTION TEST: normalizeUnits
const toBeNormalized = { containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true };
console.log(`normalizeUnits({ containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true }):`);
console.log(normalizeUnits({ containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true }));
console.log();


function validateManifest(manifest) {
  // If no properties are invalid, the function should return an empty object
  const manifestValidation = {};

  // containerId validation
  if (!Object.hasOwn(manifest, "containerId")) {
    manifestValidation.containerId = "Missing"
  } else if (!(manifest.containerId > 0 && typeof manifest.containerId === "number" && manifest.containerId % 1 === 0)) { // trying hard not to use Number.isInteger() static method here
    manifestValidation.containerId = "Invalid"
  }

  // destination validation
  if (!Object.hasOwn(manifest, "destination")) {
    manifestValidation.destination = "Missing"
  } else if (!(String(manifest.destination).trim() !== "" && typeof manifest.destination === "string")) {
    manifestValidation.destination = "Invalid"
  }

  // weight validation
  if (!Object.hasOwn(manifest, "weight")) {
    manifestValidation.weight = "Missing"
  } else if (!(manifest.weight > 0 && typeof manifest.weight === "number")) {
    manifestValidation.weight = "Invalid"
  }

  // unit validation
  if (!Object.hasOwn(manifest, "unit")) {
    manifestValidation.unit = "Missing"
  } else if (!(manifest.unit === "kg" || manifest.unit === "lb")) {
    manifestValidation.unit = "Invalid"
  }

  // hazmat validation
  if (!Object.hasOwn(manifest, "hazmat")) {
    manifestValidation.hazmat = "Missing"
  } else if (typeof manifest.hazmat !== "boolean") {
    manifestValidation.hazmat = "Invalid"
  }

  return manifestValidation;
}

// FUNCTION TEST: validateManifest()
console.log(`validateManifest({ containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false }):`);
console.log(validateManifest({ containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false }));
console.log();

console.log(`validateManifest({}):`);
console.log(validateManifest({}));
console.log();

console.log(`validateManifest({ containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" }):`);
console.log(validateManifest({ containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" }));
console.log();

console.log(`validateManifest({containerId: -2}):`);
console.log(validateManifest({containerId: -2}));
console.log();

console.log(`validateManifest({containerId: 3.50}):`);
console.log(validateManifest({containerId: 3.50}));
console.log();

console.log(`validateManifest({destination: "  "}):`);
console.log(validateManifest({destination: "  "}));
console.log();

console.log(`validateManifest({weight: NaN}):`);
console.log(validateManifest({weight: NaN}));
console.log();


function processManifest(manifest) {
  if (Object.keys(validateManifest(manifest)).length === 0) {
    console.log(`Validation success: ${manifest.containerId}`);
    console.log(`Total weight: ${normalizeUnits(manifest).weight} kg`)
  } else {
    console.log(`Validation error: ${manifest.containerId}`);
    console.log(validateManifest(manifest));
  }
}

// FUNCTION TEST: processManifest()
console.log(`processManifest({ containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false }):`);
processManifest({ containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false });
console.log();

console.log(`processManifest({ containerId: -88, destination: "Soledad", weight: NaN }):`);
processManifest({ containerId: -88, destination: "Soledad", weight: NaN });
console.log();

console.log(`processManifest({ destination: "Watsonville", hazmat: true }):`);
processManifest({ destination: "Watsonville", hazmat: true });
console.log();
