import { randomizeTeams } from "./randomizeTeams.js";
import players from "./config.js";
import argv from "minimist";
import Fuse from "fuse.js";

(function () {
  const args = argv(process.argv.slice(2), {
    string: ["include", "exclude"],
    alias: {
      include: "i",
      exclude: "e",
      help: "h",
    },
  });
  // 1. Help
  if (args.help) {
    console.log(`
      Usage: node index.js [options]

      Options:
        -i, --include   Comma separated list of players to include
        -e, --exclude   Comma separated list of players to exclude, overrides include
        -h, --help      Show help
    `);
    return;
  }

  // 2. Filter players
  const includedPlayers = args.include ? args.include.split(",") : [];
  const excludedPlayers = args.exclude ? args.exclude.split(",") : [];

  const options = {
    includeScore: true,
    threshold: 0.2, // Tune this for "fuzziness"
    keys: ["first", "last", "first last", "last first"],
    caseSensitive: false,
  };
  const fuse = new Fuse(
    players.map((player) => ({
      ...player,
      "first last": `${player.first} ${player.last},`,
      "last first": `${player.last} ${player.first},`,
    })),
    options
  );

  const includedMatches = includedPlayers.map((player) => {
    const result = fuse.search(player);
    return result[0] ? result[0].item : null;
  });
  const excludedMatches = excludedPlayers.map((player) => {
    const result = fuse.search(player);
    return result[0] ? result[0].item : null;
  });

  // Turn all included matches available to true
  const playersWithAddedIncludes = players.map((player) => {
    const includedMatch = includedMatches.find(
      (match) =>
        match && match.first === player.first && match.last === player.last
    );
    if (includedMatch) {
      return {
        ...player,
        available: true,
      };
    }
    return player;
  });
  // Turn all excluded matches availble to false
  const playersRemovingExcludes = playersWithAddedIncludes.map((player) => {
    const excludedMatch = excludedMatches.find(
      (match) =>
        match && match.first === player.first && match.last === player.last
    );
    if (excludedMatch) {
      return {
        ...player,
        available: false,
      };
    }
    return player;
  });

  // New array of available players
  const playersToPair = playersRemovingExcludes.filter(
    (player) => player.available
  );

  // Randomize teams
  const { teamWhite, teamBlack } = randomizeTeams(playersToPair);

  // Print teams
  console.log(`
  Team White:\n${teamWhite
    .map((player) => `${player.first} ${player.last}`)
    .sort()
    .join("\n")
    .trimStart()}

  Team Black:\n${teamBlack
    .map((player) => `${player.first} ${player.last}`)
    .sort()
    .join("\n")
    .trimStart()}
`);
})();
