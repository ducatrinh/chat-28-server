const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const app = express()

const jsonParser = bodyParser.json()
app.use(jsonParser)

const data = 'Hello World'
const sse = new Sse(data)

app.get('/stream', sse.init)
app.post('/message', (req, res) => {
    const { message } = req.body
    sse.send(message)
    res.send(message)
})

app.listen(port, () => console.log(`Listening on :${port}`))
