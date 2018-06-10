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


app.get('/api/login', (req, res)=> {
    res.send('Hello World!')
})

app.post('/api/login', (req, res)=> {
    console.log('post received')
    console.log(req.body)
    res.json({password: req.body.password})
})

const PORT = 8000
app.listen(PORT, ()=> {
    console.log('server listenening on port ', PORT);
});
