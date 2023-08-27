const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = async (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    // console.log("outPath: ", outPath);
    // console.log("outputPath: ", outputPath);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ${jobId}.exe`,
            (error, stdout, stderr) => {
                // if(error) {
                //     reject({error, stderr});
                //     return;
                // }
                // if(stderr) {
                //     reject(stderr);
                // }

                error && reject({error, stderr});
                stderr && reject(stderr);
                resolve(stdout);
            });
    })
}

module.exports = {
    executeCpp
}