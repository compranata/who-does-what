const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  if (context.auth.token.admin !== true) {
    return {error: 'only admins can add other admins.'}
  }

  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`
    };
  }).catch((error) => {
    return error;
  })
});

exports.addLeadRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (lead)
  if (context.auth.token.admin !== true) {
    return {error: 'only admins can add leads.'}
  }

  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      lead: true,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`
    };
  }).catch((error) => {
    return error;
  })
});
