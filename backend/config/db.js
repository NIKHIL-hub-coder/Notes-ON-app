const mongoose = require('mongoose');
// MONGO_URI=mongodb+srv://sudeep:sg1010sg@cluster0.8u2iu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error('Error');
        process.exit();
    }
}

module.exports = connectDB;