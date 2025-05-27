const fs = require("fs")
const path = require("path")
const csv = require("csvtojson")
const Customer = require("./models/Customer")

async function seedDatabase() {
  const count = await Customer.countDocuments()
  if (count > 0) {
    console.log("Database already seeded")
    return
  }

  const csvFilePath = path.join(__dirname, "dataset", "Dataset.csv")
  const customers = await csv().fromFile(csvFilePath)
  await Customer.insertMany(customers)
  console.log("Database seeded successfully")
}

module.exports = seedDatabase
