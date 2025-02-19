export default (data = Buffer.alloc(0)) => {

    const processedData = {
        "header": {
            "length prefix": data.readUint32LE(0),
            "function code": data.readUint32LE(4),
        },
        "data": data.subarray(8,data.length)
    }
    return processedData
}