var _forEach = require('lodash').forEach;

module.exports = function (tag, attrs, inner) {

    var el = document.createElement(tag);

    _forEach(attrs, function(value, key){
        el[key] = value;
    });

    if (inner) el.innerHTML = inner;

    return el;

};
