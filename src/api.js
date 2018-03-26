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

router.get('/bitrise', async (req, res) => {
    let buildList = [];

    const buildJobsData = async () => {
        return request.get('https://api.bitrise.io/v0.1/apps')
            .set('Authorization', `token ${BITRISE_TOKEN}`)
            .then(response => response.body.data)
    }
    
    let buildJobStatus = async (buildId) => {
        return request.get(`https://api.bitrise.io/v0.1/apps/${buildId}/builds?limit=1`)
            .set('Authorization', `token ${BITRISE_TOKEN}`)
            .then(response => response.body.data)
    }

    let buildJobDataList = await buildJobsData();

    async function populateBuildList() {
        for (const build of buildJobDataList) {
            const buildStatus = await buildJobStatus(build.slug);
            const buildName = build.title;
            let buildObject = {
                name: buildName,
                status: buildStatus[0].status_text
            };

            buildList.push(buildObject);
        }
        res.json(buildList)
    }
    
    await populateBuildList();
})

router.get('/buddyBuild', (req, res) => {
    const url = 'https://api.buddybuild.com/v1/apps';

    request.get(url)
        .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
        .then(response => res.json(response.body))
})

router.get('/buddyBuild/{buildslug}', (req, res) => {
    const url = 'https://api.buddybuild.com/v1/builds/{buildSlug}';

    request.get(url)
        .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
        .then(response => res.json(response.body))
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
