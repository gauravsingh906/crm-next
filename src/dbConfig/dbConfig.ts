import mongoose from "mongoose";
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = await mongoose.connection
        connection.on('connected', () => {
            console.log('Mongo db connected');
        })
        connection.on('error', (err) => {
            console.log("Mongo db connection error , please make sure db is up and running: " + err);
            process.exit();
        })
    }
    catch (err) {
        console.log("something went wrong");
        console.log(err);
    }
}