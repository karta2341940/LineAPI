import net from 'net';
import { setCode } from '../functions.js'
import dataParser from './dataParser.js';

const Port = 3000;
const Host = "0.0.0.0";

const server = net.createServer((socket) => {
    console.log(`Client Connected：${socket.remoteAddress}`)
    let otp = parseInt(Math.random() * 1000000)
    console.log(otp)
    setCode(otp)
    socket.write("Hello Client")
    socket.on("data", (receive) => {
        dataParser(receive)
        // let data = Array.from(receive)
        // const functionCode = data[0]
        // data.shift()
        // const numberOfReceiver = data[0]
        // data.shift()
        // console.log(functionCode)
        // console.log(numberOfReceiver)
        // const receiverList = Buffer.from(data).toString().replace(";", "").split(",")
        // receiverList.forEach((id, index) => {
        //     console.log(id)
        // });
    })
    socket.on("end", () => {
        console.log(`Client Disconnect：${socket.remoteAddress}`)
    })
    socket.on("error", (err) => {
        console.log(err)
    })
})

server.listen(Port, Host, () => {
    console.log(`TCP Server is Running on ${Host}:${Port}`)
})
export default server;