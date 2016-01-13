'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/matches-shorthand');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = {
    always: [{message: 'Prefer matches syntax'}],
    never: [{message: 'Do not use matches syntax'}]
};
ruleTester.run('matches-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.reject(this.packages, {name: name});',
        'var isPublic = _.map([], function (i) { return i.id + "?"; });',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.reject([], function (i) { return i.id == 3; });',
        {code: 'var isPublic = _.find([], function(i) { return i.id === 3});', options: ['never']}
    ],
    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: errors.always
    }, {
        code: 'var isPublic = _.detect([], function (i) { return i.id === 3 && i.a === "string" && {a: 10} === i.b;});',
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var isPublic = _.select(arr, i => i.id === 3 && i.a === "string" && {a: 10} === i.b)',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var isPublic = _.reject(arr, (i) => {return i.id === 3})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var isPublic = _.some(arr, (i) => {return i.id === 3 && i.a === "string" && {a: 10} === i.b})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var isPublic = _.every(arr, (i) => {return i.id === b.id})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var isPublic = _.find([], i => i[0] === 3);',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: '_.reject(arr, function(i) { return i[b].c === compId; });',
        options: ['always', 3, true],
        errors: errors.always
    }, {
        code: '_.reject(arr, function(i) { return i.b.c === compId; });',
        errors: errors.always
    }, {
        code: '_.reject(arr, {b: {c: compId}});',
        options: ['never'],
        errors: errors.never
    }]
});
