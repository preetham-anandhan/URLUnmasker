const express = require("express");
const cors = require("cors");
require("dotenv").config();

const domainRoutes = require("./routes/domainRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/domain", domainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});