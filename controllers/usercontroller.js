const {UniqueConstraintError} = require ("sequelize/lib/errors");
const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req,res) => {

    let { username, password } = req.body.user;

    try {
    const newUser = await User.create({
        username,
        password
    });
    res.status(201).json({
        message: "User is created",
        user: newUser
    });
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "duplicate email",
        });
    } else {
        res.status(500).json({
            message: "Failed to create user",
        });
    }
}
});

// Login user

router.post("/login", async (req,res) => {

    let { username, password } = req.body.user;

    try {
    const loginUser = await User.findOne({
        where: {
            username: username,
            password:password
        }
    })

    if (loginUser) {
        res.status(200).json ({
            message: "User found",
            user: loginUser
        })
    } else {
        res.status(401).json ({
            message: " User not found"
        })
    }
} catch (err) {
    res.status(500).json ({err})
}
})
    


module.exports = router;