import { Controller, accept } from '@curveball/controller'
import { BadRequest } from '@curveball/http-errors/dist'
import type { Context } from '@curveball/core'
import { isNil } from 'ramda'

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
  post (ctx: Context<{ query?: string }>): void {
    if (isNil(ctx.request.body.query)) throw new BadRequest('Field \'query\' is missing') // eslint-disable-line

    ctx.response.type = 'application/json'
    ctx.response.body = {
      message: 'Hello Gumse'
    }
  }
}
