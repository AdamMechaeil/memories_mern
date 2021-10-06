
const express= require('express');
const bodyParser= require('body-parser');
const dotenv= require('dotenv');

const cors= require('cors')
const colors= require('colors');
const morgan= require('morgan');
const postRouter= require('./routes/posts');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app=express();
app.use(cors());
app.use(bodyParser.json({
    limit:'30mb',
    extended:true
}))

app.use(bodyParser.urlencoded({ 
    limit: '30mb',
     extended: true }));

     
app.use(morgan('dev'));
app.use('/posts',postRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})