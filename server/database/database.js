import { MongoClient } from "mongodb";

async function connect() {
    const connectionString = process.env.MONGO_URL || "";
    const client = new MongoClient(connectionString);
    let connection;
    try {
        connection = await client.connect();
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Error connecting to MongoDB: ", error);
    }
    let db = connection.db("running_app");
    return db;
}

module.exports = connect();
