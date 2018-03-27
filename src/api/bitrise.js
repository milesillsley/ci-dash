import request from 'superagent';
import { BITRISE_TOKEN } from '../credentials';

const buildBitriseJobsData = async () => {
    return request.get('https://api.bitrise.io/v0.1/apps')
        .set('Authorization', `token ${BITRISE_TOKEN}`)
        .then(response => response.body.data)
}

const buildBitriseJobStatus = async (buildId) => {
    return request.get(`https://api.bitrise.io/v0.1/apps/${buildId}/builds?limit=1`)
        .set('Authorization', `token ${BITRISE_TOKEN}`)
        .then(response => response.body.data)
}

export const populateBitriseBuildList = async () => {
    let buildJobDataList = await buildBitriseJobsData();        
    let buildList = [];        
    for (const build of buildJobDataList) {
        const buildStatus = await buildBitriseJobStatus(build.slug);
        const buildName = build.title;
        let buildObject = {
            name: buildName,
            status: buildStatus[0].status_text
        };

        buildList.push(buildObject);
    }
    return buildList;
}