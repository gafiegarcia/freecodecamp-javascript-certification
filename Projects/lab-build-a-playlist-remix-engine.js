const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

function flattenPlaylists(playlists) {
  if (!Array.isArray(playlists)) {
    console.log("not an array!");
    return [];
  }

  let flatPlaylist = [];
  for (let i = 0; i < playlists.length; i++) {
    const playlist = playlists[i];
    for (let j = 0; j < playlist.length; j++) {
      const track = playlists[i][j];
      track.source = [i, j];
      flatPlaylist.push(track);
    }
  }
  return flatPlaylist;
}

function scoreTracks(flatPlaylist) {
  const flatPlaylistPlusScore = flatPlaylist;
  for (const track of flatPlaylistPlusScore) {
    const score = track.votes * 10 - Math.abs(track.bpm - 120);
    track.score = score;
  }
  return flatPlaylistPlusScore;
}

function dedupeTracks(flatPlaylist) {
  const uniqueTrackIds = [];
  const dedupedPlaylist = [];

  for (const track of flatPlaylist) {
    if (uniqueTrackIds.includes(track.trackId)) {
      console.log(track);
      continue;
    }

    uniqueTrackIds.push(track.trackId);
    dedupedPlaylist.push(track);
  }

  return dedupedPlaylist;
}

// TODO: delete
const dedupedTracks = dedupeTracks(scoreTracks(flattenPlaylists(playlists)));

function enforceArtistQuota(flatPlaylist, artistQuota) {
  // input validation
  if (artistQuota < 1) {
    console.error("goblog");
    return;
  }

  const quotaEnforcedFlatPlaylist = [];
  const artistOccurences = {};

  for (const track of flatPlaylist) {
    if (!Object.hasOwn(artistOccurences, track.artist)) {
      artistOccurences[track.artist] = 1
      quotaEnforcedFlatPlaylist.push(track);
    } else if (artistOccurences[track.artist] >= artistQuota) {
      continue;
    } else {
      artistOccurences[track.artist] += 1;
      quotaEnforcedFlatPlaylist.push(track);
    }
  }

  return quotaEnforcedFlatPlaylist;
}

// TODO: delete
const quotaEnforcedTracks = enforceArtistQuota(dedupedTracks, 1);

function buildSchedule(flatPlaylist) {
  const playlistWithSchedule = [];

  for (let i = 0; i < flatPlaylist.length; i++) {
    const slot = i + 1
    const trackId = flatPlaylist[i].trackId;

    playlistWithSchedule.push({ slot, trackId })
  }

  return playlistWithSchedule;
}

// TODO: delete
const playlistWithSchedule = buildSchedule(quotaEnforcedTracks);

function remixPlaylist(playlists, artistQuota) {
  return buildSchedule(enforceArtistQuota(dedupeTracks(scoreTracks(flattenPlaylists(playlists))), artistQuota));
} 

console.log(remixPlaylist(playlists, 2));
