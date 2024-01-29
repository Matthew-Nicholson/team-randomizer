export function printTeams(teamWhite, teamBlack) {
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
}
