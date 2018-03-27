import request from 'superagent';
import { JENKINS_API_CODE } from '../credentials';

const buildJobsData = async () => {
    return request.get('http://jenkins.dev.tnl-core.ntch.co.uk/api/json')
        .set('Authorization', `Basic ${JENKINS_API_CODE}`)
        .then(response => response.body.jobs)
}

export const populateJenkinsBuildList = async () => {
    let buildJobDataList = await buildJobsData();
    let buildList = []; 
    for (const build of buildJobDataList) {
        const buildStatus = build.color;
        const buildName = build.name;
        let buildObject = {
            name: buildName,
            status: buildStatus
        };
        buildList.push(buildObject);
    }
   return buildList
}
