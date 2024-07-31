const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "150mb",
    extended: true,
  })
);
// app.use(express.limit('10M'));
app.use(cors());

// const topics = [
//   { id: 1, timestamp: "1717397440665" },
//   { id: 2, timestamp: "1717657969018" },
//   { id: 3, timestamp: "1717396886472" },
// ];

// Endpoint to get all books
app.get("/", (req, res) => {
  res.json({ ok: "ok" });
});
app.post("/tong", (req, res) => {
  res.json({ ok: "ok", msg: req.body });
});

// Create a new client and connect to MongoDB
var uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//-------

app.get("/dataTopics", async (req, res) => {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("primus");
    const topics = database.collection("topic");
    // Query for a movie that has the title 'The Room'
    const query = { _id: new ObjectId("6699ccf62b6439b4efec9563") };
    const data = await topics.findOne(query);

    res.json({ status: "ok", playload: data });
  } catch (e) {
  } finally {
    // await client.close();
  }
});

app.post("/topics/save", async (req, res) => {
  let dataInsert = req.body;
  try {
    const database = client.db("primus");
    const topics = database.collection("topic");

    const query = {
      _id: new ObjectId("6699ccf62b6439b4efec9563"),
    };
    // const options = { dataTopicMQTT: Array };

    const updateDoc = {
      $set: {
        dataTopicMQTT: dataInsert,
      },
    };
    const result = await topics.updateOne(query, updateDoc);

    res.json({
      status: " document inserted",
      result: result,
    });
  } finally {
    // Close the MongoDB client connection
    //  await client.close();
  }
});

app.put("/topics/update", async (req, res) => {
  try {
    let dataInsert = req.body;

    const database = client.db("primus");
    const topics = database.collection("topic");

    const filter = {
      _id: new ObjectId("6699ccf62b6439b4efec9563"),
      // dataTopicMQTT: Array,
    };

    const updateDoc = {
      $push: {
        dataTopicMQTT: dataInsert,
      },
    };
    const options = { dataTopicMQTT: Array };
    const result = await topics.updateOne(filter, updateDoc, options);
    //const data1 = await topics.findOne();
    res.json({
      status: "updated",
      updated: result,
    });
  } catch {
    res.json({
      status: "not updated",
    });
  } finally {
    // Close the connection after the operation completes
    // await client.close();
  }
});

app.delete("/topics/delete", async (req, res) => {
  try {
    let dataDelete = req.body;

    const database = client.db("primus");
    const topics = database.collection("topic");

    const filter = {
      _id: new ObjectId("6699ccf62b6439b4efec9563"),
    };

    const updateDoc = {
      $pull: {
        dataTopicMQTT: { topic: dataDelete.topic },
      },
    };
    const result = await topics.updateOne(filter, updateDoc);
    res.json({
      ok: "data deleted",
      updated: result,
    });
  } finally {
    //await client.close();
  }
});

//--------------

app.put("/topic/update", async (req, res) => {
  try {
    let dataInsert = req.body.topic;

    const database = client.db("primus");
    const topics = database.collection("topic");

    const filter = {
      _id: new ObjectId("66908c5a7cd75558361065d5"),
    };

    const updateDoc = {
      $push: {
        dataTopicMQTT: dataInsert,
      },
    };

    const result = await topics.updateOne(filter, updateDoc);
    //const data1 = await topics.findOne();
    res.json({
      status: "updated",
      updated: result,
    });
  } finally {
    // Close the connection after the operation completes
    // await client.close();
  }
});

app.delete("/topic/delete", async (req, res) => {
  try {
    let dataDelete = req.body.topic;

    const database = client.db("primus");
    const topics = database.collection("topic");

    const filter = {
      _id: new ObjectId("66908c5a7cd75558361065d5"),
    };

    const updateDoc = {
      $pull: {
        dataTopicMQTT: dataDelete, // Change `arrayField` and `newItem` as necessary
      },
    };
    const result = await topics.updateOne(filter, updateDoc);
    res.json({
      ok: "data deleted",
      updated: result,
    });
  } finally {
    //await client.close();
  }
});

//-----------------data flow-----------------------------------

app.get("/dataReactFlow", async (req, res) => {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("primus");
    const topics = database.collection("dataReactFlow");
    // Query for a movie that has the title 'The Room'
    const query = { _id: new ObjectId("6695c885c6f9ea5f790c046e") };
    const data = await topics.findOne(query);

    res.json({ status: "ok", playload: data });
  } catch (e) {
    res.json({ status: "Nok", playload: [] });
  } finally {
    // await client.close();
  }
});

app.post("/update/dataReactFlow/node", async (req, res) => {
  // res.json({ ok: "ok", msg: req.body });
  try {
    const database = client.db("primus");
    const topics = database.collection("dataReactFlow");

    const query = { _id: new ObjectId("6695c885c6f9ea5f790c046e") };
    const options = { node: Object };

    const updateDoc = {
      $set: {
        node: req.body,
      },
    };
    const result = await topics.updateOne(query, updateDoc, options);
    res.json({ ok: "ok", msg: "Update Data ReactFlow Success" });
  } finally {
  }
});

app.post("/update/dataReactFlow/Edge", async (req, res) => {
  // res.json({ ok: "ok", msg: req.body });
  try {
    const database = client.db("primus");
    const topics = database.collection("dataReactFlow");

    const query = { _id: new ObjectId("6695c885c6f9ea5f790c046e") };
    const options = { edge: Object };

    const updateDoc = {
      $set: {
        edge: req.body,
      },
    };
    const result = await topics.updateOne(query, updateDoc, options);
    res.json({ ok: "ok", msg: "Update Data ReactFlow Edge Success" });
  } finally {
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
