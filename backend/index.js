import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pg from 'pg'
dotenv.config();

const { Pool } = pg;
const app = express()
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL ,
})

app.use(cors())
app.use(express.json())

app.post('/submit',async (req,res)=>{
    const data = req.body;
    console.log(data);
    // insert the observation into database
    try{
        const insertQuery = `
            INSERT INTO submissions (username,language,stdin,source,timestamp) VALUES ($1, $2, $3, $4, $5)
        `
        const { username,language,stdin,source,timestamp } = data;
        await pool.query(insertQuery,[username,language,stdin,source,timestamp]);
        return res.status(200).json({
            message:"Successfully Added to Database"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

app.get('/collect',async (req,res)=>{
    // request data from database
    try{
        const response = await pool.query("SELECT * FROM submissions");
        console.log(response.rows);
        return res.json({
            entries: response.rows
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
    // temporarily we will not use database
    // const data = [{
    //     username: 'user1',
    //     language: 'JavaScript',
    //     stdin: 'Input 1',
    //     code: 'console.log("Hello, World!");',
    //     timestamp: '2024-03-20 10:00:00'
    // },
    // {
    //     username: 'user2',
    //     language: 'Python',
    //     stdin: 'Input 2',
    //     code: 'print("Hello, World!")',
    //     timestamp: '2024-03-20 10:30:00'
    // },
    // ]
    // return res.json({
    //     entries: data,
    // })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is successfully running on ${process.env.PORT}`)
})