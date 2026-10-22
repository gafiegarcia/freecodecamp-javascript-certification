const testArr = [
  "8C TS KC 9H 4S 7D 2S 5D 3S AC",
  "5C AD 5D AC 9C 7C 5H 8D TD KS",
  "3H 7H 6S KC JS QH TD JC 2D 8S",
  "TH 8H 5C QS TC 9H 4D JC KS JS",
  "7C 5H KC QH JD AS KH 4C AD 4S",
];

const VALUE_MAP = { A: 14, T: 10, J: 11, Q: 12, K: 13 };

const valueOf = (val) => VALUE_MAP[val] ?? +val;
const splitValSuit = (cardStr) => [valueOf(cardStr[0]), cardStr[1]];

function getTwoPlayersCards(roundHandsStr) {
  const hands = roundHandsStr.split(" ");
  const p1Cards = hands.slice(0, 5).map(splitValSuit);
  const p2Cards = hands.slice(5).map(splitValSuit);

  return { p1Cards, p2Cards };
}

const isAscending = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== 1) return false;
  }
  return true;
};

function getHandFacts(cards) {
  const sortedCards = cards.sort(([val1], [val2]) => val1 - val2);
  const sortedValues = sortedCards.map(([value]) => value);

  const isStraight =
    isAscending(sortedValues) || sortedValues.join("") === "234514";
  const isRoyal = isStraight && sortedValues[0] === 10;

  const firstSuit = sortedCards[0][1];
  const isFlush = sortedCards.every(([, suit]) => suit === firstSuit);

  const valueOccurences = sortedValues.reduce((occurencesObj, value) => {
    occurencesObj[value] = (occurencesObj[value] ?? 0) + 1;
    return occurencesObj;
  }, {});

  const multiOccurenceValues = new Map();
  const pairOrSameKindLeftovers = [];
  for (const [value, occurence] of Object.entries(valueOccurences)) {
    if (occurence < 2) {
      pairOrSameKindLeftovers.push(+value);
      continue;
    }
    (
      multiOccurenceValues.get(occurence) ??
      multiOccurenceValues.set(occurence, []).get(occurence)
    ).push(+value);
  }

  return {
    sortedCards,
    sortedValues,
    isRoyal,
    isStraight,
    isFlush,
    multiOccurenceValues,
    pairOrSameKindLeftovers,
  };
}

function getStraightHandValue(sortedValues) {
  const firstValue = sortedValues[0];
  const lastValue = sortedValues.at(-1);
  // handling A 2 3 4 5 which gets sorted to [2,3,4,5,14]
  if (firstValue === 2 && lastValue === 14) return sortedValues.at(-2);
  return lastValue;
}

const HAND_RULES = [
  {
    name: "Royal Flush",
    validator: ({ isRoyal, isFlush }) => isRoyal && isFlush,
    // assume no round with two royal flushes
    value: () => null,
  },
  {
    name: "Straight Flush",
    validator: ({ isStraight, isFlush }) => isStraight && isFlush,
    value: ({ sortedValues }) => getStraightHandValue(sortedValues),
  },
  {
    name: "Four of a Kind",
    validator: ({ multiOccurenceValues }) => multiOccurenceValues.has(4),
    // index 0 because there can only be one Four of a Kind
    value: ({ multiOccurenceValues }) => multiOccurenceValues.get(4)[0],
  },
  {
    name: "Full House",
    validator: ({ multiOccurenceValues }) =>
      multiOccurenceValues.has(3) && multiOccurenceValues.has(2),
    // index 0 because there can only be one Three of a Kind
    value: ({ multiOccurenceValues }) => multiOccurenceValues.get(3)[0],
  },
  {
    name: "Flush",
    validator: ({ isFlush }) => isFlush,
    value: ({ sortedValues }) => sortedValues.at(-1),
  },
  {
    name: "Straight",
    validator: ({ isStraight }) => isStraight,
    value: ({ sortedValues }) => getStraightHandValue(sortedValues),
  },
  {
    name: "Three of a Kind",
    validator: ({ multiOccurenceValues }) => multiOccurenceValues.has(3),
    // index 0 because there can only be one Three of a Kind
    value: ({ multiOccurenceValues }) => multiOccurenceValues.get(3)[0],
  },
  {
    name: "Two Pairs",
    validator: ({ multiOccurenceValues }) =>
      multiOccurenceValues.get(2)?.length === 2,
    value: ({ multiOccurenceValues }) => multiOccurenceValues.get(2).at(-1),
  },
  {
    name: "One Pair",
    validator: ({ multiOccurenceValues }) => multiOccurenceValues.has(2),
    value: ({ multiOccurenceValues }) => multiOccurenceValues.get(2)[0],
  },
  {
    name: "High Card",
    validator: () => true,
    value: ({ sortedValues }) => sortedValues.at(-1),
  },
];

function getHandRank(handFacts) {
  return HAND_RULES.findIndex(({ validator }) => validator(handFacts));
}

// console.log(
//   getHandFacts([
//     [14, "h"],
//     [10, "h"],
//     [10, "h"],
//     [10, "h"],
//     [10, "h"],
//   ]),
// );

function pokerHands(arr) {
  let p1WinCount = 0;

  for (const roundHandsStr of arr) {
    const { p1Cards, p2Cards } = getTwoPlayersCards(roundHandsStr);
    const p1HandFacts = getHandFacts(p1Cards);
    const p2HandFacts = getHandFacts(p2Cards);
    const p1Rank = getHandRank(p1HandFacts);
    const p2Rank = getHandRank(p2HandFacts);

    if (p1Rank !== p2Rank) {
      if (p1Rank < p2Rank) {
        p1WinCount++;
      }
      // if p1Rank > p2Rank then only continue
      continue;
    }

    // p1Rank === p2Rank
    const sharedRule = HAND_RULES[p1Rank];
    const p1HandValue = sharedRule.value(p1HandFacts);
    const p2HandValue = sharedRule.value(p2HandFacts);

    if (p1HandValue !== p2HandValue) {
      if (p1HandValue > p2HandValue) {
        p1WinCount++;
      }
      continue;
    }

    // p1HandValue === p2HandValue
    // special handling for Two Pairs
    if (sharedRule.name === "Two Pairs") {
      const p1LowerPairValue = p1HandFacts.multiOccurenceValues.get(2)[0];
      const p2LowerPairValue = p2HandFacts.multiOccurenceValues.get(2)[0];
      if (p1LowerPairValue !== p2LowerPairValue) {
        if (p1LowerPairValue > p2LowerPairValue) {
          p1WinCount++;
        }
        continue;
      }
    }

    // proceed to compare highest leftovers of pairs/same kinds
    // reverse in place as it is the last time the array will be used
    const p1LeftoversDescending = p1HandFacts.pairOrSameKindLeftovers.reverse();
    const p2LeftoversDescending = p2HandFacts.pairOrSameKindLeftovers.reverse();
    for (let i = 0; i < p1LeftoversDescending.length; i++) {
      if (p1LeftoversDescending[i] !== p2LeftoversDescending[i]) {
        if (p1LeftoversDescending[i] > p2LeftoversDescending[i]) {
          p1WinCount++;
        }
        // either player has won here if leftover value is not the same
        break;
      }
    }
  }

  return p1WinCount;
}

console.log(pokerHands(testArr));
