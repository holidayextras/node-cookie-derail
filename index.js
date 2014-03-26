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
        return marsha.load(data, 'base64');
      } else {
        var secret = options.secret;

        if(!secret) throw new Error('No secret token provided');

        var hmac = crypto.createHmac('sha1', secret);
        hmac.update(data);
        var digest = hmac.digest('hex');

        if(digest != signature) {
          throw new Error('Signature verification failed');
        }

        return marsha.load(data, 'base64');
      }
    });
  },
  decodeEncrypted: function(input, options) {
    return _splitCookie(input, options, function(data, signature, options) {
      if(options.verifySignature === false) {
        return marsha.load(data, 'base64');
      } else {
        var secret = options.secret;

        throw new Error('Not implemented yet');

        var iterations = options.iterations || 1000;
        var salt = options.salt || 'encrypted cookie';
        var signed_salt = options.signed_salt || 'signed encrypted cookie';

        var secret = crypto.pbkdf2Sync(data, salt, iterations, 32);
        var signedSecret = crypto.pbkdf2Sync(data, signed_salt, iterations, 64);

        var hmac = crypto.createHmac('sha1', signedSecret);
        hmac.update(data);
        console.error(hmac.digest('hex'), signature);
      }
    });
  }
};
