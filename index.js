import puppeter from "puppeteer";
import pinnedProyects from "./getProyectUrls.js";
import getFullProyectInfo from "./getFullProyectInfo.js";
import express from "express";
  // const result = await getFullProyectInfo(user);

  const app = express();
  app.use(express.json());

  app.listen(
    8080,
    () => console.log("Server running")
  )

  app.get("/", async (req, res) => {
    const user = req.query.user;
    if(!user) {
      res.status(400).send({error: "You must provide a user"});
      return;
    }
    const info = await getFullProyectInfo(req.query.user);
    res.status(200).send(info);

  });