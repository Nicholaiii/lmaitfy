import { Application } from '@curveball/core'
import bodyParser from '@curveball/bodyparser'
import router from '@curveball/router'
import problemMw from '@curveball/problem'

import { GptController } from './gpt/controller.js'

export function start (port: number, GptDeps: ConstructorParameters<typeof GptController>): void {
  const app = new Application()

  app.use(bodyParser())
  app.use(problemMw())

  app.use(router('/gpt', new GptController(...GptDeps)))

  app.listen(port)
}
