const snakeize = require('snakeize');

const getFormatedColumns = (obj) => Object.keys(obj).join(', ');

const getFormattedPlaceholders = (obj) => Object.keys(obj).map((_key) => '?').join(', ');

const getFormattedUpdateColumns = (object) => Object.keys(snakeize(object))
    .map((key) => `${key} = ?`)
    .join(', ');

module.exports = {
    getFormatedColumns,
    getFormattedPlaceholders,
    getFormattedUpdateColumns,
};