import { createServer } from 'http'
import config from './config.json'

import app from './app'

app.set('port', config.http.port)

const server = createServer(app)

server.listen(app.get('port'), () => {
    console.log('✔ Server listening on port'.green, String(app.get('port')).cyan)
})
