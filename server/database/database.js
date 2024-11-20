import { MongoClient } from "mongodb";
import { config } from "dotenv";

let db;
const connectionString = config().parsed.MONGO_URL;
console.log(connectionString);
const client = new MongoClient(connectionString);
try {
    await client.connect();
    db = client.db("running");
    console.log("Connected to MongoDB");
} catch(error) {
    console.log("Error connecting to MongoDB: ", error);
}

export default db;

export async function createUser(user) {
    try {
        const userCollection = db.collection("users");
        const result = await userCollection.insertOne(user);
        console.log("User created successfully");
        return result;
    } catch(error) {
        console.log("Error creating user: ");
    }
}
