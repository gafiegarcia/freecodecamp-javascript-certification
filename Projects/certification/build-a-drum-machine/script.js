// init
const samples = {
  Q: {
    description: "Chord Cmaj7",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Chord_1.mp3",
  },
  W: {
    description: "Chord D",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Chord_2.mp3",
  },
  E: {
    description: "Chord E",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Chord_3.mp3",
  },
  A: {
    description: "Shaker",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Give_us_a_light.mp3",
  },
  S: {
    description: "Clap",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
  },
  D: {
    description: "Open HH",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3",
  },
  Z: {
    description: "Kick",
    url: "https://cdn.freecodecamp.org/curriculum/drum/punchy_kick_1.mp3",
  },
  X: {
    description: "Side Stick",
    url: "https://cdn.freecodecamp.org/curriculum/drum/side_stick_1.mp3",
  },
  C: {
    description: "Closed HH",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Bld_H1.mp3",
  },
};

const demoPattern1 = [
  { key: "Z", time: 100 },
  // { key: "Z", time: 425 },
  { key: "D", time: 1473 },
  { key: "C", time: 1473 },
  { key: "Q", time: 1489 },
  { key: "Z", time: 1490 },
  { key: "Q", time: 1820 },
  { key: "Z", time: 1823 },
  { key: "C", time: 1824 },
  { key: "D", time: 1824 },
  { key: "Q", time: 2468 },
  { key: "Z", time: 2474 },
  { key: "C", time: 2475 },
  { key: "D", time: 2476 },
  { key: "Q", time: 2811 },
  { key: "Z", time: 2811 },
  { key: "C", time: 2811 },
  { key: "D", time: 2811 },
  { key: "C", time: 4124 },
  { key: "D", time: 4125 },
  { key: "Z", time: 4140 },
  { key: "Z", time: 4631 },
  { key: "Z", time: 4763 },
  { key: "D", time: 4796 },
  { key: "C", time: 4805 },
  { key: "Z", time: 5305 },
  { key: "C", time: 5432 },
  { key: "D", time: 5433 },
  { key: "Z", time: 5443 },
  { key: "Z", time: 5770 },
  { key: "D", time: 5778 },
  { key: "C", time: 5789 },
  { key: "A", time: 6085 },
  { key: "X", time: 6098 },
  { key: "S", time: 6122 },
  { key: "Z", time: 6734 },
  { key: "Q", time: 6749 },
  { key: "D", time: 6757 },
  { key: "C", time: 6758 },
  { key: "C", time: 7091 },
  { key: "Z", time: 7231 },
  { key: "W", time: 7239 },
  { key: "S", time: 7396 },
  { key: "X", time: 7406 },
  { key: "D", time: 7727 },
  { key: "E", time: 7740 },
  { key: "Z", time: 7742 },
  { key: "C", time: 8070 },
  { key: "Z", time: 8288 },
  { key: "D", time: 8397 },
  { key: "E", time: 8397 },
  { key: "Z", time: 8405 },
  { key: "S", time: 8750 },
  { key: "X", time: 8751 },
  { key: "Z", time: 8966 },
  { key: "A", time: 8979 },
  { key: "C", time: 9082 },
  { key: "Z", time: 9429 },
  { key: "Q", time: 9439 },
  { key: "C", time: 9440 },
  { key: "D", time: 9440 },
  { key: "C", time: 9763 },
  { key: "W", time: 9959 },
  { key: "Z", time: 9972 },
  { key: "S", time: 10082 },
  { key: "X", time: 10083 },
  { key: "Z", time: 10419 },
  { key: "D", time: 10422 },
  { key: "E", time: 10423 },
  { key: "C", time: 10777 },
  { key: "Z", time: 10969 },
  { key: "Z", time: 11090 },
  { key: "D", time: 11107 },
  { key: "E", time: 11108 },
  { key: "S", time: 11452 },
  { key: "X", time: 11455 },
  { key: "Z", time: 11652 },
  { key: "A", time: 11667 },
  { key: "C", time: 11772 },
  { key: "Z", time: 12111 },
  { key: "Q", time: 12124 },
  { key: "C", time: 12139 },
  { key: "D", time: 12141 },
  { key: "C", time: 12465 },
  { key: "W", time: 12646 },
  { key: "Z", time: 12656 },
  { key: "S", time: 12772 },
  { key: "X", time: 12773 },
  { key: "Z", time: 13116 },
  { key: "D", time: 13128 },
  { key: "E", time: 13139 },
  { key: "C", time: 13464 },
  { key: "Z", time: 13769 },
  { key: "D", time: 13772 },
  { key: "E", time: 13772 },
  { key: "S", time: 14123 },
  { key: "X", time: 14125 },
  { key: "Z", time: 14330 },
  { key: "A", time: 14340 },
  { key: "C", time: 14456 },
  { key: "D", time: 14804 },
  { key: "Z", time: 14808 },
  { key: "C", time: 14809 },
  { key: "Q", time: 14823 },
  { key: "S", time: 15131 },
  { key: "X", time: 15133 },
  { key: "Z", time: 15299 },
  { key: "W", time: 15306 },
  { key: "Z", time: 15756 },
  { key: "D", time: 15772 },
  { key: "E", time: 15773 },
  { key: "Z", time: 17336 },
  { key: "Q", time: 17350 },
  { key: "C", time: 17356 },
  { key: "D", time: 17357 },
  { key: "C", time: 17717 },
  { key: "Z", time: 17873 },
  { key: "X", time: 17983 },
  { key: "S", time: 17989 },
  { key: "Q", time: 18309 },
  { key: "Z", time: 18323 },
  { key: "D", time: 18325 },
  { key: "C", time: 18326 },
  { key: "C", time: 18649 },
  { key: "Z", time: 18819 },
  { key: "A", time: 18950 },
  { key: "Z", time: 18950 },
  { key: "S", time: 19272 },
  { key: "X", time: 19274 },
  { key: "Z", time: 19920 },
  { key: "Q", time: 19923 },
  { key: "D", time: 19950 },
  { key: "C", time: 19956 },
  { key: "C", time: 20280 },
  { key: "Z", time: 20436 },
  { key: "X", time: 20573 },
  { key: "S", time: 20589 },
  { key: "C", time: 20881 },
  { key: "D", time: 20882 },
  { key: "Z", time: 20883 },
  { key: "Q", time: 20883 },
  { key: "C", time: 21212 },
  { key: "Z", time: 21385 },
  { key: "A", time: 21515 },
  { key: "Z", time: 21524 },
  { key: "S", time: 21820 },
  { key: "X", time: 21833 },
  { key: "Z", time: 22481 },
  { key: "Q", time: 22489 },
  { key: "C", time: 22506 },
  { key: "D", time: 22523 },
  { key: "C", time: 22819 },
  { key: "Z", time: 22995 },
  { key: "X", time: 23103 },
  { key: "S", time: 23112 },
  { key: "D", time: 23419 },
  { key: "Z", time: 23423 },
  { key: "C", time: 23423 },
  { key: "Q", time: 23424 },
  { key: "C", time: 23755 },
  { key: "Z", time: 23927 },
  { key: "Z", time: 24054 },
  { key: "A", time: 24069 },
  { key: "S", time: 24389 },
  { key: "X", time: 24406 },
  { key: "Z", time: 24559 },
  { key: "C", time: 24687 },
  { key: "Z", time: 25036 },
  { key: "Q", time: 25037 },
  { key: "C", time: 25050 },
  { key: "D", time: 25056 },
  { key: "C", time: 25349 },
  { key: "Z", time: 25549 },
  { key: "S", time: 25666 },
  { key: "X", time: 25667 },
  { key: "Z", time: 26010 },
  { key: "D", time: 26011 },
  { key: "C", time: 26011 },
  { key: "C", time: 26304 },
  { key: "Z", time: 26464 },
  { key: "Z", time: 26595 },
  { key: "C", time: 26639 },
  { key: "D", time: 26656 },
  { key: "S", time: 26963 },
  { key: "X", time: 26972 },
  { key: "Z", time: 27563 },
  { key: "D", time: 27573 },
  { key: "C", time: 27574 },
  { key: "Q", time: 27574 },
  { key: "C", time: 27901 },
  { key: "Z", time: 28069 },
  { key: "W", time: 28073 },
  { key: "S", time: 28191 },
  { key: "X", time: 28206 },
  { key: "Z", time: 28554 },
  { key: "D", time: 28556 },
  { key: "E", time: 28556 },
  { key: "C", time: 28880 },
  { key: "Z", time: 29066 },
  { key: "D", time: 29181 },
  { key: "E", time: 29181 },
  { key: "Z", time: 29195 },
  { key: "S", time: 29538 },
  { key: "X", time: 29539 },
  { key: "Z", time: 29723 },
  { key: "A", time: 29740 },
  { key: "C", time: 29864 },
  { key: "Z", time: 30201 },
  { key: "Q", time: 30202 },
  { key: "C", time: 30208 },
  { key: "D", time: 30209 },
  { key: "C", time: 30547 },
  { key: "W", time: 30728 },
  { key: "Z", time: 30740 },
  { key: "S", time: 30853 },
  { key: "X", time: 30856 },
  { key: "Z", time: 31186 },
  { key: "D", time: 31190 },
  { key: "E", time: 31206 },
  { key: "C", time: 31528 },
  { key: "Z", time: 31710 },
  { key: "D", time: 31818 },
  { key: "E", time: 31819 },
  { key: "Z", time: 31844 },
  { key: "S", time: 32170 },
  { key: "X", time: 32172 },
  { key: "Z", time: 32363 },
  { key: "A", time: 32373 },
  { key: "C", time: 32501 },
  { key: "Z", time: 32832 },
  { key: "Q", time: 32839 },
  { key: "C", time: 32856 },
  { key: "D", time: 32857 },
  { key: "C", time: 33173 },
  { key: "Z", time: 33352 },
  { key: "W", time: 33357 },
  { key: "X", time: 33474 },
  { key: "S", time: 33489 },
  { key: "Z", time: 33820 },
  { key: "D", time: 33832 },
  { key: "E", time: 33832 },
  { key: "C", time: 34153 },
  { key: "Z", time: 34344 },
  { key: "Z", time: 34455 },
  { key: "D", time: 34474 },
  { key: "E", time: 34474 },
  { key: "S", time: 34789 },
  { key: "X", time: 34790 },
  { key: "Z", time: 34994 },
  { key: "A", time: 35006 },
  { key: "C", time: 35128 },
  { key: "C", time: 35466 },
  { key: "D", time: 35473 },
  { key: "Z", time: 35474 },
  { key: "Q", time: 35474 },
  { key: "S", time: 35789 },
  { key: "X", time: 35790 },
  { key: "Z", time: 35966 },
  { key: "W", time: 35973 },
  { key: "Z", time: 36420 },
  { key: "D", time: 36432 },
  { key: "E", time: 36433 },
  { key: "X", time: 39674 },
  { key: "X", time: 40014 },
  { key: "Z", time: 40663 },
  { key: "C", time: 40673 },
  { key: "D", time: 40674 },
  { key: "C", time: 41023 },
  { key: "Z", time: 41210 },
  { key: "X", time: 41323 },
  { key: "S", time: 41340 },
  { key: "C", time: 41665 },
  { key: "Z", time: 41868 },
  { key: "C", time: 42008 },
  { key: "Z", time: 42172 },
  { key: "Z", time: 42312 },
  { key: "C", time: 42329 },
  { key: "D", time: 42330 },
  { key: "X", time: 42664 },
  { key: "S", time: 42673 },
  { key: "Z", time: 42858 },
  { key: "C", time: 42997 },
  { key: "Z", time: 43341 },
  { key: "C", time: 43357 },
  { key: "D", time: 43358 },
  { key: "C", time: 43681 },
  { key: "Z", time: 43889 },
  { key: "S", time: 44031 },
  { key: "X", time: 44039 },
  { key: "C", time: 44340 },
  { key: "Z", time: 44557 },
  { key: "C", time: 44700 },
  { key: "Z", time: 44881 },
  { key: "C", time: 45004 },
  { key: "D", time: 45005 },
  { key: "Z", time: 45023 },
  { key: "X", time: 45350 },
  { key: "S", time: 45356 },
  { key: "Z", time: 45564 },
  { key: "C", time: 45699 },
  { key: "Z", time: 46021 },
  { key: "C", time: 46032 },
  { key: "D", time: 46034 },
  { key: "C", time: 46353 },
  { key: "Z", time: 46583 },
  { key: "S", time: 46685 },
  { key: "X", time: 46689 },
  { key: "C", time: 47007 },
  { key: "Z", time: 47195 },
  { key: "C", time: 47339 },
  { key: "Z", time: 47524 },
  { key: "C", time: 47641 },
  { key: "D", time: 47656 },
  { key: "Z", time: 47673 },
  { key: "X", time: 47999 },
  { key: "S", time: 48000 },
  { key: "Z", time: 48195 },
  { key: "C", time: 48326 },
  { key: "Z", time: 48657 },
  { key: "C", time: 48676 },
  { key: "D", time: 48678 },
  { key: "C", time: 49006 },
  { key: "Z", time: 49208 },
  { key: "S", time: 49317 },
  { key: "X", time: 49323 },
  { key: "C", time: 49636 },
  { key: "Z", time: 49846 },
  { key: "C", time: 49972 },
  { key: "Z", time: 50156 },
  { key: "Z", time: 50297 },
  { key: "C", time: 50322 },
  { key: "D", time: 50324 },
  { key: "X", time: 50633 },
  { key: "S", time: 50643 },
];

const pads = document.querySelectorAll(".drum-pad");
const clips = Array.from(document.querySelectorAll(".clip"));
const keys = Object.keys(samples).map((k) => k.toLowerCase());
const display = document.getElementById("display");
const volume = document.getElementById("volume");
let isRecording = false;
let recordStartTime = 0;
const recordedArray = [];
const runningDemo = [];
let demoDehighlighter = null;
const demoPlayBtn = document.getElementById("demo-play-btn");
const demoStopBtn = document.getElementById("demo-stop-btn");

clips.forEach((clip) => {
  clip.title = samples[clip.id].description;
  clip.src = samples[clip.id].url;
});

navigator.mediaSession.metadata = new MediaMetadata({
  artist: "freecodecamp",
  title: "DRUM MACHINE",
});

volume.value = 0.75;

// functions
const handlePadClick = (e) => {
  const targetPad = e.target.closest(".drum-pad");
  const targetClip = targetPad.querySelector(".clip");

  if (targetClip) {
    playSample(targetClip);
    highlightPad(targetPad);
    setTimeout(() => {
      dimPad(targetPad);
    }, 90);
  }
};

const handleKey = (e) => {
  if (e.metaKey || e.shiftKey || e.repeat) return;
  if (!keys.includes(e.key)) return;

  const targetClip = clips.find((clip) => clip.id.toLowerCase() === e.key);
  const targetPad = targetClip.closest(".drum-pad");
  if (targetClip) {
    if (e.type === "keydown") {
      playSample(targetClip);
      highlightPad(targetPad);
    } else if (e.type === "keyup") {
      dimPad(targetPad);
    }
  }
};

const handleSampleEnd = (e) => {
  const targetPad = e.target.closest(".drum-pad");

  targetPad.classList.remove("playing");
};

const playSample = (clip) => {
  clip.currentTime = 0;
  clip.play();
  display.textContent = clip.title;

  if (isRecording) {
    recordedArray.push({
      key: clip.id,
      time: performance.now() - recordStartTime,
    });
  }
};

const highlightPad = (pad) => {
  pad.classList.add("active", "playing");
};

const dimPad = (pad) => {
  pad.classList.remove("active");
};

const dehighlightPad = (pad) => {
  pad.classList.remove("playing");
};

const changeVolume = () => {
  clips.forEach((clip) => {
    clip.volume = volume.value;
  });
};

const startRecording = () => {
  isRecording = true;
  recordedArray.length = 0;
  recordStartTime = performance.now();
  display.textContent = "● Recording…";
};

const stopRecording = () => {
  isRecording = false;
  display.textContent = "Recording stopped";
  console.log(JSON.stringify(recordedArray));
  return recordedArray;
};

const playDemo = (demo) => {
  demo.forEach((hit) => {
    const id = setTimeout(() => {
      const clip = clips.find((clip) => clip.id === hit.key);
      const pad = clip.closest(".drum-pad");

      playSample(clip);
      highlightPad(pad);
      setTimeout(() => {
        dimPad(pad);
      }, 100);
    }, hit.time);
    runningDemo.push(id);
  });
};

const stopDemo = () => {
  runningDemo.forEach((timeout) => clearTimeout(timeout));
  dehighlightDemoBtn();
};

const highlightDemoBtn = (demo) => {
  demoPlayBtn.classList.add("playing");
};

const dehighlightDemoBtn = () => {
  demoPlayBtn.classList.remove("playing");
};

// event listeners
pads.forEach((pad) => {
  pad.addEventListener("click", handlePadClick);
});

document.addEventListener("keydown", handleKey);
document.addEventListener("keyup", handleKey);

clips.forEach((clip) => {
  clip.addEventListener("ended", handleSampleEnd);
});

volume.addEventListener("input", changeVolume);

demoPlayBtn.addEventListener("click", () => {
  stopDemo();
  highlightDemoBtn(demoPattern1);
  playDemo(demoPattern1);

  if (demoDehighlighter !== null) clearTimeout(demoDehighlighter);
  demoDehighlighter = setTimeout(
    dehighlightDemoBtn,
    demoPattern1[demoPattern1.length - 1].time + 1000,
  );
});

demoStopBtn.addEventListener("click", stopDemo);
