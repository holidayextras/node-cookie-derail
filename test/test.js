var derail = require('../');
var assert = require('assert');

var example = 'BAh7CEkiD3Nlc3Npb25faWQGOgZFVEkiJTg5ZTBiODFmZWQxNmQ1MzA2NjczYmY1MjU1NDk5NmQ1BjsAVEkiEHRhbF9zZXNzaW9uBjsARkkiFTRhMjZkZGRiMjM5M2E3YzUGOwBGSSIZd2FyZGVuLnVzZXIudXNlci5rZXkGOwBUWwdbBmkKSSIiJDJhJDEwJDdJdXNyWjNhSXVuWllBREVOVDhQRXUGOwBU--95869713f1a59cb37a6565d029b9a2c91d76d9bb';
var SECRET_TOKEN = '3d86a6aaf488325927777abf3cdddd5d882a2ab2b364dd98c505336ecdfaf722b54593f4d87c71ff5248634c9f13025e681f829b61665fa65747efb618c93cc5';

describe('cookie-derail', function() {

  it('throws an error if no secret token is passed', function() {
    assert.throws(function() {
      derail.decode(example);
    }, /no secret token provided/i);
  });

  it('throws an error if an invalid secret token is passed', function() {
    assert.throws(function() {
      derail.decode(example, { secret: 'abababbabababababbabababbababababbabababababbaba' });
    }, /signature verification failed/i);
  });

  it('throws an error if the marshaled data is undecodable', function() {
    assert.throws(function() {
      derail.decode(example.substring(3), { verifySignature: false });
    }, /could not unmarshal cookie data/i);
  });

  it('deliberately does not verify the cookie if an option is passed', function() {
    assert.deepEqual(derail.decode(example, { verifySignature: false }), {
      session_id: '89e0b81fed16d5306673bf52554996d5',
      tal_session: '4a26dddb2393a7c5',
      'warden.user.user.key': [[5], '$2a$10$7IusrZ3aIunZYADENT8PEu']
    });
  });

  it('reads and returns the value if the correct signature is passed', function() {
    assert.deepEqual(derail.decode(example, { secret: SECRET_TOKEN }), {
      session_id: '89e0b81fed16d5306673bfdsbsdjhlasdfbldfjhbdfhbadsfbf52554996d5',
      tal_session: '4a26dddb2393a7c5',
      'warden.user.user.key': [[5], '$2a$10$7IusrZ3aIunZYADENT8PEu']
    });
  });

});
