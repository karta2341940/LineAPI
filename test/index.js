import net from 'net';
const Port = 3000;
const Host = "127.0.0.1";
const client = new net.Socket();
client.connect(Port, Host, () => {
    console.log(`Connected`);
    client.write("Hello World")
})

client.on("data", (data => { 
    console.log(data.toString())
}))