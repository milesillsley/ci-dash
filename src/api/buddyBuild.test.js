import nock from 'nock';
import { populateBuddyBuildBuildList } from './buddyBuild';

const baseUrl = 'https://api.buddybuild.com';

describe('populate buddybuild build list', () => {

    it('returns list of jobs - singular', async () => {
        nock(baseUrl)
        .get('/v1/apps')
        .reply(200,[
                {
                    "_id": "1",
                    "app_name": "name1",
                }
            ]
        )
        nock(baseUrl)
        .get('/v1/apps/1/builds/latest')
        .reply(200, {"build_status": "success"})

        let buildList = await populateBuddyBuildBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[0].status).toEqual('success');
    })
    
    it('returns list of jobs - multiple', async () => {
        nock(baseUrl)
        .get('/v1/apps')
        .reply(200,[
                {
                    "_id": "1",
                    "app_name": "name1",
                },

                {
                    "_id": "1",
                    "app_name": "name2"
                }
            ]
        )
        nock(baseUrl)
        .get('/v1/apps/1/builds/latest')
        .twice()
        .reply(200, {"build_status": "success"})

        let buildList = await populateBuddyBuildBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[1].name).toEqual('name2');
    })
})
