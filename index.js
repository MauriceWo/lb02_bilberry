const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 80;
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    let savedData = JSON.parse(fs.readFileSync('./node/data.json', 'utf8'));
    let newData = req.body;

    if (newData.fname < 2 || newData.lname < 2 || Object.keys(newData)[0].length != 10 || !newData[Object.keys(newData)[0]].email.includes("@") || Object.keys(newData)[0].includes(" ")) {
        console.log("Request was not valid!")
        res.send(JSON.stringify({valid:"true"}));
        return;
    }

    savedData[Object.keys(newData)[0]] = req.body[Object.keys(newData)[0]];
    fs.writeFileSync('./node/data.json', JSON.stringify(savedData), 'utf8');
    res.send(JSON.stringify({valid: "false"}));
    console.log("Request was processed!");
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});