const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const database = require('./database');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('not found');
    }
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('not working');
    }
});

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);

    });
    database.users.push(
        {
            id: '3',
            name,
            email,
            password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(database.users[database.users.length - 1]);
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json('not found');
    }
});

app.listen(port, () => {
    console.log('Listening to port', port);

});

function _findById(id) {
    database.users.forEach(user => {
        if (user.id === id) {
            console.log(user);
            return user;
        }
        else {
            return {};
        }
    });
}


//Asynchronous Bcrypt

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });