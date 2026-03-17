import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import router from "./routes/user.route.js"
import company from "./routes/company.route.js"
import jobRoute from "./routes/jobs.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({})
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOption= {
    origin:'http://localhost:5173',
    credentials:true
}

const PORT=process.env.PORT || 3000;

app.use(cors(corsOption))
app.use("/api/v1/user",router)
app.use("/api/v1/company",company)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
