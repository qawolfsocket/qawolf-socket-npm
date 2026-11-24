// Writes index.js and README.md for one release, exactly as the Socket flows'
// prepareNpmWorkingDirectory helper wrote them when the runner published.
// The npm-publish workflow runs it before `npm publish`.
// Usage: node scripts/write-files.js 1.0.720
const fs = require("node:fs");

const version = process.argv[2];
if (!version) throw new Error("Usage: node scripts/write-files.js <version>");
const packageName = "qawolf-socket-npm";

const code = `
// QA Wolf Test Package v${version}
module.exports = {
  version: '${version}',
  test: () => 'QA Wolf test passed!',
  timestamp: '${new Date().toISOString()}',
  build: ${Date.now()},
  info: {
    name: '${packageName}',
    description: 'QA Wolf automation package',
    dependencies: ['lodash', 'axios', 'ws', 'uuid', 'moment']
  }
};
`;
fs.writeFileSync("index.js", code);

// No blank lines: the README the runner published (1.0.725, 2026-11-24) had none,
// although the helper's source shows some.
const readme = `# ${packageName}
Version: ${version}
Updated: ${new Date().toISOString()}
## Installation
\`\`\`bash
npm install ${packageName}
\`\`\`
## Usage
\`\`\`javascript
const qaWolf = require('${packageName}');
console.log(qaWolf.test());
console.log('Version:', qaWolf.version);
\`\`\`
## Dependencies
- lodash: Utility functions
- axios: HTTP client
- ws: WebSocket client
- uuid: UUID generation
- moment: Date formatting
`;
fs.writeFileSync("README.md", readme);
