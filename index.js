const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://chandan:Chandan%40q23@cluster0.nrci4xc.mongodb.net/mongoAggrgationTry?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

//mongoose.connect("",{}).then().catch()

// lets insert demo data

const salesSchema = mongoose.Schema({
  id: Number,
  item: String,
  price: Number,
  quantity: Number,
});

const Sale = mongoose.model("Sale", salesSchema);

// const user = new User({
//     name: 'John Doe',
//     age: 30,
//     email: 'john.doe@example.com'
//   });

//   user.save(function(err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('User saved successfully');
//       console.log(user);
//     }
//   });

const sale1 = new Sale({
  id: 1,
  item: "apple",
  price: 70,
  quantity: 3,
});

const sale2 = new Sale({
  id: 2,
  item: "banana",
  price: 7,
  quantity: 74,
});

// phle aisa hota tha

// sale.save(function (err, sale) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("sales saved succesfully ");
//     console.log(sale);
//   }
// });

// sale1
//   .save()
//   .then((result) => {
//     console.log("Sale saved successfully ");
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const newEra = async function () {
//   try {
//     const result = await sale2.save();
//     console.log("sale2 saved successfully");
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// newEra();

// total revenue for each item.
//answer

const totalRevenue = async function () {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: "$item",
        totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);

  console.log(result);
};

totalRevenue();

// How can you count the number of documents in a collection?
// Hint: Use the $count stage.
