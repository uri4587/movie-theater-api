const express = require("express");
const app = express();
const {db} = require("./db");
require("./routes/routes")(app);
const port = 3000;






app.listen(port, () => {
    db.sync();
    console.log(`Listening on port ${port}`)
})