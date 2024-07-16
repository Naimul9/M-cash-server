const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahphq0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection =  client.db("M-cashDb").collection("user")

    app.post('/register', async (req, res) => {
        const { name, pin, mobileNumber, email } = req.body;
      
        try {
          // Hash the PIN
          const salt = await bcrypt.genSalt(10);
          const hashedPin = await bcrypt.hash(pin, salt);
      
          // Create new user object
          const user = {
            name,
            pin: hashedPin,
            mobileNumber,
            email,
            status: 'Pending',
          };
      
          // Insert the user into the database
          const result = await db.collection('user').insertOne(user);
          res.status(201).send({ message: 'User registered successfully', userId: result.insertedId });
        } catch (error) {
          res.status(400).send({ message: 'Error registering user', error });
        }
      });
      















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('M-cash is running')
})

app.listen(port, ()=>{
    console.log(`M-cash is running on port ${port}`);
})


