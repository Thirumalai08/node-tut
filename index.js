const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    const output = {
        value:"To Run name.js file node name"
    }
    res.send(output)
})

//configure the server port
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})