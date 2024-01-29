# Team Randomizer

This is a command-line application that randomizes teams from a list of players.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository and install the dependencies:

```
git clone https://github.com/Matthew-Nicholson/team-randomizer.git
cd team-randomizer
npm install
```

Create a config file outlining the people to schedule. It should export default an array of objects with the following shape:

```
type Player = {
  first: string;
  last: string;
  tier: number;
  available: boolean;
};
```

Tell the randomizer where your config file is.
`node team-randomizer --set-path ./path-to-file.js`

## Usage

node team-randomizer [options]

      // Options

      include: "i",
      exclude: "e",
      help: "h",
      "set-path": "s",

## Contributing

Issues welcome

## License

MIT Copyright (c) 2024 Matthew Nicholson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
