/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

var lodashUtil = require('../util/lodashUtil');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node) && lodashUtil.isLodashWrapperMethod(node.arguments[0])) {
                context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name});
            }
        }
    };
};
