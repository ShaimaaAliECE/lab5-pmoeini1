const express = require('express');
const jobs = require('./jobs.json');

const app = express();

app.use(express.static('static'));

app.get('/getCategories', (req, res) => {
    let categories = {};
    for (let j in jobs) {
        for (let c in jobs[j].categories) {
            if (!categories[c]) {
                categories[c] = 1;
            } else {
                categories[c]++;
            }
        }
    }
    res.json(categories);
});

app.get('/:category', (req, res) => {
    let catJobs = [];
    for (let j in jobs) {
        if (jobs[j].categories.includes(req.params.category)) {
            catJobs.push(j);
        }
    }
    res.json({
        jobs: catJobs,
    });
});

app.get('/jobsInCity', (req, res) => {
    let cityJobs = [];
    for (let j in jobs) {
        if (jobs[j].title.includes(req.query.city)) {
            cityJobs.push(j);
        }
    }
    res.json({
        jobs: cityJobs,
    });
});

app.listen(3000);
