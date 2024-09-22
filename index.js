// const express = require('express');
// const mongoose = require('mongoose');


// // Connect to MongoDB
// mongoose.connect('mongodb+srv://amjad-flutter:A3TdnpOo8lJxWsOs@d-backend-cluster0.104q4.mongodb.net/', {
//     //mongodb+srv://amjad-flutter:A3TdnpOo8lJxWsOs@d-backend-cluster0.104q4.mongodb.net/
//     // A3TdnpOo8lJxWsOs
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Failed to connect to MongoDB:', error);
//     });
    const express = require('express');
    const { MongoClient, ObjectId } = require('mongodb');
    const bodyParser = require('body-parser');
    
    const app = express();
    const port = 3000;
    
    // Connection URL
    const url = 'mongodb+srv://amjad-flutter:A3TdnpOo8lJxWsOs@d-backend-cluster0.104q4.mongodb.net/';
    const dbName = 'd-database';
    
    app.use(bodyParser.json());
    
    // Connect to MongoDB
    let db;
    
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
      })
      .catch(err => console.error('Failed to connect to MongoDB:', err));
    // Get Request
      app.get('/', (req, res) => {
        try {
       
          res.json({ message: 'Project is runnig successfully'});
        } catch (err) {
          res.status(500).json({ error: 'Error in running projectß' });
        }
      });
    
    // Insert data
    app.post('/insert', async (req, res) => {
      try {
        const collection = db.collection('myCollection');
        const result = await collection.insertOne(req.body);
        res.json({ message: 'Data inserted successfully', insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: 'Error inserting data' });
      }
    });
    
    // Fetch all data
    app.get('/fetch', async (req, res) => {
      try {
        const collection = db.collection('myCollection');
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
      }
    });
    
    // Fetch data by ID
    app.get('/fetch/:id', async (req, res) => {
      try {
        const collection = db.collection('myCollection');
        const data = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ error: 'Data not found' });
        }
      } catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
      }
    });
    
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });







