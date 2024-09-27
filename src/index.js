import * as line from '@line/bot-sdk'
import fs from 'fs'
import express from 'express'
import http from 'http'
import cryto from 'crypto'


const secretJson = JSON.parse(fs.readFileSync("secret.json", { encoding: "utf-8" }))
const token = "Irzd5+ncVovKDaphFyh6YS4QGIIQNulKuYDA/sU7EBvKeWxuchJowAykMGRm46PDtNaPJKv1qsXwF/FSMPPBL6234lundk5WIlUYqJvmC3UrJKUwf6K/fDBAZs9JaaVgBkqtwyUM5x6oYu+eCviFSwdB04t89/1O/w1cDnyilFU="
const secret = "c34c2c8aa288788ef93a784a0181c9bc"
const config = {
    channelSecret: secret
}


const client = new line.messagingApi.MessagingApiClient({
    "channelAccessToken": token,
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({
    "extended":true
}))
app.use((req, res, next) => {
    console.log(req.url)
    next()
})


app.get('/', async (req, res) => {
    try {
        await client.pushMessage({
            "to": "Ue14752ca3a22386b3ad7f9293f286b1a",
            "messages": [
                {
                    "text": "Hello",
                    "type": "text"
                }
            ]
        })
    } catch (err) {
        for (let i in err) {
            console.log(err)
        }
    }
    return res.json({}).end()
})

app.post('/', async (req, res) => {
    const userID = req.body["events"][0]["source"]["userId"]
    try {
        await client.pushMessage({
            "to": userID,
            "messages": [
                {
                    "text": "Hello",
                    "type": "text"
                }
            ]
        })
    } catch (err) {
        for (let i in err) {
            console.log(err)
        }
    }
    return res.json().status(200)
})

app.post('/call/:user', async (req, res) => {
    try {
        const userID = req.params.user
    try {
        await client.pushMessage({
            "to": userID,
            "messages": [
                {
                    "text": req.body.message,
                    "type": "text"
                }
            ]
        })
    } catch (err) {
        for (let i in err) {
            console.log(err)
        }
    }
    return res.json().status(200)
        
    } catch (err) {
        console.log('Error')
    }

    return res.json({}).end()
})
const port = 80
http.createServer(app).listen(port).on('listening', () => {
    console.log(`Listening on ${port}`)
})