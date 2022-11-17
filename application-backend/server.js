const express = require('express');
const cors = require('cors');

const app = express()

var corsOptions = {
    origin: '*'
}

const user = require("./controller/userController");

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/user',user);


app.get('/',(req, res) => {
    res.json({ message: 'hello from interview app API'})
})

const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})