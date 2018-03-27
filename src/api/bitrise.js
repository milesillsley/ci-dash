import request from 'superagent';
import { BITRISE_TOKEN } from '../credentials';

const baseUrl = 'https://api.bitrise.io/v0.1/apps';

const buildJobsData = async () => {
    return request.get(baseUrl)
        .set('Authorization', `token ${BITRISE_TOKEN}`)
        .then(response => response.body.data)
}

const buildJobStatus = async (buildId) => {
    return request.get(`${baseUrl}/${buildId}/builds?limit=1`)
        .set('Authorization', `token ${BITRISE_TOKEN}`)
        .then(response => response.body.data)
}

export const populateBitriseBuildList = async () => {
    let buildJobDataList = await buildJobsData();        
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
    return buildList;
}