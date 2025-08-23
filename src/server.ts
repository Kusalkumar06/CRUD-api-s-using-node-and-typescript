import  express  from "express";
import cors from "cors";
import "dotenv/config"

import { connectDb } from "./config/db.js";

import route from "./routes/todoRoute.js";
import router from "./routes/authRoute.js";

const app = express();

// Middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URL

if (!URI){
    console.error("MongoDB URI is not defined in the .env file")
    process.exit(1)
;}

// Connecting to the MongoDB
async function main(){
    try{
        await connectDb(URI as string);
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`)
        })
    } catch (error){
        console.error("Error connecting to MongoDB: ",error)
        process.exit(1)
    }
}
main()


app.use("/todos/",route)

app.use('/auth/',router)