import http from 'http'
import app from './main.js'
import { SQLiteInit } from './functions.js'
import tcp from './tcpServer/tcp.js'

const port = 8081

http.createServer(app).listen(port).on('listening', () => {
    SQLiteInit()
    console.log(`Listening on ${port}`)
})