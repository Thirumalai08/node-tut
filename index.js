const express = require('express')
const app = express()
const fs = require('fs')
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
    const output = {
        value:"To Run name.js file node name"
    }
    res.send(output)
})
// Get All User
app.get('/users/get',(req,res)=>{
    const allUsers = getUserData()
    res.status(200).send(allUsers)
})
// Get User By ID
app.get('/users/get/:id',(req,res)=>{
    // getting current ID
    const users = getUserData()
    let currentID = users.find((user)=>{
        return user.id === parseInt(req.params.id)
    })
    // check currentID and return data
    if(currentID) {
        res.status(200).json(currentID)
    } else {
        res.status(404).send({
            msg:"User Not Found"
        })
    }
})
// Delete User
app.delete('/users/delete/:id',(req,res)=>{
   const currentID = parseInt(req.params.id)
   // getting existing users
   const oldUsers = getUserData()
   // removing data with respect to ID
   const deleteUser = oldUsers.filter(user=>user.id !== currentID)
   /*if(!deleteUser) {
       return res.status(404).send({ 
           msg:"User not found"
        })
   }*/
   // saving the data
   saveUserData(deleteUser)
   res.status(200).send({
       msg:"Delete Success"
   })
})
// Post User
app.post('/users/add',(req,res)=>{
    // getting existing users from users.json
    const oldUsers = getUserData()
    // for post request
    let userId = oldUsers.map(user=>user.id)
    // newId for new user
    let newUserId = userId.length > 0 ? Math.max.apply(Math,userId)+1 : 1
    const userData = req.body
    // Creating new User
    let newUser = {
        id: newUserId,
        name: userData.name,
        department: userData.department,
        salary: userData.salary,
        created: new Date()
    }
    // pushing new user data to users.json
    oldUsers.push(newUser)
    // writing to users.json
    saveUserData(oldUsers)
    res.status(201).send({
        msg:"New Data Added Successfully"
    })
})
// Put Request for Updating the user
app.put('/user/update/:id',(req,res)=>{
    // currentId to edit a user
    const currentID = parseInt(req.params.id)
    // getting existing users from users.json
    const oldUsers = getUserData()
    // finding current User
    let currentUser = oldUsers.find((user)=>{
        return user.id === currentID
    })
    const userData = req.body
    // check current user for update userData
    if(currentUser){
        let updateData = {
            id: currentUser.id, // or id
            name: userData.name,
            department: userData.department,
            salary: userData.salary,
            created: new Date()
        }
        const updateUser = oldUsers.filter((user)=>user.id !== currentID,updateData)
        updateUser.push(updateData)
        // write to json
        saveUserData(updateUser)
        res.status(200).send({
            msg:"Update Sucess..."
        })
    } else {
        res.status(404).send({
            msg:"Update Failed!!!"
        })
    }
})
// Write data to JSON file
const saveUserData = (newData) => {
    const writeData = JSON.stringify(newData)
    fs.writeFileSync('users.json',writeData)
}
// Read data from JSON file
const getUserData = () => {
    const readData = fs.readFileSync('users.json')
    return JSON.parse(readData)
}
//configure the server port
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})