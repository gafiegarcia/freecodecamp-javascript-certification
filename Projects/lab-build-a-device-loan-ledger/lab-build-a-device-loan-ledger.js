const equipmentLedger = {
  1: {
    type: "PC",
    status: "CheckedOut",
    borrower: { name: "John Smith", email: "john@acme.org" },
    dueDate: "11/30/2025",
  },
  2: {
    type: "Laptop",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
  3: {
    type: "Laptop",
    status: "CheckedOut",
    borrower: { name: "Jane Doe", email: "jane@acme.org" },
    dueDate: "10/31/2025",
  },
  4: {
    type: "iPad",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
};

function checkoutDevice(ledger, assetTag, borrower) {
  if (!ledger[assetTag]) {
    return {
      ledger,
      message: `Device ${assetTag} not found!`,
    };
  }
  if (ledger[assetTag].status === "CheckedOut") {
    return {
      ledger,
      message: `Device ${assetTag} is already checked out!`,
    };
  }

  const updatedLedger = JSON.parse(JSON.stringify(ledger));
  const currDevice = updatedLedger[assetTag];

  currDevice.borrower = borrower;
  currDevice.status = "CheckedOut";

  return {
    ledger: updatedLedger,
    message: `${borrower.name} has checked out device ${assetTag}`,
  };
}

function checkinDevice(ledger, assetTag) {
  if (!ledger[assetTag]) {
    return {
      ledger,
      message: `Device ${assetTag} not found!`,
    };
  }

  const updatedLedger = JSON.parse(JSON.stringify(ledger));
  const currDevice = updatedLedger[assetTag];

  currDevice.borrower = { name: "", email: "" };
  currDevice.dueDate = "";
  currDevice.status = "CheckedIn";

  return {
    ledger: updatedLedger,
    message: `Device ${assetTag} is checked in!`,
  };
}

function listOverdueDevices(ledger, today) {
  const dateToNumber = (mdyStr) => {
    if (typeof mdyStr !== "string") return;

    const arr = mdyStr.split("/");

    return 10000 * Number(arr[2]) + 100 * Number(arr[0]) + Number(arr[1]);
  };
  const todayNumber = dateToNumber(today);
  const result = [];

  for (const tag in ledger) {
    const currDevice = ledger[tag];

    if (currDevice.status !== "CheckedOut") continue;

    const currDueDateNumber = dateToNumber(currDevice.dueDate);

    if (currDueDateNumber < todayNumber) {
      let index = 0;

      while (
        index < result.length &&
        currDueDateNumber >= dateToNumber(result[index]?.dueDate)
      ) {
        index++;
      }

      result.splice(index, 0, currDevice);
    }
  }

  return result;
}

function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}

function loadLedger(json) {
  return JSON.parse(json);
}
