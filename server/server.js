const express =  require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/index');
// const port = 10005;
const port = 3309;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api',api);
app.listen(port,()=>{
    console.log(`express is running on ${port}`);
});