import net from 'net';
import { setCode } from '../functions.js'
import dataParser from "./dataParser.js";
import headerParser from './headerParser.js'
import moment from 'moment/moment.js';
import connectionPool from './connectionPool.js';
import { hash } from 'crypto'
import { buffer } from 'stream/consumers';



const Port = 3000;
const Host = "0.0.0.0";

const server = net.createServer((socket) => {
    connect(socket)
    const uuid = getUUID(socket)
    /**
     * @type {Buffer}
     */
    let tempBuffer;
    let isStartOfMessage = true
    let getLength = 0
    let msgTotalLength = 0
    socket.on("data", (receive) => {
        console.log(moment().format('LTS'))
        if (isStartOfMessage) {
            const totalLength = receive.readUint16LE(0)
            msgTotalLength = receive.readUint16LE(0)
            tempBuffer = Buffer.alloc(msgTotalLength)
            isStartOfMessage = false // 確保分段後的資料不會重設tempBuffer的長度
        }
        try {
            receive.copy(tempBuffer, getLength)
            getLength = getLength + receive.length
        }
        catch (err) {
            console.log(err)
            console.log(getLength)
        }

        if (getLength < msgTotalLength) return
        getLength = 0
        isStartOfMessage = true
        const processedData = headerParser(tempBuffer)
        const header = processedData["header"]
        const message = processedData["data"]
        dataParser(
            header["function code"],
            {
                "UUID": uuid,
                "data": message
            }
        )
    })

    socket.on("end", () => {
        const uuid = getUUID(socket)
        connectionPool.delete(uuid)
        console.log(`Client Disconnect：${socket.remoteAddress}`)
    })

    socket.on("error", (err) => {
        console.log(moment().format('LTS'), socket.remoteAddress, ":", err)
    })
})

server.listen(Port, Host, () => {
    console.log(`TCP Server is Running on ${Host}:${Port}`)
})




export default server;

function connect(socket = new net.Socket()) {
    const UUID = getUUID(socket)
    console.log(`Client Connected：${socket.remoteAddress} - ${UUID}`)

    connectionPool.set(UUID, socket)

    let otp = parseInt(Math.random() * 1000000)
    setCode("01", otp)
    socket.write("Hello Client")
}

function getUUID(socket = new net.Socket()) {
    const str = `${socket.remoteAddress}${socket.remotePort}`
    return hash("SHA1", str)
}