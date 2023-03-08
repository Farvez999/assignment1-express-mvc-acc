const express = require('express');
const cors = require('cors');
const userRouters = require('./routes/user.route');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouters);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})