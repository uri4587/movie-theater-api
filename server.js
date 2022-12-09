const express = require("express");
const app = express();

const {db} = require("./db");
require("./route/route")(app);

const port = 3000;

// app.use(urlencoded({extended: true}))




app.listen(port, () => {
    db.sync();
    console.log("Your server is listening on port " + port);
})