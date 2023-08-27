const { exec } = require('child_process');

const executePython = async (filePath) => {
    return new Promise((resolve, reject) => {
        exec(`python ${filePath}`,
            (error, stdout, stderr) => {
                if(error) {
                    reject({error: stderr});
                }
                if(stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
    })
}

module.exports = {
    executePython,
}