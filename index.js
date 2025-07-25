const express = require('express')
const mongoose = require('mongoose')
const cron = require("node-cron")
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv/config')
const swaggerDocument = YAML.load('./swagger.yaml');
const routes = require('./src/routes/route');
const { waterMeterUpdate } = require('./src/cron/cron');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("Hello World!")
});

cron.schedule('0 * * * *', () => {
    waterMeterUpdate();
});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_CONNECTION, { dbName: 'water-management' })
        .then(result => {
            console.log('Server start at ', process.env.PORT)
        }).catch(err => {
            console.log(err);
        });
});
