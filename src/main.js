import express from 'express'
import { parse, sendMessage, } from './functions.js'
import msg from './Route/msgAPI/index.js'
import asyncHandler from 'express-async-handler';

const app = express();
app.use(express.json())
app.use(express.urlencoded({
    "extended": true
}))
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
})



app.use("/msg", asyncHandler(msg))

app.use((error, req, res, next) => {
    if (!error) {
        next();
    }
    console.log("Something error")
    return res.status(500).json({ "message": "error" }).end();
})
export default app