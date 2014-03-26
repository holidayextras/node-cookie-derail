var marsha = require('marsha');
var crypto = require('crypto');

var _splitCookie = function(input, options, callback) {
  options = options || {};
  var components = input.split('--');
  return callback(components[0], components[1], options);
};

module.exports = {
  decode: function(input, options) {
    return _splitCookie(input, options, function(data, signature, options) {
      if(options.verifySignature === false) {
        try {
          return marsha.load(data, 'base64');
        } catch(e) {
          throw new Error('Could not unmarshal cookie data: ' + e.message);
        }
      } else {
        var secret = options.secret;

        if(!secret) throw new Error('No secret token provided');

        var hmac = crypto.createHmac('sha1', secret);
        hmac.update(data);
        var digest = hmac.digest('hex');

        if(digest != signature) {
          throw new Error('Signature verification failed');
        }

        try {
          return marsha.load(data, 'base64');
        } catch(e) {
          throw new Error('Could not unmarshal cookie data:' + e.message);
        }
      }
    });
  }
};
