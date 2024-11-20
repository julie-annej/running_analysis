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
        console.log("Error creating user: ", error);
    }
}

export async function updateAuth(authInfo) {
    try {
        const authCollection = db.collection("authUsers");
        const result = await authCollection.insertOne(authInfo);
        console.log("Auth updated");
        return result;
    } catch(error) {
        console.log("Error with updating auth: ", error);
    }
}

export async function getAuth(userId) {
    try {
        const authCollection = db.collection("authUsers");
        const findResult = await authCollection.findOne({athlete_id: userId});
        return findResult;
    } catch(error) {
        console.log("Error with updating auth: ", error);
    }
}
