/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
'use strict';

var lodashUtil = require('../util/lodashUtil');
var astUtil = require('../util/astUtil');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    return {
        CallExpression: function (node) {
            var caller = astUtil.getCaller(node);
            if (lodashUtil.isChainBreaker(node) && !lodashUtil.isChainable(caller) && !lodashUtil.isExplicitMethodChaining(caller) &&
                lodashUtil.isLodashWrapper(astUtil.getCaller(caller))) {
                context.report(node, 'Do not use .value() after chain-ending method {{method}}', {method: astUtil.getMethodName(caller)});
            }
        }
    };
};
