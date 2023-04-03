const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://chandan:Chandan%40q23@cluster0.nrci4xc.mongodb.net/mongoAggrgationTry?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertOrders() {
  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const collection = client.db("mongoAggrgation").collection("PizzaOrders");

    const orders = [
      {
        _id: 0,
        name: "Pepperoni",
        size: "small",
        price: 19,
        quantity: 10,
        date: new Date("2021-03-13T08:14:30Z"),
      },
      {
        _id: 1,
        name: "Pepperoni",
        size: "medium",
        price: 20,
        quantity: 20,
        date: new Date("2021-03-13T09:13:24Z"),
      },
      {
        _id: 2,
        name: "Pepperoni",
        size: "large",
        price: 21,
        quantity: 30,
        date: new Date("2021-03-17T09:22:12Z"),
      },
      {
        _id: 3,
        name: "Cheese",
        size: "small",
        price: 12,
        quantity: 15,
        date: new Date("2021-03-13T11:21:39.736Z"),
      },
      {
        _id: 4,
        name: "Cheese",
        size: "medium",
        price: 13,
        quantity: 50,
        date: new Date("2022-01-12T21:23:13.331Z"),
      },
      {
        _id: 5,
        name: "Cheese",
        size: "large",
        price: 14,
        quantity: 10,
        date: new Date("2022-01-12T05:08:13Z"),
      },
      {
        _id: 6,
        name: "Vegan",
        size: "small",
        price: 17,
        quantity: 10,
        date: new Date("2021-01-13T05:08:13Z"),
      },
      {
        _id: 7,
        name: "Vegan",
        size: "medium",
        price: 18,
        quantity: 10,
        date: new Date("2021-01-13T05:10:13Z"),
      },
    ];

    // const result = await collection.insertMany(orders);
    // console.log(`${result.insertedCount} documents were inserted.`);

    // calculate the total order Quantity

    const result = await collection
      .aggregate([
        // Stage 1: Filter pizza order documents by pizza size
        {
          $match: { size: "medium" },
        },

        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
          $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } },
        },
      ])
      .toArray();

    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

insertOrders();
console.log("Done");
