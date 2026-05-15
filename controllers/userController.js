const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");


const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        userModel.findUserByEmail(
            email,

            async (err, results) => {


                if (err) {
                    return res.status(500).json(err);
                }


                if (results.length > 0) {

                    return res.status(400).json({
                        message: "User already exists",
                    });

                }


                const hashedPassword =
                    await bcrypt.hash(password, 10);


                userModel.createUser(
                    name,
                    email,
                    hashedPassword,

                    (err, results) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message:
                                "User registered successfully",
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            message: "Server error",
        });

    }
};


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        userModel.findUserByEmail(
            email,

            async (err, results) => {


                if (err) {
                    return res.status(500).json(err);
                }


                if (results.length === 0) {

                    return res.status(400).json({
                        message: "User not found",
                    });

                }

                const user = results[0];


                const isMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );


                if (!isMatch) {

                    return res.status(400).json({
                        message: "Invalid credentials",
                    });

                }


                const token = jwt.sign(

                    {
                        id: user.id,
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "10d",
                    }

                );


                res.status(200).json({

                    message: "Login successful",

                    token,

                });

            }
        );

    } catch (error) {

        res.status(500).json({
            message: "Server error",
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
};