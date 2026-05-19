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
      imgLink: "../../assets/images/01-Joan_Garcia.png",
    },
    {
      name: "Wojciech Szczęsny",
      position: "goalkeeper",
      isCaptain: false,
      imgLink: "../../assets/images/25-Szczesny.png",
    },
    {
      name: "João Cancelo",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/00-Cancelo.png",
    },
    {
      name: "Alejandro Balde",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/03-Balde.png",
    },
    {
      name: "Ronald Araujo",
      position: "defender",
      isCaptain: true,
      imgLink: "../../assets/images/04-Araujo.png",
    },
    {
      name: "Pau Cubarsí",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/02-Cubarsi.png",
    },
    {
      name: "Andreas Christensen",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/15-Christensen.png",
    },
    {
      name: "Gerard Martín",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/18-Martin.png",
    },
    {
      name: "Jules Kounde",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/23-Kounde.png",
    },
    {
      name: "Eric Garcia",
      position: "defender",
      isCaptain: false,
      imgLink: "../../assets/images/24-Eric_Garcia.png",
    },
    {
      name: "Gavi",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/06-Gavi.png",
    },
    {
      name: "Pedri",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/08-Pedri.png",
    },
    {
      name: "Fermín López",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/16-Fermin.png",
    },
    {
      name: "Marc Casadó",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/17-Casado.png",
    },
    {
      name: "Dani Olmo",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/20-Olmo.png",
    },
    {
      name: "Frenkie De Jong",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/21-De_Jong.png",
    },
    {
      name: "Marc Bernal",
      position: "midfielder",
      isCaptain: false,
      imgLink: "../../assets/images/22-Bernal.png",
    },
    {
      name: "Ferran Torres",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/07-Ferran_Torres.png",
    },
    {
      name: "Robert Lewandowski",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/09-Lewandowski.png",
    },
    {
      name: "Lamine Yamal",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/10-Lamine.png",
    },
    {
      name: "Raphinha",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/11-Raphinha.png",
    },
    {
      name: "Marcus Rashford",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/14-Rashford.png",
    },
    {
      name: "Roony Bardghji",
      position: "forward",
      isCaptain: false,
      imgLink: "../../assets/images/28-Bardghji.png",
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
