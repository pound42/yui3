YUI.add('handlebars-base', function(Y) {

/*!
Handlebars.js - Copyright (C) 2011 Yehuda Katz
https://raw.github.com/wycats/handlebars.js/master/LICENSE
*/
/* THIS FILE IS GENERATED BY A BUILD SCRIPT - DO NOT EDIT! */

// BEGIN(BROWSER)
var Handlebars = {};

Handlebars.VERSION = "1.0.beta.2";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = Object.prototype.toString.call(context);

  if(type === "[object Function]") {
    context = context();
  }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(context[i]);
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  } else {
    return fn(context);
  }
});

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(context[i]);
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

// END(BROWSER)
// This file provides a YUI-specific implementations of Handlebars' lib/utils.js
// file. Handlebars unfortunately creates enclosed references to its utils, so
// we have to maintain a complete fork of this file rather than just overriding
// specific parts.

var Lang = Y.Lang;

Handlebars.Exception = function (message) {
    var error = Error.prototype.constructor.apply(this, arguments),
        key;

    for (key in error) {
        if (error.hasOwnProperty(key)) {
            this[key] = error[key];
        }
    }
};

Handlebars.Exception.prototype = new Error();

Handlebars.SafeString = function (string) {
    this.string = string;
};

Handlebars.SafeString.prototype.toString = function () {
    return this.string.toString();
};

Handlebars.Utils = {
    escapeExpression: function (string) {
        if (!string) {
            return '';
        }

        // Don't escape SafeStrings, since they're already (presumed to be)
        // safe.
        if (string instanceof Handlebars.SafeString) {
            return string.toString();
        }

        // Unlike Handlebars' escaping implementation, Y.Escape.html() will
        // double-escape existing &amp; entities. This seems much less
        // surprising than avoiding double-escaping, especially since
        // a lack of double-escaping would make it impossible to use Handlebars
        // for things like displaying escaped code snippets.
        return Y.Escape.html(string);
    },

    isEmpty: function (value) {
        if (value === false
                || !Lang.isValue(value)
                || (Lang.isArray(value) && !value.length)) {

            return true;
        }

        return false;
    }
};
/* THIS FILE IS GENERATED BY A BUILD SCRIPT - DO NOT EDIT! */

// BEGIN(BROWSER)
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials) {
    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, {helpers: helpers, partials: partials});
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in vm mode");
    } else {
      partials[name] = Handlebars.compile(partial);
      return partials[name](context, {helpers: helpers, partials: partials});
    }
  }
};

Handlebars.template = Handlebars.VM.template;

// END(BROWSER)
// This file contains YUI-specific wrapper code and overrides for the
// handlebars-base module.

Y.Handlebars = Handlebars;

Handlebars.VERSION += '-yui';


}, '@VERSION@' ,{requires:['escape']});