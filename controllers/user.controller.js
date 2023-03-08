const { json } = require('express');
const fs = require('fs')

module.exports.getRandomUsers = async (req, res) => {
    try {
        fs.readFile('user.json', (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            const randomUser = users[parseInt(Math.random() * users.length)];
            console.log(randomUser);
            res.status(200).json(randomUser);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        fs.readFile('user.json', (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data).slice(0, req.query.limit);
            res.status(200).json(users);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.saveUser = async (req, res) => {
    try {
        const user = req.body;
        let users = JSON.parse(fs.readFileSync('user.json'));
        users.push(user);
        res.status(200).json({
            message: "New user created successful",
            user
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let users = JSON.parse(fs.readFileSync('user.json'));
        const updateUser = users.find(user => user.id == id);

        updateUser.id = id;
        updateUser.gender = req.body.gender;
        updateUser.name = req.body.name;
        updateUser.contact = req.body.contact;
        updateUser.address = req.body.address;
        updateUser.photoURL = req.body.photoURL;

        res.status(200).json({
            message: "User update successful",
            updateUser
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        let users = JSON.parse(fs.readFileSync('user.json'));
        let currentUsers = users.filter(user => user.id !== Number(id));

        res.status(200).json({
            message: "User delete successful",
            currentUsers
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}