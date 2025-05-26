const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Customer = require('./models/Customer');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/customerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Parse CSV and Seed Database
const seedDatabase = async () => {
  try {
    // Check if data already exists to avoid duplicates
    const count = await Customer.countDocuments();
    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    const customers = [];
    fs.createReadStream('./dataset/Dataset.csv')
      .pipe(csv())
      .on('data', (row) => {
        customers.push({
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
      })
      .on('end', async () => {
        await Customer.insertMany(customers);
        console.log('CSV data successfully seeded into MongoDB');
      });
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed the database on server start
seedDatabase();

// Routes
app.use('/api/customers', customerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});