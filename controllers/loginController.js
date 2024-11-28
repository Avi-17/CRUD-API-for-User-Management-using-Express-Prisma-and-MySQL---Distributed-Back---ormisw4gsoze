const {prisma} = require("../db/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginController = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error: "Email and password are required"});

    const exists = await prisma.user.findUnique({where: {email}});
    if(!exists) return res.status(404).json({error: "User not found"});

    const matched = await bcrypt.compare(password, exists.password);
    if(!matched) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign(email, process.env.JWT_SECRET, {expiresIn: '1h'});

    return res.status(200).json({
        userData: {
            id: exists.id,
            name: exists.name,
            email: exists.email
        },
        accesstoken: token

    })


};

module.exports = loginController;