const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    if(language === "python"){
        language = "py";
    }

    let data = ({
        "code": code,
        "language": language,
        "input": input
    });

    let config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    Axios(config).then((response) => {
        res.send(response.data);
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});