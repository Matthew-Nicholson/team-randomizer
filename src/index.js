import fs from "fs";
import argv from "minimist";
import Fuse from "fuse.js";
import { randomizeTeams } from "./randomizeTeams.js";
import { helpMenu } from "./helpMenu.js";
import { updatePath } from "./updatePath.js";
import { printTeams } from "./printTeams.js";

(async function () {
  let players;
  try {
    const configPath = fs.readFileSync("./.path.txt", "utf8");
    if (!configPath) {
      throw new Error("No path set");
    }
    players = await import(configPath.trim()).then((module) => module.default);
    if (!players) {
      throw new Error("No players found");
    }
  } catch (error) {
    console.log(error, ": Use set-path to set the path to your players list");
  }

  const args = argv(process.argv.slice(2), {
    string: ["include", "exclude", "set-path"],
    alias: {
      "add-player": "a",
      include: "i",
      exclude: "e",
      help: "h",
      "remove-player": "r",
      "set-path": "s",
    },
  });

  if (args.help) {
    return helpMenu();
  }

  if (args["set-path"]) {
    return updatePath(args["set-path"]);
  }

  if (args["add-player"]) {
    // TODO
    return;
  }

  if (args["remove-player"]) {
    // TODO
    return;
  }

  // Filter players
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

  const playersToPair = playersRemovingExcludes.filter(
    (player) => player.available
  );

  const { teamWhite, teamBlack } = randomizeTeams(playersToPair);

  printTeams(teamWhite, teamBlack);
})();
