import connectionTable from "#tcp/connectionPool.js"
import { sendMessage } from "#src/functions.js"


export default (rawData = { data: Buffer.alloc(0), uuid: "" }) => {
    const subHeader = rawData["data"].subarray(0, 8)
    const data = rawData["data"].subarray(8)
    const Header = {
        "receiver Length": subHeader.readUint32LE(0),
        "message Length": subHeader.readUint32LE(4),
    }

    const receiverRaw = data.subarray(0, Header["receiver Length"])
    const messageRaw = data.subarray(Header["receiver Length"], Header["message Length"] + Header["receiver Length"])
    const receiverList = receiverRaw.toString().split(",")
    const message = messageRaw.toString()

    receiverList.forEach((userID) => {
        sendMessage(userID, message)
    });

}