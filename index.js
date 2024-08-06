import getFullProyectInfo from "./getFullProyectInfo.js";
import express from "express";
const PORT = process.env.port || 4040
const app = express();
app.use(express.json());

app.get("/:user", async (req, res) => {
  res.send(await getFullProyectInfo(req.params.user));
});

app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`Server running on port ${PORT}`);
})