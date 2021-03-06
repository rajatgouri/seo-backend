const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

const PORT = process.env.PORT || 5000;

const route = require('./routes/router');

// Routes
app.use('/', route.init());

const db = require('./models')

db.sequelize.sync().then((req)=>{
    app.listen(PORT, () => {
        console.log('Connected to Server at port ' + PORT)
    })
})
