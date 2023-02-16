import mongoose  from "mongoose"

let connection = {isConnected:{ }};

async function connectDb(){
    if (connection.isConnected){
        console.log("already connected")
        return;
    }

    if (mongoose.connections.length > 0){
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1){
            console.log("Use the previous connection");
            return;
        }
        await mongoose.disconnect();
    }
    let db = await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected");
    connection.isConnected = db?.connections[0].readyState;
}

async function disconnectDb(){
    if(process.env.NODE_ENV === 'production'){
        await mongoose.disconnect();
        connection.isConnected = false;
        return;
    }else{
        console.log("not disconnected");
    }
}

const db = { connectDb, disconnectDb}

export default db;