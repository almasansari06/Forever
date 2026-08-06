import express from 'express';
import { loginUser, registerUser, adminLogin, getAllUsers, toggleUserStatus, deleteUser } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Admin User Management Routes
userRouter.get('/all-users', adminAuth, getAllUsers);
userRouter.post('/toggle-status', adminAuth, toggleUserStatus);
userRouter.post('/delete-user', adminAuth, deleteUser);

export default userRouter;
