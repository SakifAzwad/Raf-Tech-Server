const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//raf-tech
//zbaqF4dg78gRYx4u

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://raf-tech:zbaqF4dg78gRYx4u@cluster0.gp9ypzc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const raftechCol = client.db("raftech").collection("brand_name");

    const raftechCol2 = client.db("raftech").collection("product_name");

    app.get("/brandname", async (req, res) => {
      const cursor = raftechCol.find();
      const rest = await cursor.toArray();
      res.send(rest);
    });

    app.get("/products", async (req, res) => {
      
      const cursor = raftechCol2.find();
      const rest = await cursor.toArray();
      res.send(rest);
    });
    app.get("/products2", async (req, res) => {
      
      const cursor = raftechCol2.find();
      const rest = await cursor.toArray();
      res.send(rest);
    });
    
    app.get('/products2/:id',async(req,res)=>
     {
      const id=req.params.id;
      const query={_id: new ObjectId(id)};
      const result=await raftechCol2.findOne(query);
        res.send(result);
     })

     app.put('/products2/:id',async(req,res)=>
     {
      const id=req.params.id;
      const filter={_id: new ObjectId(id)};
      const options = {upsert : true};
      const update=req.body;
      const pro = 
      {
        $set:
        {
          image:update.image, 
          name:update.name, 
          brand_name:update.brand_name, 
          type:update.type, 
          price:update.price, 
          rating:update.rating, 
          details:update.details
        }
      }
      const result=await raftechCol2.updateOne(filter,pro,options);
        res.send(result);
     })
    app.post('/products',async(req,res)=>
    {
      const ne=req.body;
      const result=await raftechCol2.insertOne(ne);
      res.send(result);
    })

    app.get("/products/:brname", async (req, res) => {
        const brname = req.params.brname;
        const brname2 = brname.toUpperCase();
        const query = { brand_name: brname2 };
        const result = await raftechCol2.find(query).toArray();
        res.send(result);
      });


    app.get("/brandname/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await raftechCol.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port:${port}`);
});
