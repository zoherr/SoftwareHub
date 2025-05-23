import {app} from "./app.js";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT,()=>{
  connectDB();
  console.log("server is running on port 8000!!");
})
