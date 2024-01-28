import { shuffleArray } from "./shuffleArray.js";

export function randomizeTeams(players) {
  const tier1 = players.filter((player) => player.tier === 1);
  const tier2 = players.filter((player) => player.tier === 2);
  const tier3 = players.filter((player) => player.tier === 3);
  const allTiers = shuffleArray([tier1, tier2, tier3]); // We shuffle so one team doesn't end up with all the tier 1 players

  const teamWhite = [];
  const teamBlack = [];

  for (let tier of allTiers) {
    tier = shuffleArray(tier);
    for (let i = 0; i < tier.length; i++) {
      if (teamWhite.length <= teamBlack.length) {
        teamWhite.push(tier[i]);
      } else {
        teamBlack.push(tier[i]);
      }
    }
  }

  return {
    teamWhite,
    teamBlack,
  };
}
