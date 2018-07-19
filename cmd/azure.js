
const Azure = require('azure');
const MsRest = require('ms-rest-azure');

const log = console.log;

function azurelogin(username, password) {
  log('calling azurelogin ', password);

  // const user = process.env.AZURE_USER || 'sstrong@fnmoc.onmicrosoft.com';
  // const pass = process.env.AZURE_PASS || '';

  const user = username || 'sstrong@fnmoc.onmicrosoft.com';
  const pass =  password || '';


  MsRest.loginWithUsernamePassword(user, pass, (err, credentials) => {
    if (err) throw err;

    log('calling login complete');

    let storageClient = Azure.createStorageManagementClient(credentials, 'subscription-id');

    log(storageClient);

    // ..use the client instance to manage service resources.
  });
}


exports.login = azurelogin;