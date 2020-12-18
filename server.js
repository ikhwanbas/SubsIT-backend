const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors')
const cron = require('node-cron')
const autoPaysubs = require('./controllers/autoPaysubs')

require('dotenv').config()
const app = express()
app.use(bodyParser.json())
//buat yang pingin API nya bisa di akses oleh siapapun
app.use(cors())

//get file location
app.use('/files', express.static('uploads'))


// schedule for cron job
cron.schedule('10 * * * * *', () => {
    autoPaysubs()
    // console.log('test');
}, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
});

app.use(passport.initialize());
app.use(passport.session());
/**
 * ⚠️ Propietary code! Do not change! ⚠️
 * What this does is reading all files inside routes folder recrusively
 * and use it by app.use(), so you don't need to import / require any route.
 * Reference: https://www.npmjs.com/package/read-dir-deep
 */
const readDir = require('read-dir-deep');
const path = require('path')
const routesPath = path.resolve('routes')
const filePaths = readDir.readDirDeepSync(routesPath)
filePaths.forEach((filePath) => {
    const relativeFilePath = `./${filePath}`
    console.log(`${relativeFilePath} loaded!`);
    const route = require(relativeFilePath)
    app.use(route)
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Backend app is running in http://localhost:${port}`);
})

