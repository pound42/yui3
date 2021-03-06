// This file contains YUI-specific wrapper code and overrides for the
// handlebars-compiler module.

var levels = ['debug', 'info', 'warn', 'error'];

Handlebars.logger.log = function (level, message) {
    Y.message(message, levels[level] || 'error', 'Handlebars');
};
