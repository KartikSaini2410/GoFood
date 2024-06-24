const mongoose = require('mongoose');
 //monoURI-->  mongodb+srv://goFood:goFood@2410@cluster0.hitk7lq.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0
const mongoURI = "mongodb+srv://goFood:goFood@cluster0.hitk7lq.mongodb.net/goFood"

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            auth: {
                username: 'goFood',
                password: 'goFood@2410'
            }
        });

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_category");
        const foodCategories = await foodCategory.find({}).toArray();
            global.food_items = data;
            global.foodCategory = foodCategories;
            console.log("Connected to MongoDB");
        // console.log(data, "data");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongoDB;