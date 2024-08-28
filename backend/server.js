const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/random-species", async (req, res) => {
    try {
        const response = await axios.get(
            "https://xeno-canto.org/api/2/recordings",
            {
                params: {
                    query: 'cnt:"United States"',
                    page: Math.floor(Math.random() * 10) + 1,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching from Xeno-Canto API:", error);
        res.status(500).send("Error fetching species data");
    }
});

app.get("/api/species-page", async (req, res) => {
    try {
        const { genus, species } = req.query;
        const response = await axios.get(
            `https://xeno-canto.org/species/${genus}-${species}`
        );
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching species page:", error);
        res.status(500).send("Error fetching species page");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
