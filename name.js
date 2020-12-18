const express = require('express')
const app = express()
const port = process.env.PORT || 5000
// JSON Data
let data = [
    { id: 1, name:'Test name',  createdOn: new Date() },
    { id: 2, name:'Test name by id',  createdOn: new Date() },
];

app.use(express.json())

app.get('/', (req, res) => {
    const output = 'Rest API Welcomes You To see the values route to /getNames'
    res.send(output)
})
// Get All users
app.get('/getNames',(req,res)=>{
    res.status(200).json(data);
})
// Get Users by ID
app.get('/getNames/:id',(req,res)=>{
    // find the data object with respect to id
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})
// Post
app.post('/addName',(req,res)=>{
    let userId = data.map(user=>user.id)
    // newId for new User
    let newUserId = userId.length > 0 ? Math.max.apply(Math,userId) + 1 : 1
    // Creating new user
    let newUser = {
        id: newUserId,
        name: req.body.name,
        created: new Date()
    }
    // pushing into JSON Data array
    data.push(newUser)
    res.status(201).json(newUser)
})
//configure the server port
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})