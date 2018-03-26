import express from 'express';
import { JENKINS_API_CODE, BITRISE_TOKEN, BUDDYBUILD_TOKEN } from './credentials.js';
import request from 'superagent';
var app = express();
var router = express.Router(); 


router.get('/jenkins', (req, res) => {
    const url = 'http://jenkins.dev.tnl-core.ntch.co.uk/api/json';    
    request.get(url)
    .set('Authorization', `Basic ${JENKINS_API_CODE}`)
    .then(response => res.json(response.body))
})

router.get('/bitrise', (req, res) => {
    const url = 'https://api.bitrise.io/v0.1/apps';    
    request.get(url)
    .set('Authorization', `token ${BITRISE_TOKEN}`)
    .then(response => res.json(response.body))
})

router.get('/buddyBuild', (req, res) => {
    const url = 'https://api.buddybuild.com/v1/apps';    
    request.get(url)
    .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
    .then(response => res.json(response.body))
})

app.use('/api', router);

app.listen(8080, console.log("APP RUNNING ON http://localhost:8080"))