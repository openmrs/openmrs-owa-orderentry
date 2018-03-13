//Jsdom configuration
require('babel-register')
const jsdom = require('jsdom');
const sinon = require('sinon');

const exposedProperties = ['window', 'navigator', 'document'];

const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if(typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

global.event = {
    target: {
    name: 'name',
    value: 'value',
    }, 
    preventDefault: () => sinon.stub() 
};

process.env.NODE_ENV = 'test';

function noop() {
    return null;
}
