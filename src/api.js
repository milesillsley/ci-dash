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

    const buildJobsData = async () => {
        return request.get('https://api.bitrise.io/v0.1/apps')
            .set('Authorization', `token ${BITRISE_TOKEN}`)
            .then(response => response.body.data)
    }
    
    const buildJobStatus = async (buildId) => {
        return request.get(`https://api.bitrise.io/v0.1/apps/${buildId}/builds?limit=1`)
            .set('Authorization', `token ${BITRISE_TOKEN}`)
            .then(response => response.body.data)
    }

    let buildJobDataList = await buildJobsData();

    const populateBuildList = async () => {
        let buildList = [];        
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

router.get('/buddyBuild', async (req, res) => {
    const url = 'https://api.buddybuild.com/v1/apps';

    const buildJobsData = async () => {
        return request.get(url)
            .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
            .then(response => response.body)
    }

    const buildJobStatus = async (buildId) => {
        return request.get(`https://api.buddybuild.com/v1/apps/${buildId}/builds/latest`)
            .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
            .then(response => response.body.build_status)
    }

    async function populateBuildList() {
        let buildJobDataList = await buildJobsData();
        let buildList = [];        
        for (const build of buildJobDataList) {
            const buildStatus = await buildJobStatus(build._id);
            
            const buildName = build.app_name;
            let buildObject = {
                name: buildName,
                status: buildStatus
            };

            buildList.push(buildObject);
        }
        res.json(buildList)
    }
    
    await populateBuildList();
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
