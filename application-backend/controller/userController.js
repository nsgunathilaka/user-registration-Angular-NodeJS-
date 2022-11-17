const db = require('../model')
const router = require('express').Router();
const bcrypt = require("bcrypt");
require('dotenv').config();

const User = db.user


router.post("/signup", async (req, res) => {


    const {title, firstName, lastName, dob, email, contactNumber, password, confirmPassword} = req.body;

    if(!title || !firstName || !lastName || !dob || !email || !contactNumber || !password || !confirmPassword) {
        return res.status(400).json({message:"All Fields required"})
    }


    if(password !== confirmPassword) {
        return res.status(400).json({message:"Password doesn't match!"})
    }

    encryptedPassword = await bcrypt.hash(req.body.password, 5);

    let uData = {
        title: title,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        contactNumber: contactNumber,
        password: encryptedPassword
    };

    const isExist = await User.findOne({
        where: {
            email: req.body.email,
        }
    });

    if (!isExist) {
        const user = await User.create(uData);
        if (user) {
            return res.status(200).json({ message: "Successfully Registered" });
        }
        return res.status(500).json({ error: "Something went wrong!" });
    } else {
        return res.status(400).json({ error: "Email address is already exist!" });
    }
});

router.post("/login", async (req, res) => {

    const isExist = await User.findOne({
        where: {
            email: req.body.email,
        }
    });

    if (!isExist)
        return res.status(400).json({ error: "Invalid email or password." });

    bcrypt.compare(req.body.password, isExist.password, async (err, result) => {
        if (result === false) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        else {
            const user = await User.findOne({
                where : {
                    email: req.body.email,
                },
                attributes: { exclude: ["firstName","lastName","dob","email","contactNumber","password","createdAt", "updatedAt"] },
            });
            res.status(200).json(user)

        }
    });
});

router.get("/findById/:id",async(req, res) => {
    const user = await User.findOne({
        where : {
            id: req.params.id,
        }
    });
    return res.status(200).json(user)
});



module.exports = router;