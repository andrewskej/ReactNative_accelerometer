const express=require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors')
const axios = require('axios');
const bodyParser = require("body-parser"); 
const app = express();

app.use(cors());
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

var accel_x = 0, accel_y = 0;


app.get('/', (req, res) => {
    res.render('index.ejs')
})


//when RN connects here, it should receive x/y from app and update it
app.post('/update', (req,res) => {
    const {left, top} = (req.body);
    let [x,y] = [Math.ceil(left,1), Math.ceil(top,1)]
    console.log('-> receiving from React_Native')
    console.log('x: ', x , 'y: ', y);
    accel_x = x;
    accel_y = y;

    //internal access from one api to another
    let url = `http://localhost:3002/update`;
    axios({
        method:'get',
        url,
        // data:{
        //     x, y
        // }
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log('error?:' , error);
    });
})

//this should give x, y to react
app.get('/update', (req, res) => {
    console.log('send this to React ->')
    //for some reason, using passed data gives undefined sometimes. safer to use global var for this...
    // const {x,y} = req.body;
    // console.log(x, y)
    // res.json({x , y})
    console.log(accel_x, accel_y)
    res.json({x:accel_x, y:accel_y})
})





const port =3002;
app.listen(port,()=>{
    console.log(`App running on ${port}`);
})