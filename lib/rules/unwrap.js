/**
 * @fileoverview Rule to ensure a lodash chain ends
 */
'use strict';

var lodashUtil = require('../util/lodashUtil');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    function isExplicitChainWithoutBreaker(node) {
        return lodashUtil.isExplicitMethodChaining(node) && !lodashUtil.isChainBreaker(node);
    }

    function isEvaluatedWhenLazy(node) {
        return lodashUtil.isCallToMethod(node, 'commit') || !lodashUtil.isChainable(node);
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isEndOfChain(node) && (!isEvaluatedWhenLazy(node) || isExplicitChainWithoutBreaker(node))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};
