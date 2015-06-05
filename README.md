Cookie Derail
=============

[![Build Status](https://travis-ci.org/holidayextras/node-cookie-derail.svg?branch=master)](https://travis-ci.org/holidayextras/node-cookie-derail)

Decode, and optionally verify the signature of, unencrypted Ruby on Rails cookies.

Alternative implementations of this require you to change the default serialization format on the Rails app's side to something like JSON - this does not, instead using a basic (hashes/arrays/strings/numbers only) [Marshal parser](http://github.com/shackpank/marsha) written in javascript.

Usage
-----

```javascript
var derail = require('cookie-derail');
var token = '3d8(...snip...)3cc5'

// in an HTTP server / express / whatever connection handler
var cookie = req.cookies._app_session;
```

Decode a cookie, verifying it has not been tampered with using the Rails app's secret token:

```javascript
var value = derail.decode(req.cookies._app_session, { secret: token });
```

Decode a cookie, ignoring the signature:

```javascript
var value = derail.decode(req.cookies._app_session, { verifySignature: false });
```

If something goes wrong an exception with details will be thrown.

Tests
-----

`npm test`

TODO
----

- encode as well as decode
- encrypted cookie support
