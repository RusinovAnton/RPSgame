/**
 * @param {HTMLElement} target
 * @param {String} className
 * @returns {Boolean}
 */

module.exports = function(target, className) {
  var regx = new RegExp(className, 'g');
  return !!target.className.match(regx);
};
