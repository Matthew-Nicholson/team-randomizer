export function helpMenu() {
  console.log(`
      Usage: node index.js [options]

      Options:
        -i, --include   Comma separated list of players to include
        -e, --exclude   Comma separated list of players to exclude, overrides include
        -h, --help      Show help
        -s, --set-path  Set file path to players list. \nPlayers list must be a .js file that exports an array of objects with the following properties:
        first: string;
        last: string;
        tier: number;
        available: boolean;
    `);
}
