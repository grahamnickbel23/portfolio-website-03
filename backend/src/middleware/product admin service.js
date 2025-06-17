export default function verifyJson(req, res, next) {
    const requiredFields = ['title', 'description', 'price', 'currency'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                message: `Your input is missing: ${field}`
            });
        }
    }

    next(); // All fields are present
}