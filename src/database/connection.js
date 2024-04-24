import mongoose from "mongoose"
import { db_name } from "../constants.js"
const dbconecction=async ()=>{
    try {
      const connect=  await mongoose.connect(`${process.env.db_URL}/${db_name}`)
      console.log("db connected!!!!");
    } catch (error) {
        console.log("ERR:",error);
        process.exit(1)
    }
}
export default dbconecction