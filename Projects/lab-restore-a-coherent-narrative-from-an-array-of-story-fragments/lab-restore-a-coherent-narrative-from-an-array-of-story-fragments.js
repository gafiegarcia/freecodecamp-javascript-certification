const shuffledFragments = [
  { id: 15, text: "and, after a time, passed the place where the Hare was sleeping." },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 11, text: "and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare," },
  { id: 7, text: "but for the fun of the thing he agreed." },
  { id: 19, text: "The Hare now ran his swiftest," },
  ,
  { id: 1, text: "A Hare was making fun of the Tortoise one day for being so slow." },
  { id: 14, text: "The Tortoise meanwhile kept going slowly but steadily," },
  { id: 9, text: "marked the distance and started the runners off." },
  ,
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 17, text: "and when at last he did wake up," },
  { id: 2, text: '"Do you ever get anywhere?" he asked with a mocking laugh.' },
  { id: 12, text: "he lay down beside the course to take a nap" },
  ,
  { id: 8, text: "So the Fox, who had consented to act as judge," },
  { id: 20, text: "but he could not overtake the Tortoise in time." },
  { id: 5, text: "I'll run you a race and prove it.\"" },
  { id: 6, text: "The Hare was much amused at the idea of running a race with the Tortoise," },
  ,
  { id: 13, text: "until the Tortoise should catch up." },
  { id: 10, text: "The Hare was soon far out of sight," },
  { id: 12, text: "he lay down beside the course to take a nap" },
  { id: 18, text: "the Tortoise was near the goal." },
];

// the array above is pre-written by fcc and may not be changed

function compactFragments(array) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      result.push(array[i]);
    } else {
      console.log("[COMPACTED]", array[i]);
    }
  }

  return result;
}

const compactedShuffledFragments = compactFragments(shuffledFragments);

function sortFragments(array) {
  if (array.length < 1) return array;

  const result = [array[0]];

  for(let i = 1; i < array.length; i++) {
    let insertIndex = 0;
    
    while (insertIndex < result.length) {
      if(array[i].id < result[insertIndex].id) {
        break;
      }

      insertIndex++;
    }

    result.splice(insertIndex, 0, array[i]);
  }

  return result;
}

const sortedFragments = sortFragments(compactedShuffledFragments);

function dedupeFragments(array) {
  const result = [];
  let lastId;

  for (let i = 0; i < array.length; i++) {
    if(array[i].id !== lastId) {
      result.push(array[i]);
      lastId = array[i].id;
    } else {
      console.log("[DEDUPED]", array[i]);
    }
  }

  return result;
}

const dedupedFragments = dedupeFragments(sortedFragments);
// console.log(dedupedFragments);

function fillMissingFragments(array) {
  const result = [array[0]];
  let currentId = array[0].id + 1;

  for (let i = 1; i < array.length; i++) {
    if (currentId < array[i].id) {
      while (currentId < array[i].id) {
        const placeholder = { id: currentId, text: "[...]" };
        console.log("[FILLED]", placeholder);
        result.push(placeholder);
        currentId++;
      }
      result.push(array[i]);
      currentId++;
    } else {
      result.push(array[i]);
      currentId++;
    }
  }

  return result;
}

const filledFragments = fillMissingFragments(dedupedFragments);

function assembleStory(array) {
  let result = "";

  for(let i = 0; i < array.length; i++) {
    result += array[i].text;

    if (i !== array.length - 1) {
      result += "\n";
    }
  }

  return result;
}

console.log(assembleStory(filledFragments));