import { Controller, accept } from '@curveball/controller'
import { BadRequest, ServiceUnavailable } from '@curveball/http-errors/dist'
import type { Context } from '@curveball/core'

import { initialiseGpt } from './query.js'

const isNil = (value: unknown): value is null | undefined => value === undefined || value === null
const debug = (message: string): void => {
  if (process.env['NODE_ENV'] === 'development') {
    console.log(message)
  }
}

type HashFn = (input: string) => string
interface Cache {
  get: (key: string) => string | undefined
  set: (key: string, value: string) => void
}

export class GptController extends Controller {
  private api?: Awaited<ReturnType<typeof initialiseGpt>>

  constructor (
    private readonly hash: HashFn,
    private readonly cache: Cache
  ) {
    super()

    initialiseGpt().then(api => {
      debug('ChatGPT initialised')
      this.api = api
    }).catch(error => {
      console.error(error)
      process.exit(1)
    })
  }

  @accept('application/json')
  async post (ctx: Context<{ query?: string }>): Promise<void> {
    const { query } = ctx.request.body
    if (isNil(query)) throw new BadRequest('Field \'query\' is missing')
    const hash = this.hash(query)

    ctx.response.type = 'application/json'
    ctx.response.body = {
      message: await this.cachedQuery(hash, this.queryGpt.bind(this, query))
    }
  }

  async queryGpt (query: string): Promise<string> {
    if (isNil(this.api)) throw new ServiceUnavailable('API not connected to ChatGPT', 5000)
    const { response } = await this.api.sendMessage(query)
    return response
  }

  async cachedQuery (hash: string, query: () => Promise<string>): Promise<string> {
    const match = this.cache.get(hash)
    debug(`Cache ${isNil(match) ? 'miss' : 'hit'} for ${hash.substring(0, 10)}`)

    const data = match ?? await query()

    if (isNil(match)) this.cache.set(hash, data)

    return data
  }
}
