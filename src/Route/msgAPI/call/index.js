import { Router } from 'express'
import {  sendMessage, } from '../../../functions.js'


const route = Router()

route.post('/:user', async (req, res) => {
    try {
        const userID = req.params.user
        const message = req.body.message == "" ? "Hola Este mensaje está vacío " : req.body.message
        // console.log(":", message)
        try {
            sendMessage(userID, message)
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

export default route;