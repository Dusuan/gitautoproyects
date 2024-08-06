import express from "express";
import getFullProyectInfo from "./getFullProyectInfo.js";

export const maxDuration = 60;

const PORT = process.env.PORT || 4040;
const app = express();

app.use(express.json());

app.get("/:user", async (req, res) => {
  try {
    const userInfo = await getFullProyectInfo(req.params.user);
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
