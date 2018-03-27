import express from 'express';
import request from 'superagent';
import { JENKINS_API_CODE } from '../credentials';
import { populateBitriseBuildList } from './bitrise';
import { populateBuddyBuildBuildList } from './buddyBuild';
import { populateJenkinsBuildList } from './jenkins';

var app = express();
var router = express.Router(); 

router.get('/jenkins', async (req, res) => {
    let buildList = await populateJenkinsBuildList();
    res.json(buildList);
})

router.get('/bitrise', async (req, res) => {
    let buildList = await populateBitriseBuildList();
    res.json(buildList);
})

router.get('/buddyBuild', async (req, res) => {
    let buildList = await populateBuddyBuildBuildList();
    res.json(buildList);
})

router.get('/teamcity', (req, res) => {
    const url = 'http://teamcity.tnl-core.ntch.co.uk/httpAuth/app/rest/builds';
    const base64Token = 'dGltZXMtdG9vbHM6VG9vbHMxMjMh';

    request.get(url)
        .set('Authorization', `Basic: ${base64Token}`)
        .set('Accept', 'application/json')
        .then(response => res.json(response.body))
})

app.use('/api', router);

app.listen(8080, console.log("APP RUNNING ON http://localhost:8080"));
