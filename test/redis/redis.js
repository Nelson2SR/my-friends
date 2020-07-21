const assert = require('assert')
const v8 = require('v8')
const { RedisService } = require('./redis-service')
const client = new RedisService()

describe('Redis', function () {
    describe('v8', function () {
        describe('#serialize', async function () {
            it('should return original value when the object is serialized and deserialized', async function () {
                const key = 'mf:group:key'
                const value = [{
                    'name' : 'gym',
                    'description' : 'join us'
                }]
                console.log('Serialized object: %s', v8.serialize(value))
                console.log('Deserialized object: %s', JSON.stringify(v8.deserialize(v8.serialize(value))))
                assert.equal(JSON.stringify(v8.deserialize(v8.serialize(value))), JSON.stringify(value))
            });
        })
    });
    describe('client', function () {
        describe('#setAsync', async function () {
            it('should return original when the string object is set in redis', async function () {
                const key = 'mf:group:key'
                const value = [{
                    'name' : 'gym',
                    'description' : 'join us'
                }]
                const postResult =  await client.postObject(key, JSON.stringify(value))
                console.log('Post result %s', postResult)
                const getResult = await client.getObject(key)
                console.log('Buffer result %s', getResult)
                assert.equal(getResult, JSON.stringify(value))
            });
            it('should return original when the buffer object is set in redis', async function () {
                const key = 'mf:group:key'
                // const value = [{
                //     'name' : 'gym',
                //     'description' : 'join us'
                // }]
                const value = 'This is a test value'
                console.log('Post value %s', v8.serialize(JSON.stringify(value)))
                await client.postObject(key, v8.serialize(JSON.stringify(value)))
                const getResult = await client.getObject(key)
                console.log('Buffer result %s', v8.deserialize(new Uint8Array(getResult)))
                // assert.equal(getResult, JSON.stringify(value))
            });
        });
        describe('#delete', async function () {
            it('should remove the key when delete action',async function () {
                const key = 'mf:group:own:o_ZGt4myqZx0_BOlfyOYhCfutwVk'
                const delObject = await client.deleteObject(key)
                console.log('Deleted object: %s', delObject)
            })
        });
        describe('#clear', async function () {
            it('should remove all keys', async function () {
                const result = await client.flushDb()
                console.log('Flush result %s', result)
            })
        });
        describe('geo', function () {
            it('#geoAdd', async function () {
                const locationKey = 'Singapore'
                const name = 'name'+Math.random().toString()
                const longitude = Math.random() * 180 * ( Math.random() > 0.5 ? 1 : -1)
                const latitude = Math.random() * 85 * ( Math.random() > 0.5 ? 1 : -1)
                console.log('coordinate [%s, %s]', longitude, latitude)
                const result = await client.geoAdd(locationKey, -113, -78, name)
                console.log('result %s - %s', result, name)
            });
            it('#getRadius', async function () {
                const locationKey = 'Singapore'
                const result = await client.geoRadius(locationKey, -113, -78, 500, 'km')
                console.log('result %s', JSON.stringify(result))
            })
        });
    })
});