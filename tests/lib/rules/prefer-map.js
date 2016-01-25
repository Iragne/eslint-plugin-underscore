'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-map');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.map over a _.each with a push to an array inside'}];
ruleTester.run('prefer-map', rule, {
    valid: [
        'var x = _.map(arr, function(x) {return x + 7})',
        '_.forEach(arr, function(x) { if (x.a) {a.push(x)}})',
        '_.each(arr, function(x) { if (x.a) {a.push(x)}})',
        '_.forEach(arr, function (x){ a.push(x); if (f(x)) {a.push(b)}});'
    ],
    invalid: [{
        code: '_.each(arry, function(x) { a.push(x)})',
        errors: errors
    }, {
        code: '_(arr).forEach(function(x) { a.push(x)})',
        errors: errors
    }, {
        code: '_(arr).forEach(function(x) { a.push(f(x))})',
        errors: errors
    }, {
        code: '_(arr).forEach(x => a.push(f(x)))',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }]
});
