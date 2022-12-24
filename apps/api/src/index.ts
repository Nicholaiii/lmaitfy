/* eslint no-console:0 "@typescript-eslint/no-var-requires": 0 */
import * as app from './app.js'
import { sha256 } from './hash.js'
import { lru } from './lru-cache.js'

function main (port: number = 31337): void {
  console.log(`(っ◔◡◔)っ ♥ lmaitfy ♥ v${require('../package.json').version as string}`)
  app.start(port, [sha256, lru])
  console.log(`Listening on port ${port}`)
}

if (process.env['NODE_ENV'] !== 'test') {
  main()
}
