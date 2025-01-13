import mongoose from 'mongoose';

export  const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.Mongo_URL);
        console.log(`Connected to mongoDB Database ${conn.connection.host}`);
        
    }
    catch(err){
 console.log(`err on mongo ${err}`);
 
    }
}

