const path = require('path');
const fs = require('fs');
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname, "codes");
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile = async (format, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, fileName);

    await fs.writeFileSync(filePath, Buffer.from(code, 'base64'));
    return filePath;
}

module.exports = {
    generateFile
};