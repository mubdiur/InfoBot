const express = require('express')
const app = express()
const port = process.env.PORT;

function keepAlive() {
    app.get('/', (req, res) => {
        res.send('online!')
    })

    app.listen(port, () => {
        console.log(`app running!`)
    })
}

module.exports = { keepAlive }