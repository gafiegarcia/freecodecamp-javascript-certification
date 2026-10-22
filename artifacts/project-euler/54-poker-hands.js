const testArr = [
  "8C TS KC 9H 4S 7D 2S 5D 3S AC",
  "5C AD 5D AC 9C 7C 5H 8D TD KS",
  "3H 7H 6S KC JS QH TD JC 2D 8S",
  "TH 8H 5C QS TC 9H 4D JC KS JS",
  "7C 5H KC QH JD AS KH 4C AD 4S",
];

const VALUE_MAP = { A: 1, T: 10, J: 11, Q: 12, K: 13 };

const valueOf = (val) => VALUE_MAP[val] ?? +val;
const splitSuitVal = (card) => [valueOf(card[0]), card[1]];

function getTwoPlayersCards(roundHandsStr) {
  const hands = roundHandsStr.split(" ");
  const p1Cards = hands.slice(0, 5).map(splitSuitVal);
  const p2Cards = hands.slice(5).map(splitSuitVal);

  return { p1Cards, p2Cards };
}

// TODO: delete when confirmed unused
// const isAscending = (arr) => {
//   for (let i = 1; i < arr.length; i++) {
//     if ((arr[i] = arr[i - 1] !== 1)) return false;
//   }
//   return true;
// };

function getHandFacts(cards) {
  const sortedCards = cards.sort(([val1], [val2]) => val1 - val2);
  const hasAce = sortedCards[0][0] === 1;
  const highestCard = hasAce ? 14 : sortedCards.at(-1)[0];

  const values = [];
  const sameValueCounts = {};
  let isStraight = true;
  let isFlush = true;
  const firstSuit = sortedCards[0][1];
  for (let i = 0; i < sortedCards.length; i++) {
    const [val, suit] = sortedCards[i];
    values.push(val);
    sameValueCounts[val] = (sameValueCounts[val] ?? 0) + 1;

    if (i === 0) continue;
    if (val - sortedCards[i - 1][0] !== 1) isStraight = false;
    if (suit !== firstSuit) isFlush = false;
  }

  const isRoyal = values.join("") === "110111213";
  // making sure high ace straight, which only happens in royal values, is accounted for.
  isStraight = isStraight || isRoyal;
  const sameKinds = Object.entries(sameValueCounts)
    .filter(([, count]) => count > 1)
    .map(([valStr, count]) => [+valStr, count]);

  return { sortedCards, highestCard, isRoyal, isStraight, isFlush, sameKinds };
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
    value: ({ isRoyal, sortedCards }) =>
      isRoyal || hasAce ? 14 : sortedCards.at(-1)[0],
  },
  {
    name: "Four of a Kind",
    validator: ({ sameKinds }) =>
      sameKinds.findIndex(([, count]) => count === 4) !== -1,
    value: ({ sameKinds }) => {
      const value = sameKinds[0][0];
      return value === 1 ? 14 : value;
    },
  },
  {
    name: "Full House",
    validator: ({ sameKinds }) =>
      sameKinds.findIndex(([, count]) => count === 3) !== -1 &&
      sameKinds.findIndex(([, count]) => count === 2) !== -1,
    value: ({ sameKinds }) => {
      const value = sameKinds.find(([, count]) => count === 3)[0];
      return value === 1 ? 14 : value;
    },
  },
  {
    name: "Flush",
    validator: ({ isFlush }) => isFlush,
    value: ({ highestCard }) => highestCard,
  },
  {
    name: "Straight",
    validator: ({ isStraight }) => isStraight,
    value: ({ highestCard }) => highestCard,
  },
  {
    name: "Three of a Kind",
    validator: ({ sameKinds }) =>
      sameKinds.findIndex(([, count]) => count === 3) !== -1,
    value: ({ sameKinds }) => {
      const value = sameKinds.find(([, count]) => count === 3)[0];
      return value === 1 ? 14 : value;
    },
  },
  {
    name: "Two Pairs",
    validator: ({ sameKinds }) =>
      sameKinds.findIndex(([, count]) => count === 2) !==
      sameKinds.findLastIndex(([, count]) => count === 2),
    value: ({ sameKinds }) => {
      const firstValue = sameKinds.find(([, count]) => count === 2)[0];
      const secondValue = sameKinds.findLast(([, count]) => count === 2)[0];
      if (firstValue === 1 || secondValue === 1) return 14;
      return Math.max(firstValue[0], secondValue[0]);
    },
  },
  {
    name: "One Pair",
    validator: ({ sameKinds }) =>
      sameKinds.length === 1 && sameKinds[0][1] === 2,
    value: ({ sameKinds: [value] }) => (value === 1 ? 14 : value),
  },
  {
    name: "High Card",
    validator: () => true,
    value: ({ highestCard }) => highestCard,
  },
];

function getRankAndRankValue(handFacts) {
  const rank = HAND_RULES.findIndex(({ validator }) => validator(handFacts));
  const rankValue = HAND_RULES[rank].value(handFacts);
  return { rank, rankValue };
}

// console.log(
//   getHandFacts([
//     [1, "s"],
//     [10, "s"],
//     [10, "d"],
//     [10, "h"],
//     [10, "c"],
//   ]),
// );

function pokerHands(arr) {
  let p1WinCount = 0;

  for (const roundHandsStr of arr) {
    const { p1Cards, p2Cards } = getTwoPlayersCards(roundHandsStr);
    const p1HandFacts = getHandFacts(p1Cards);
    const p2HandFacts = getHandFacts(p2Cards);
    const { rank: p1Rank, rankValue: p1RankValue } =
      getRankAndRankValue(p1HandFacts);
    const { rank: p2Rank, rankValue: p2RankValue } =
      getRankAndRankValue(p2HandFacts);

    if (p1Rank < p2Rank) {
      p1WinCount++;
    } else if (p1Rank === p2Rank) {
      if (p1RankValue > p2RankValue) {
        p1WinCount++;
      } else if (
        p1RankValue === p2RankValue &&
        p1HandFacts.highestCard > p2HandFacts.highestCard
      ) {
        p1WinCount++;
      }
    }
  }

  return p1WinCount;
}

console.log(pokerHands(testArr));
