const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
const jwt = require('jwt-simple')
app.set('jwtTokenSecret', 'SECRET_STRING')
const moment = require('moment');

var userId
var userPassword

app.get('/api/random', (req, res)=> {
    //var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjkzMDY4NjgyNzJ9.xy86G670KA1uYGUi-hfpUm5o9g1ILiQRuK2tgR_7RaI"
    var token=req.header("Authorization")
    //console.log(JSON.stringify(req.headers));
    if (token) {
        console.log(token)
        var decoded=jwt.decode(token, 'SECRET_STRING')
        console.log(decoded)
    }
    else {
        console.log('not decoded')
    }
    res.json({
        password: 'here is your random object'
    })

})

app.post('/api/login', (req, res)=> {
    console.log('post received')
    console.log(req.body)
    userId=req.body.id
    userPassword=req.body.password
    if (userId==='omer' && userPassword==='farooq') {
        var expires = moment().add(7, 'days').valueOf();
        var token = jwt.encode({
            iss: req.body.id,
            exp: expires
        }, 'SECRET_STRING');
        res.json({
            token: token,
            expires: expires
        })
    }
    else {
        res.json({password: req.body.password})
    }
})

const PORT = 8000
app.listen(PORT, ()=> {
    console.log('server listenening on port ', PORT);
});
