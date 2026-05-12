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
      // Claude opus-4-7 reviews:
      // be consistent; if using `playlist` variable,
      // keep using it: `const track = playlist[j]`
      // instead of double bracket.

      // Naming the inner array makes the intent clearer 
      // ("this is one playlist") and removes a 
      // double-index lookup

      flatPlaylist.push(track);
    }
  }
  // Claude opus-4-7 reviews:
  // the idiomatic modern approach is `for...of`
  // with `.entries()`
  // for (const [i, playlist] of playlists.entries()) {
  //   for (const [j, track] of playlist.entries()) { ... }
  // }

  // Claude opus-4-7 reviews: `track.source = [i, j]` mutates the original track objects
  // Better with spread (does not mutate original):
  // flatPlaylist.push({ ...track, source: [i, j] });
  
  return flatPlaylist;
}

function scoreTracks(flatPlaylist) {
  const flatPlaylistPlusScore = flatPlaylist;
  for (const track of flatPlaylistPlusScore) {
    const score = track.votes * 10 - Math.abs(track.bpm - 120);
    track.score = score;
    // Claude opus-4-7 reviews:
    // elegant solution:
    // track.score = track.votes * 10 - Math.abs(track.bpm - 120)
    // The rule of thumb: an intermediate variable 
    // earns its keep when 
      // (a) it gives a name to something non-obvious, or 
      // (b) it's reused. 
    // Neither applies here

    // Claude opus-4-7 reviews:
    // BEST solution (that doesn't mutate original array nor the objects in it):
      // function scoreTracks(flatPlaylist) {
      //   return flatPlaylist.map(track => ({
      //     ...track,
      //     score: track.votes * 10 - Math.abs(track.bpm - 120)
      //   }));
      // }

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

// Claude opus-4-7 reviews:
// the elegant approach is `Set`, which I hadn't learned
// at this point in time.

// function dedupeTracks(flatPlaylist) {
//   const seen = new Set();
//   return flatPlaylist.filter(track => {
//     if (seen.has(track.trackId)) return false;
//     seen.add(track.trackId);
//     return true;
//   });
// }

// TODO: delete
const dedupedTracks = dedupeTracks(scoreTracks(flattenPlaylists(playlists)));

function enforceArtistQuota(flatPlaylist, artistQuota) {
  // input validation
  if (artistQuota < 1) {
    console.error("goblog");
    return;
  }

  // Claude opus-4-7 reviews:
  // Good instinct, but two refinements:

    // - The fCC requirement spec is the contract. Adding validation beyond it isn't wrong, but if you do it, do it consistently and meaningfully. Returning undefined silently breaks the caller (buildSchedule would then crash on undefined.length). Better: throw new Error("artistQuota must be >= 1") — fail loudly at the boundary, don't propagate a bad state.
    // - `console.error("goblog")` — placeholder message. Always treat error strings as user-facing-ish: they'll show up in logs someday and "goblog" will haunt you.
    // - Real-world rule: validate at system boundaries (user input, API responses, file I/O). Internal helper functions called by your own code don't need it — you trust your own callers.


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

  // Claude opus-4-7 reviews:
  // The function name carries the meaning;
  // the local doesn't have to repeat it.

  // const result = [];
  // // ...
  // result.push(track);

  // instead of "quotaEnforcedFlatPlaylist"

  // AND artistOccurrences instead of artistOccurences
  // (double r's). typo = tech debt. grep may fail later

  // Claude opus-4-7 reviews:
    // - For comparisons in conditions: prefer >=/<= (defensive). The point of the condition is "is this thing at or past the limit?" — that's a range question, not an equality question.
    // - For assertions / invariants: use === and let it crash. If you genuinely believe "this can only ever equal X," express that, and a violation is a bug you want to know about.
  // So in your case, >= is correct because the semantic question is "have we hit the quota?" not "is this exactly the quota?". The fact that they happen to coincide is incidental.

  // The deeper lesson: write the condition that matches the meaning, not the condition that matches the current data flow. If you change += 1 to += 2 later, the >= version still asks the right question; the === version doesn't.


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
// Claude opus-4-7 reviews:
// eleganto solutione:
  // function remixPlaylist(playlists, artistQuota) {
  //   const flat = flattenPlaylists(playlists);
  //   const scored = scoreTracks(flat);
  //   const deduped = dedupeTracks(scored);
  //   const quoted = enforceArtistQuota(deduped, artistQuota);
  //   return buildSchedule(quoted);
  // }

// key: it's better to read TOP-TO-BOTTOM rather than INSIDE-OUT

console.log(remixPlaylist(playlists, 2));



// Claude opus-4-7 closing lesson:
// Lesson: 
  // `=` on arrays/objects creates an ALIAS, not a copy.
  // flatPlaylistPlusScore and flatPlaylist point to the SAME array.
  // Shallow copy: [...arr] or arr.map(x => x) or arr.slice()
  // Deep copy: structuredClone(arr)
