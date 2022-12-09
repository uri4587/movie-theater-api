const express = require("express");
const userRouter = require("./User");
const showRouter = require("./Show");


module.exports = function(app) {
    app.use(express.json());

    app.use("/users", userRouter);
    app.use("/shows", showRouter);
}