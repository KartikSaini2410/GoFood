const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://goFood:goFood@2410@cluster0.hitk7lq.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategories = await mongoose.connection.db.collection("food_category").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategories;
        
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongoDB;
