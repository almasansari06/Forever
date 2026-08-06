import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;

        // Disabled Check for token requests
        const user = await userModel.findById(token_decode.id);
        if (!user) {
            return res.json({ success: false, message: "Account not found" });
        }

        if (user.status === 'disabled') {
            return res.json({ success: false, isDisabled: true, message: "Aapka account admin dwara disable kar diya gaya hai." });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
