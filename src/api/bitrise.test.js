import nock from 'nock';
import { populateBitriseBuildList } from './bitrise';

const baseUrl = 'https://api.bitrise.io';

describe('populate bitrise build list', () => {

    it('returns list of jobs - singular', async () => {
        nock(baseUrl)
        .get('/v0.1/apps')
        .reply(200, {
            "data": [
                {
                    "slug": "1",
                    "title": "name1"
                }
            ]
        })
        nock(baseUrl)
        .get('/v0.1/apps/1/builds?limit=1')
        .reply(200, {
            "data": [
                { "status_text": "success" }
            ]
        })

        let buildList = await populateBitriseBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[0].status).toEqual('success');        
    })

    it('returns list of jobs - multiple', async () => {
        nock('https://api.bitrise.io')
        .get('/v0.1/apps')
        .reply(200, {
            "data": [
                {
                    "slug": "1",
                    "title": "name1"
                },
                {
                    "slug": "1",
                    "title": "name2"
                }
            ]
        })
        nock('https://api.bitrise.io')
        .get('/v0.1/apps/1/builds?limit=1')
        .twice()
        .reply(200, {
            "data": [
                { "status_text": "success" }
            ]
        })

        let buildList = await populateBitriseBuildList();
        expect(buildList[0].name).toEqual('name1');
        expect(buildList[1].name).toEqual('name2'); 
    })
})
