import express from 'express';
import { 
    loginUser, 
    registerUser, 
    adminLogin, 
    getProfile, 
    getAllUsers, 
    toggleUserStatus, 
    deleteUser 
} from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

// Public User Auth Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Protected User Profile Routes (GET aur POST dono support karta hai)
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/get-profile', authUser, getProfile);

// Protected Admin Management Routes
userRouter.post('/all-users', adminAuth, getAllUsers);
userRouter.post('/toggle-status', adminAuth, toggleUserStatus);
userRouter.post('/delete-user', adminAuth, deleteUser);

export default userRouter;
