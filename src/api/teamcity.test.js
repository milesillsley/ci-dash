import nock from 'nock';
import { populateTeamcityBuildList } from './teamcity';

const baseUrl = 'http://teamcity.tnl-core.ntch.co.uk';

describe('populate teamcity build list', () => {

    it('returns list of jobs - singular', async () => {
        nock(baseUrl)
        .get('/httpAuth/app/rest/builds')
        .reply(200,{
            "build": [
                {
                    "buildTypeId": "name1",
                    "status": "SUCCESS",
                }
            ]
        })

        let buildList = await populateTeamcityBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[0].status).toEqual('SUCCESS');
    })
    
    it('returns list of jobs - multiple', async () => {
        nock(baseUrl)
        .get('/httpAuth/app/rest/builds')
        .reply(200,{
            "build": [
                {
                    "buildTypeId": "name1",
                    "status": "SUCCESS",
                },
                {
                    "buildTypeId": "name2",
                    "status": "SUCCESS",
                }
            ]
        })

        let buildList = await populateTeamcityBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[1].name).toEqual('name2');
    })
})
