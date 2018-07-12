const { expect } = require('chai');
const config = require('./config');
const joinConfig = require('../index');
const _ = require('lodash');

describe('join-config', function () {

    it('config should be an object', function () {
        expect(config).to.be.an('object').that.have.property('port');
        expect(config).to.have.property('mongo');
        expect(config).to.have.property('testServer');
    })

    it('initially port should be 1234', function () {
        expect(config.port).to.equal(1234);
    })

    it('initially mongodb should be \'mongodb://localhost:27017/test\'', function () {
        expect(config.mongo).to.equal('mongodb://localhost:27017/test');
    })

    it('initially testServer should have port 2121', function () {
        expect(config.testServer.port).to.equal(2121);
    })

    it('initially numberProperty should be 1', function () {
        expect(config.numberProperty).to.equal(1);
    })

    const newMongo = 'mongodb://127.0.0.1/test2';
    const newTestServer = { host: '127.0.0.1', port: 1111 };
    const newNumberProperty = 2;

    process.argv = process.argv.concat([
        `mongo=${newMongo}`,
        `testServer=${JSON.stringify(newTestServer)}`,
        `numberProperty=${newNumberProperty}`
    ]);

    const newPort = 4444;
    process.env.PORT = newPort;

    it(`after join port should be ${newPort}`, function () {
        joinConfig(config);
        expect(config.port).to.equal(newPort);
    });



    it(`after join mongo should be ${newMongo}`, function () {
        expect(config.mongo).to.equal(newMongo);
    });


    it(`after join testServer port should be ${newTestServer.port}`, function () {
        expect(config.testServer.port).to.equal(newTestServer.port);
    });

    it(`after join numberProperty should be ${newNumberProperty}`, function () {
        expect(config.numberProperty).to.equal(newNumberProperty);
    })

});