

import express from 'express'
import http from 'http'

import { parse, SQLiteInit } from './functions.js'


const app = express();
app.use(express.json())
app.use(express.urlencoded({
    "extended": true
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
/**
 * 接收訊息
 */
app.post('/', async (req, res) => {
    const userID = req.body["events"][0]["source"]["userId"]
    const message = req.body["events"][0]["message"]["text"]
    // console.log(userID, " Say : ",  req.body)
    try {
        parse(userID, message);

    } catch (err) {
        for (let i in err) {
            console.log(i)
        }
    }
    return res.json().status(200)
})

app.post('/call/:user', async (req, res) => {
    try {
        const userID = req.params.user
        console.log(req.body)
        try {
            await client.pushMessage({
                "to": userID,
                "messages": [
                    {
                        "text": req.body,
                        "type": "text"
                    }
                ]
            })
        } catch (err) {
            for (let i in err) {
                // console.log(err)
            }
        }
        return res.json().status(200)

    } catch (err) {
        console.log('Error')
    }

    return res.json({}).end()
})
const port = 8081
http.createServer(app).listen(port).on('listening', () => {
    SQLiteInit()
    console.log(`Listening on ${port}`)
})