require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());


app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {

    res.send("Backend Running");

});


const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});