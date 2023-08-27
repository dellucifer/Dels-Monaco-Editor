const Queue = require("bull");
const Job = require("./models/Job");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");

// Defining initiators
const jobQueue = new Queue("job-queue");
const LOAD = 5;

    // The task which Queue has to do with its jobs inside
jobQueue.process(LOAD, async ({ data }) => {
  console.log(data);
  const { id: jobId } = data;

    //  Finding job in DB
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error("job not found");
  }

  console.log("Fetched Job: ", jobId);

  try {
    // console.log("in try block")
    let output;
    job["startedAt"] = new Date();

    // Code execution
    // console.log("filePath: ", job.filepath);
    // console.log("filePath: ", filepath); ----------> The moment I realized I got screwd
    if (job.language === "cpp" || job.language==="c") {
      output = await executeCpp(job.filepath);
    } else if (job.language === "py") {
      output = await executePython(job.filepath);
    }

    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();
    return true;

  } catch (err) {
    console.log("Error");
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(err);
    await job.save();
    throw Error(JSON.stringify(err));
  }
});

// Handling failure of Queue
jobQueue.on("failed", (error) => {
  console.log(error.data.id, " Failed ", error.failedReason);
});

// Adding job to Queue
const addJobToQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

// Exporting modules
module.exports = {
  addJobToQueue,
};
