import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userController = {
    // Register a User
    register: asyncHandler(async(req, res) => {
        const { username, email, password } = req.body;
        // Validate Entries
        if(!username || !email || !password){
            throw new Error('All fields are required');
        }
        // Validate Email
        if(!validator.isEmail(email)){
            throw new Error('Please enter a valid email');
        }
        // Check if user is already registered
        const userExists = await User.findOne({ email: email });
        if(userExists){
            throw new Error('User already registered with the same email');
        }
        // Hash the passwod using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // Create a new User Object
        const newUser = await User.create({
            email, username, password: hashPassword,
        });
        res.json({
            message: "Registered",
            username: newUser.username,
            email: newUser.email,
            id: newUser._id,
        });
    }),
    // Login the User
    login: asyncHandler(async(req, res) => {
        const { user, password } = req.body;
        var userLogin;
        // If the User enter Username to Login
        if(!validator.isEmail(user)){
            const userExists = await User.findOne({ username: user });
            if(!userExists){
                throw new Error('User is not registered with this Username');
            }
            userLogin = userExists;
        }
        // If the User enter Email to Login
        else{
            const userExists = await User.findOne({ email: user });
            if(!userExists){
                throw new Error('User is not registered with this Email');
            }
            userLogin = userExists;
        }
        // Validate the password
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if(!isMatch){
            throw new Error('Password is Incorrect!');
        }
        // Generate a Token
        const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.json({
            message: 'Login Successful',
            token,
            id: userLogin._id,
            username: userLogin.username,
            email: userLogin.email,
        })
    }),
    // Profile of the User
    profile: asyncHandler(async(req, res) => {
        // Find the User by Id send by the Authenticator based on the Token of User
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found');
        }
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
        })
    }),
    // Change the Password of the User
    changePassword: asyncHandler(async(req, res) => {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found');
        }
        // verify Old Password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            throw new Error('Password is Incorrect!');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        // Updating the password in Database
        user.password = hashPassword;
        await user.save();
        res.json({
            message: "Password Changed Successfully",
        })
    }),
    // Update the profile of the user after validating password again
    updateProfile: asyncHandler(async(req, res) => {
        const passwod = req.body.password;
        const email = req.body.email;
        const username = req.body.username;
        if(!email && !username){
            throw new Error('Enter any one profile to update');
        }
        // Validate Email if entered
        if(email){
            if(!validator.isEmail(email)){
                throw new Error('Please enter a valid email');
            }
        }
        // Validate Password
        const isMatch = await bcrypt.compare(passwod, user.password);
        if(!isMatch){
            throw new Error('Password is Incorrect!');
        }
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found');
        }
        // Update any one of the profiles according to the User entry
        user.email = email || user.email;
        user.username = username || user.username;
        await user.save();
        res.json({
            message: "User profile Updated Successfully",
            username: user.username,
            email: user.email,
        })
    })
}

export default userController;