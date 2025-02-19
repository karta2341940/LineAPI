import * as line from '@line/bot-sdk'
import fs from 'fs'
import { DatabaseSync } from "node:sqlite"
const token = "Irzd5+ncVovKDaphFyh6YS4QGIIQNulKuYDA/sU7EBvKeWxuchJowAykMGRm46PDtNaPJKv1qsXwF/FSMPPBL6234lundk5WIlUYqJvmC3UrJKUwf6K/fDBAZs9JaaVgBkqtwyUM5x6oYu+eCviFSwdB04t89/1O/w1cDnyilFU="
const secret = "c34c2c8aa288788ef93a784a0181c9bc"
const config = {
    channelSecret: secret
}
// const secretJson = JSON.parse(fs.readFileSync("secret.json", { encoding: "utf-8" }))
const db = new DatabaseSync("./data.sqlite")
const LoginList = []

const client = new line.messagingApi.MessagingApiClient({
    "channelAccessToken": token,
})

/**
 * 解析訊息
 * @param {String} userID 
 * @param {String} message 
 */
export async function parse(userID = "", message = "") {
    if (LoginList.includes(userID)) {
        setUser(userID, message)
    }
    switch (message.toLowerCase()) {
        case "登入":
        case "login":
            await sendMessage(userID, "請輸入姓名")
            LoginList.push(userID)
            break;
        default:
            await sendMessage(userID, "Hello")
            break;
    }
}
/**
 * 將資料寫入SQLite
 * @param {*} userID 
 * @param {*} name 
 */
function setUser(userID = "", name = "") {
    const data = JSON.stringify(
        {
            "userID": userID,
            "name": name
        }
    )
    const stmt = db.prepare(`INSERT INTO EMPL(userID,userName) VALUES(@userID,@userName)`)
    stmt.run({
        userID: userID,
        userName: name
    })
    sendMessage(userID, "登入成功")
}


/**
 * 將資料寫入SQLite
 * @param {*} userID 
 * @param {*} name 
 */
export function setCode(userID = "", code = "") {

    const stmt = db.prepare(`INSERT INTO CODES(userID,otp) VALUES(@userID,@otp) ON CONFLICT(userID) DO UPDATE SET otp = excluded.otp`)
    stmt.run({
        userID: userID,
        otp: code
    })
}
export function SQLiteInit() {
    db.exec(`
            CREATE TABLE IF NOT EXISTS EMPL(
            userID TEXT,
            userName TEXT
            )`)
    db.exec(`
            CREATE TABLE IF NOT EXISTS CODES(
            userID TEXT PRIMARY KEY NOT NULL,
            OTP TEXT
            )`)

}


/**
 * 傳送訊息
 * @param {String} userID 
 * @param {String} message 
 */
export async function sendMessage(userID = "", message = "Default Message") {
    await client.pushMessage({
        "to": userID,
        "messages": [
            {
                "text": message,
                "type": "text"
            }
        ]
    })
}

export default {
    parse,
    SQLiteInit,
    sendMessage,
    setCode

}