const functionDictionary = {
    0: sendMessage,
    1: "Hello"
}


function sendMessage(data = Buffer.alloc(0)) {
    const receiverNumber = data[1]
    const noHeaderData = data.subarray(2)
    console.log(noHeaderData)
}


export default (data = Buffer) => {
    functionDictionary[data[0]](data)

}