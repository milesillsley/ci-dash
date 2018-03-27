import request from 'superagent';
import { TEAMCITY_API_CODE } from '../credentials';

const buildJobsData = async () => {
    return request.get('http://teamcity.tnl-core.ntch.co.uk/httpAuth/app/rest/builds')
        .set('Authorization', `Basic ${TEAMCITY_API_CODE}`)
        .set('Accept', `application/json`)        
        .then(response => response.body.build)
}

export const populateTeamcityBuildList = async () => {
    let buildJobDataList = await buildJobsData();
    let buildList = []; 
    for (const build of buildJobDataList) {
        const buildStatus = build.status;
        const buildName = build.buildTypeId;
        let buildObject = {
            name: buildName,
            status: buildStatus
        };
        buildList.push(buildObject);
    }
   return buildList
}
