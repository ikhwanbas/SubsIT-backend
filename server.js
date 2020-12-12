const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors')
const cron = require('node-cron')
const autoPaysubs = require('./routes/subscription/autoPaysubs')

require('dotenv').config()
const app = express()
app.use(bodyParser.json())
//buat yang pingin API nya bisa di akses oleh siapapun
app.use(cors())

//buat yang pengen API nya cuman bisa di akses sama aplikasi dari domain tertentu
// const whiteList = ['http://localhost:3000', 'http://127.0.0.1:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whiteList.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not Allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions))



cron.schedule('0 0 * * *', () => {
    autoPaysubs()
}, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
}
);



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

