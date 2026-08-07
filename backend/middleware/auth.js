import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // Header se token extract karein
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Safety Fix: Agar req.body undefined hai (GET request me), toh pehle object initialize karein
        if (!req.body) {
            req.body = {};
        }

        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
