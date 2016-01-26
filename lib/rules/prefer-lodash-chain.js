/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict';

var lodashUtil = require('../util/lodashUtil');
var astUtil = require('../util/astUtil');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var REPORT_MESSAGE = 'Prefer lodash chain';

    return {
        CallExpression: function (node) {
            var isLodashWrapperMethod = lodashUtil.isLodashWrapperMethod(node);
            if (!lodashUtil.isLodashCall(node) && (lodashUtil.isNativeCollectionMethodCall(node) || isLodashWrapperMethod)) {
                var caller = astUtil.getCaller(node);
                if (lodashUtil.isLodashCall(caller) && astUtil.getMethodName(caller) !== 'chain' && !isLodashWrapperMethod ||
                    lodashUtil.isLodashWrapper(astUtil.getCaller(caller)) && lodashUtil.isChainBreaker(caller)) {
                    context.report(node, REPORT_MESSAGE, {method: astUtil.getMethodName(node)});
                }
            }
        }
    };
};
