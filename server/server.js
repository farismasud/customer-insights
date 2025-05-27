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
const BATCH_SIZE = 10000;

const seedDatabase = async () => {
  const count = await Customer.countDocuments();
  if (count > 0) {
    console.log('Database already seeded');
    return;
  }

  let batch = [];
  let total = 0;
  let rowCount = 0;

  const stream = fs.createReadStream('./dataset/Dataset.csv').pipe(csv());

  return new Promise((resolve, reject) => {
    stream
      .on('data', async (row) => {
        rowCount++;

        try {
          const doc = {
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
          };

          batch.push(doc);

          if (batch.length >= BATCH_SIZE) {
            stream.pause();
            await Customer.insertMany(batch, { ordered: false });
            total += batch.length;
            console.log(`Inserted ${total} records so far...`);
            batch = [];
            stream.resume();
          }
        } catch (err) {
          console.error(`Error on row ${rowCount}:`, err.message);
        }
      })
      .on('end', async () => {
        try {
          if (batch.length > 0) {
            await Customer.insertMany(batch, { ordered: false });
            total += batch.length;
          }
          console.log(`Seeding complete. Total rows processed: ${rowCount}`);
          console.log(`Total inserted: ${total}`);
          resolve();
        } catch (err) {
          console.error('Final insert error:', err.message);
          reject(err);
        }
      })
      .on('error', (err) => {
        console.error('Stream error:', err.message);
        reject(err);
      });
  });
};

seedDatabase();

// Routes
app.use('/api/customers', customerRoutes);

// // Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = app
