// const  Clarifai = require('clarifai');

// clarifai api key
// const app = new Clarifai.App({
//     apiKey: 'ba2d8090585c4e208d7e59199456ddaf'
//    });

const handleApiCall = (req, res) => {

    const PAT = '250c71f2f384418c9edd310fb8339caf';
    const USER_ID = 'benkyam';
    const APP_ID = 'facerecognition';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.id;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // app.models.predict('face-detection', req.body.input)

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}
   

const handleImage = (req, res ,db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}