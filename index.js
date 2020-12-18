const express = require('express')
const app = express()

// JSON Data
let data = [
    { id: 1, title: 'Create a project',  createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     createdOn: new Date() },
    { id: 3, title: 'Write new article', createdOn: new Date() },
    { id: 4, title: 'Walk toward home',  createdOn: new Date() },
    { id: 5, title: 'Have some dinner',  createdOn: new Date() },
];

app.use(express.json())

app.get('/', (req, res) => {
    const output = { value:  'hello world!' }
    res.send(output)
})
// Get All users
app.get('/users',(req,res)=>{
    res.status(200).json(data);
})
// Get Users by ID
app.get('/users/:id',(req,res)=>{
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
app.post('/users/add',(req,res)=>{
    let userId = data.map(user=>user.id)
    // newId for new User
    let newUserId = userId.length > 0 ? Math.max.apply(Math,userId) + 1 : 1
    // Creating new user
    let newUser = {
        id: newUserId,
        title: req.body.title,
        created: new Date()
    }
    // pushing into JSON Data array
    data.push(newUser)
    res.status(201).json(newUser)
})
//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})