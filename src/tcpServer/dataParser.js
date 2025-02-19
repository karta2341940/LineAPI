import { sendMessage } from "./dataProcess/index.js"



const functionDictionary = {
    0: sendMessage,
}


let i = 0
export default (functionCode = 0, data) => {
    try {
        functionDictionary[functionCode](data)
    }
    catch (err) {
        console.log(err)
    }
}