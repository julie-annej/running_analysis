import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/running-data", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}

module.exports = connect;