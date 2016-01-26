/**
 * @fileoverview Rule to check if a call to filter should be a call to reject
 */
'use strict';

var lodashUtil = require('../util/lodashUtil');
var astUtil = require('../util/astUtil');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;
    var maxPropertyPathLength = parseInt(context.options[0], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH;

    function isNegativeExpressionFunction(func) {
        var returnValue = astUtil.getValueReturnedInFirstLine(func);
        var firstParamName = astUtil.getFirstParamName(func);
        return astUtil.isNegationOfParamMember(returnValue, firstParamName, maxPropertyPathLength) ||
            astUtil.isNotEqEqToMemberOf(returnValue, firstParamName, maxPropertyPathLength);
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isCallToMethod(node, 'filter') && isNegativeExpressionFunction(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.reject over negative condition');
            }
        }
    };
};

module.exports.schema = [
    {
        type: 'integer'
    }
];
