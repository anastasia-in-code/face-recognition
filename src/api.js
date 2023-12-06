const apiService = {
    async handleImage(imgurl) {
        const PAT = process.env.REACT_APP_PAT;
        const USER_ID = process.env.REACT_APP_USER_ID;
        const APP_ID = process.env.REACT_APP_APP_ID;
        const MODEL_ID = process.env.REACT_APP_MODEL_ID;
        const IMAGE_URL = imgurl

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

        try {
            const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
            const result = await response.json()
            return  result
        } catch (error) {
            return {error}
        }
    }
}

export default apiService