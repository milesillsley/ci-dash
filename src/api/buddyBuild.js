import request from 'superagent';
import { BUDDYBUILD_TOKEN } from '../credentials';

const baseUrl = 'https://api.buddybuild.com/v1/apps';

const buildJobsData = async () => {
    return request.get(baseUrl)
        .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
        .then(response => response.body)
}

const buildJobStatus = async (buildId) => {
    return request.get(`${baseUrl}/${buildId}/builds/latest`)
        .set('Authorization', `Bearer ${BUDDYBUILD_TOKEN}`)
        .then(response => response.body.build_status)
}

export const populateBuddyBuildBuildList = async () => {
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
    return buildList
}