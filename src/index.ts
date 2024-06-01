import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import env from 'dotenv'
import path from 'path'
import { routers } from './modules/student/stdnt.route';


const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1/students', routers)
env.config({ path: path.join(process.cwd(), '.env') })





async function main() {
    await mongoose.connect(process.env.DATABASE_URL as string);

    // console.log(process.env.DATABASE_URL)

    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${process.env.PORT} port`)
    })
    
}



main()