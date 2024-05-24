import mongoose from "mongoose";

export const mongoConnection = () => {

    mongoose
        .connect("mongodb://127.0.0.1:27017", { dbName: "Notes" })
        .then(() => console.log('MongoDb Connected successfuly'))
        .catch((err) => console.log(`Error While database connection ${err}`));
}