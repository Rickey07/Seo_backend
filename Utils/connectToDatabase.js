const mongoose = require('mongoose');


module.exports = connectToDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log(`Some unknown error occured ${err}`)
    })
}