import express from 'express';
import request from 'superagent';
import { populateBitriseBuildList } from './bitrise';
import { populateBuddyBuildBuildList } from './buddyBuild';
import { populateJenkinsBuildList } from './jenkins';
import { populateTeamcityBuildList } from './teamcity';

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

router.get('/teamcity', async (req, res) => {
    let buildList = await populateTeamcityBuildList();
    res.json(buildList);
})

app.use('/api', router);
app.listen(8080, console.log("APP RUNNING ON http://localhost:8080"));
