require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Customer = require('./models/Customer');
const customerRoutes = require('./routes/customerRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Parse CSV and Seed Database
const seedDatabase = async () => {
  try {
    const count = await Customer.countDocuments();
    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    const BATCH_SIZE = 1000;
    let batch = [];

    const stream = fs.createReadStream('./dataset/Dataset.csv');

    stream
      .pipe(csv())
      .on('data', async (row) => {
        batch.push({
          number: parseInt(row['Number']),
          nameOfLocation: row['Name of Location'],
          date: row['Date'],
          loginHour: row['Login Hour'],
          name: row['Name'],
          age: parseInt(row['Age']),
          gender: row['Gender'],
          email: row['Email'],
          noTelp: row['No Telp'],
          brandDevice: row['Brand Device'],
          digitalInterest: row['Digital Interest'],
          locationType: row['Location Type'],
        });

        if (batch.length >= BATCH_SIZE) {
          stream.pause();
          await Customer.insertMany(batch);
          batch = [];
          stream.resume();
        }
      })
      .on('end', async () => {
        if (batch.length > 0) {
          await Customer.insertMany(batch);
        }
        console.log('CSV data successfully seeded into MongoDB');
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
      });

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed the database on server start
seedDatabase();

// Routes
app.use('/api/customers', customerRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// This is used by Vercel to run the server
module.exports = app
