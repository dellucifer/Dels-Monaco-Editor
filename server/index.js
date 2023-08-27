const express = require("express");
const cors = require("cors");
// const Axios = require("axios"); ----------> Fk axios
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const { generateFile } = require("./generateFile");
const Job = require("./models/Job");
const {addJobToQueue} = require("./jobQueue");

// Connecting MongoDB
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/compilerapp');
  console.log("MongoDB connected successfully")
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if(jobId == undefined) {
    return res.status(400).json({success: false, error: "missing id parameter"})
  }

  try {
    const job = await Job.findById(jobId);
    
    if(job == undefined) {
      return res.status(404).json({success: false, error: "Not Found"});
    }

    return res.status(200).json({success: true, job});
  } catch(err) {
    return res.status(400).json({success: false, error: JSON.stringify(err)});
  }
})



app.post("/run", async (req, res) => {
  var { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  let job;

  try {
    // Some language rectification
    if (language === "python") {
      language = "py";
    }

    // Creating filepath
    const filePath = await generateFile(language, code);

    // Saving document in the DB
    job = await new Job({language, filepath: filePath}).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);
    res.status(201).json({success: true, jobId});

  } catch (err) {
    return res.status(500).json({success: false, error: JSON.stringify(err)});
  }
});

// Starting server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
