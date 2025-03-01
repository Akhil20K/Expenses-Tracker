import express from 'express';
import userController from '../controller/userCtrl.js';
import isAuthenticated from '../middleware/isAuth.js';
const userRouter = express.Router();

// Routes for User
userRouter.post('/user/register', userController.register);
userRouter.post('/user/login', userController.login);
userRouter.get('/user/profile', isAuthenticated, userController.profile);
userRouter.put('/user/change-password', isAuthenticated, userController.changePassword);
userRouter.put('/user/update-profile', isAuthenticated, userController.updateProfile);

export default userRouter;