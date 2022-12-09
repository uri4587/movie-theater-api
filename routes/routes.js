const express = require("express");
const userRouter = require("./User");
const showRouter = require("./Show");


module.exports = function(app) {
    app.use(express.json());

    app.use("/shows", showRouter);
    app.use("/users", userRouter)
}