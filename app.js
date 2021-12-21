const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "Welcome"
    const params = {'title': 'Contact Us', "content": con}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res)=>{
    names = req.body.names
    phoneno = req.body.phoneno
    emailid = req.body.emailid
    query1 = req.body.query1

    let outputToWrite = `the name of the client is ${names}, with Phone Number ${phoneno}.The emailid is ${emailid}. The query to be resolved is ${query1}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('index.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
