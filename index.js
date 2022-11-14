const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./Routes/user")
const authRoute = require("./Routes/auth")
const productRoute = require("./Routes/product")
const cartRoute = require("./Routes/cart")
const orderRoute = require("./Routes/order")
const stripeRoute = require("./Routes/stripe")
const cors = require("cors")

dotenv.config();

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);




app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});

