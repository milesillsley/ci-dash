import nock from 'nock';
import { populateJenkinsBuildList } from './jenkins';

const baseUrl = 'http://jenkins.dev.tnl-core.ntch.co.uk';

describe('populate jenkins build list', () => {

    it('returns list of jobs - singular', async () => {
        nock(baseUrl)
        .get('/api/json')
        .reply(200,{
            "jobs": [
                {
                    "name": "name1",
                    "color": "red"
                }
            ]
        })

        let buildList = await populateJenkinsBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[0].status).toEqual('red');
    })
    
    it('returns list of jobs - singular', async () => {
        nock(baseUrl)
        .get('/api/json')
        .reply(200,{
            "jobs": [
                {
                    "name": "name1",
                    "color": "red"
                },
                {
                    "name": "name2",
                    "color": "red"
                }
            ]
        })

        let buildList = await populateJenkinsBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[1].name).toEqual('name2');
    })
})
