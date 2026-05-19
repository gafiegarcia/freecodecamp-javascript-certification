"use strict" // perhaps forcing me to be less dumb?

// CAUTION: imgLink properties on the players array caused the test to fail. but somehow the <img> string line on the generatePlayerCards function doesn't make the tests fail. perhaps the tests engine uses innerText or something to check the rendered cards against the data.

const footballTeam = {
  team: "Football - First Team",
  year: 2026,
  headCoach: "Hansi Flick",
  players: [
    {
      name: "Joan Garcia",
      position: "goalkeeper",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/81c7699c-1298-45d6-834e-df72d8c550c8/01-Joan_Garcia.png?width=1340&height=1580",
    },
    {
      name: "Wojciech Szczęsny",
      position: "goalkeeper",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/adf97c66-a953-4225-a772-eb6c0258ed2b/25-Szczesny.png?width=1340&height=1580",
    },
    {
      name: "João Cancelo",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2026/01/15/4c9c8ca8-7d08-4325-8566-3aa3fce05d14/00-Cancelo.png?width=1340&height=1580",
    },
    {
      name: "Alejandro Balde",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/0d332686-2eee-4297-a099-bab75c7c35bb/03-Balde.png?width=1340&height=1580",
    },
    {
      name: "Ronald Araujo",
      position: "defender",
      isCaptain: true,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/072afc10-1ec9-483e-a4a5-8775cb6cea23/04-Araujo.png?width=1340&height=1580",
    },
    {
      name: "Pau Cubarsí",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/8c77ff44-6a20-4b1f-9991-bb3937af9ce4/02-Cubarsi.png?width=1340&height=1580",
    },
    {
      name: "Andreas Christensen",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/d2083355-8ef0-4398-94ae-7d84615de3c2/15-Christensen.png?width=1340&height=1580",
    },
    {
      name: "Gerard Martín",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/a4ea019d-b5b3-4b6e-a970-79fe8afc8bfd/18-Martin.png?width=1340&height=1580",
    },
    {
      name: "Jules Kounde",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/089a6980-e8be-46fe-900c-4202293ef729/23-Kounde.png?width=1340&height=1580",
    },
    {
      name: "Eric Garcia",
      position: "defender",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/bbfb1ea9-ad02-466c-80ba-ab2da4c3ce25/24-Eric_Garcia.png?width=1340&height=1580",
    },
    {
      name: "Gavi",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/7f610def-b5e6-46ce-9891-9e6988b89e29/06-Gavi.png?width=1340&height=1580",
    },
    {
      name: "Pedri",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/3dd2346c-01bb-4ad9-9b62-ed5cbf8d8b06/08-Pedri.png?width=1340&height=1580",
    },
    {
      name: "Fermín López",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/133e2b63-bc19-4d56-8e10-661ff5270823/16-Fermin.png?width=1340&height=1580",
    },
    {
      name: "Marc Casadó",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/962219f5-5db9-45e1-95a6-50c6329ed2ac/17-Casado.png?width=1340&height=1580",
    },
    {
      name: "Dani Olmo",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/eec9fdad-d078-4780-b0c3-4d9fe2f3b328/20-Olmo.png?width=1340&height=1580",
    },
    {
      name: "Frenkie De Jong",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/b62d13a8-5712-4823-b627-18dcce921378/21-De_Jong.png?width=1340&height=1580",
    },
    {
      name: "Marc Bernal",
      position: "midfielder",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/a4f602c5-5476-4db3-9148-0a6fee1767fb/22-Bernal.png?width=1340&height=1580",
    },
    {
      name: "Ferran Torres",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/05ad9394-0706-4043-8315-1795193f17ad/07-Ferran_Torres.png?width=1340&height=1580",
    },
    {
      name: "Robert Lewandowski",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/3f98839a-bac3-451e-9431-6d58b79588d5/09-Lewandowski.png?width=1340&height=1580",
    },
    {
      name: "Lamine Yamal",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/aae1899c-adb7-450a-b705-61cad72d2508/10-Lamine.png?width=1340&height=1580",
    },
    {
      name: "Raphinha",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/369f0d8e-3301-4f3d-9507-246371f8e3d2/11-Raphinha.png?width=1340&height=1580",
    },
    {
      name: "Marcus Rashford",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/6e30bc77-d2b9-4c6f-9a93-6a55628c4d5b/14-Rashford.png?width=1340&height=1580",
    },
    {
      name: "Roony Bardghji",
      position: "forward",
      isCaptain: false,
      imgLink: "https://www.fcbarcelona.com/photo-resources/2025/09/09/9b946f2d-3dc7-4c96-ab7c-4a0e36e679cf/28-Bardghji.png?width=1340&height=1580",
    },
  ],
}

// display static team stats
const team = document.getElementById("team");
const year = document.getElementById("year");
const headCoach = document.getElementById("head-coach");

team.textContent = footballTeam.team;
year.textContent = footballTeam.year;
headCoach.textContent = footballTeam.headCoach;

// generate player cards baseed on filter
const filter = document.getElementById("players");
const playerCards = document.getElementById("player-cards");

function showFilteredPlayers() {
  const filteredPlayers = filter.value === "all"
    ? footballTeam.players
    : footballTeam.players.filter((p) => p.position === filter.value);

  const generatePlayerCards = array => {
    let result = "";
    array.forEach(player => {
      result += `
  <div class="player-card">
    <a href="https://www.fcbarcelona.com/en/football/first-team/players" rel="noopener noreferrer" target="_blank">
      <img src="${player.imgLink}" aria-hidden="true" loading="lazy" alt="">
      <h2>${player.isCaptain ? "(Captain) " : ""}${player.name}</h2>
      <p class="position">${player.position}</p>
    </a>
  </div>`;
    });

    return result;
  }

  playerCards.innerHTML = generatePlayerCards(filteredPlayers);
}

showFilteredPlayers();

filter.addEventListener("change", () => {
  showFilteredPlayers();
})
