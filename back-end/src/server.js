import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import "dotenv/config";

async function start() {
  // connection to MongoDB
  const mongodbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-full-stack-vue.gntgnym.mongodb.net/?retryWrites=true&w=majority&appName=cluster-full-stack-vue`;
  const client = new MongoClient(mongodbUrl);

  // Database name
  const dbName = "fsv-db";
  await client.connect();
  const db = client.db(dbName);

  const app = express();
  app.use(express.json());

  app.use("/images", express.static(path.join(__dirname, "../assets")));

  app.use(
    express.static(path.resolve(__dirname, "../dist"), {
      maxAge: "1y",
      etag: false,
    })
  );

  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  }

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    const existingUser = await db.collection("users").findOne({ id: userId });
    if (!existingUser) {
      await db.collection("users").insertOne({
        id: userId,
        cartItems: [],
      });
    }

    const product = await db.collection("products").findOne({ id: productId });
    if (product) {
      await db
        .collection("users")
        .updateOne({ id: userId }, { $addToSet: { cartItems: productId } });
      const user = await db.collection("users").findOne({ id: userId });
      const populatedCart = await populateCartIds(user?.cartItems || []);
      res.json(populatedCart);
    } else {
      res.status(404).send("Product Id not found");
    }
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db
      .collection("users")
      .updateOne({ id: userId }, { $pull: { cartItems: productId } });

    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
}

start();
