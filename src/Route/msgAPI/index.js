import { Router } from 'express'
import { sendMessage, parse } from '../../functions.js'
import call from './call/index.js'
import asyncHandler from 'express-async-handler'

const route = Router()

/**
 * 接收訊息
 */
route.post('/', asyncHandler(async (req, res) => {

    // console.log(req.body)
    const userID = req.body?.events[0]?.source?.userId
    const message = req.body?.events[0]?.message?.text
    // console.log(userID, " Say : ", message)
    try {
        parse(userID, message);
    } catch (err) {
        for (let i in err) {
            console.log(i)
        }
    }


    return res.json().status(200)
}))

route.use("call", call)

route.get('/', asyncHandler(async (req, res) => {
    await sendMessage("Ue14752ca3a22386b3ad7f9293f286b1a", "Hello")
    return res.json({}).end()
}))


export default route;