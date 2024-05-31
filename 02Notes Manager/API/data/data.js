import mongoose from "mongoose";

export const mongoConnection = () => {

    mongoose
        .connect(process.env.MONGO_URI, { dbName: "Notes" })
        .then(() => console.log('MongoDb Connected successfuly'))
        .catch((err) => console.log(`Error While database connection ${err}`));
}