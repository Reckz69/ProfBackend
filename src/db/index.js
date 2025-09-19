import mongoose from 'mongoose';
import { DB_NAME } from '../utils/constants.js';

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n mongo Db connected : ${connectionInstance.connection.host}`);
    }catch(err){
        console.log(`\n error in connecting to mongo Db : ${err.message}`);
        process.exit(1);
    }
}


export default connectDB();