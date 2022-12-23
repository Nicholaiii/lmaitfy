import { Controller, accept } from '@curveball/controller'
import { BadRequest } from '@curveball/http-errors/dist'
import type { Context } from '@curveball/core'
import { isNil } from 'ramda'
import { setTimeout } from 'node:timers/promises'

type HashFn = (input: string) => string
interface Cache {
  get: (key: string) => string | undefined
  set: (key: string, value: string) => void
}

export class GptController extends Controller {
  constructor (
    private readonly hash: HashFn,
    private readonly cache: Cache
  ) {
    super()
  }

  @accept('application/json')
  async post (ctx: Context<{ query?: string }>): Promise<void> {
    const { query } = ctx.request.body
    if (isNil(query)) throw new BadRequest('Field \'query\' is missing') // eslint-disable-line
    const hash = this.hash(query)

    ctx.response.type = 'application/json'
    ctx.response.body = {
      message: await this.cachedQuery(hash, this.queryGpt.bind(this, query))
    }
  }

  async queryGpt (query: string): Promise<string> {
    await setTimeout(666) /* very expensive api request */
    return 'Hello Gumse: ' + query
  }

  async cachedQuery (hash: string, query: () => Promise<string>): Promise<string> {
    const match = this.cache.get(hash)
    if (process.env['NODE_ENV'] === 'development') {
      console.log(`Cache ${isNil(match) ? 'miss' : 'hit'} for ${hash.substring(0, 10)}`)
    }

    const data = match ?? await query()

    if (isNil(match)) this.cache.set(hash, data)

    return data
  }
}
