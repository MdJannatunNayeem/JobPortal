import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet, {crossOriginResourcePolicy} from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./src/routes/api.js"
import {MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from "./src/config/config.js"
import mongoSanitize from 'express-mongo-sanitize';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Global Application Middleware
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5173",

    ],
}));
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp())
app.use(helmet( {crossOriginResourcePolicy: false,}))
app.use(cookieParser())

app.use((req, res, next) => {
    req.body = mongoSanitize.sanitize(req.body);
    req.params = mongoSanitize.sanitize(req.params);
    //req.query = mongoSanitize.sanitize({ ...req.query }); // Clone to make writable
    next();
});

// Rate Limiter
const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)


// Web Caching
app.set('etag',WEB_CACHE)
// MongoDB connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})


// Set API Routes
app.use("/api",router)

// Set Application Storage
//app.use(express.static('storage'))

//file upload
//app.use("/upload-file", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/upload-file", express.static(path.join(__dirname, "uploads")));

// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})