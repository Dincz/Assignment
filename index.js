const express = require("express");
const app = express();
const connectDb = require("./Database/mongoose");
const errorHandler = require("./middleware/errorHandler");
const { constants } = require("./constants");
const CustomError = require("./middleware/customError");
require("dotenv").config();

const port = process.env.PORT || 2001;

connectDb();

app.use(express.json());
app.use("/kiddo",(req, res)=>{
    res.send("Hello");
});

app.use("/api/v1/account", require("./routes/loginRoutes"));

app.all("*", (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, constants.NOT_FOUND);
    next(err);
});

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`port running on ${port}`);
});