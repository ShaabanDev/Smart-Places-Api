const HttpError = require("../models/http-error");
const userModel = require("../models/userModel");


// login function 
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findByEmailAndPassword(email, password);
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
}

// sign up function
const signup = async (req, res, next) => {
    const { name, email, password, } = req.body;
    let userExist;
    try {
        userExist = await userModel.findOne({ email });
    } catch (err) {
        return next(new HttpError('Could not create a user, Please try again later.', 500));
    }
    if (userExist) {
        return next(new HttpError('Email Already exists, Please Login Instead.', 422));
    }
    let user;
    try {
        user = new userModel({
            name, email, image: "https://dummyimage.com/600x400/000/fff",
            password,
        });
        await user.save();
    } catch (err) {
        console.log(err)
        return next(new HttpError('Could not create a user, Please try again later.', 500));
    }

    res.status(200).json(user)
}


module.exports = { signup, login }