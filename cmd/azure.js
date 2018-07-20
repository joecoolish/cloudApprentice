
const Azure = require('azure');

var util = require('util');
var path = require('path');
var async = require('async');
var msRestAzure = require('ms-rest-azure');
var ComputeManagementClient = require('azure-arm-compute');
var StorageManagementClient = require('azure-arm-storage');
var NetworkManagementClient = require('azure-arm-network');
var ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;
var SubscriptionManagementClient = require('azure-arm-resource').SubscriptionClient;

const log = console.log;

var resourceClient, computeClient, storageClient, networkClient;

function azurelogin(username, password) {
  log('calling azurelogin ', password);

  // const user = process.env.AZURE_USER || 'sstrong@fnmoc.onmicrosoft.com';
  // const pass = process.env.AZURE_PASS || '';

  const user = username || 'sstrong@fnmoc.onmicrosoft.com';
  const pass =  password || '';


  msRestAzure.loginWithUsernamePassword(user, pass, (err, credentials) => {
    if (err) throw err;

    log('calling login complete');

    let subscriptionId = 'b156ff74-abbe-49c8-bc92-b80e8a7bad23';

    resourceClient = new ResourceManagementClient(credentials, subscriptionId);
    computeClient = new ComputeManagementClient(credentials, subscriptionId);
    storageClient = new StorageManagementClient(credentials, subscriptionId);
    networkClient = new NetworkManagementClient(credentials, subscriptionId);


    log(computeClient);

    log('\n>>>>>>>Start of Task5: List all vms under the current subscription.');
    computeClient.virtualMachines.listAll((err, result) => {
      if (err) {
        log(util.format('\n???????Error in Task5: while listing all the vms under ' + 
          'the current subscription:\n%s', util.inspect(err, { depth: null })));
        //callback(err);
      } else {
        log(util.format('\n######End of Task5: List all the vms under the current ' + 
          'subscription is successful.\n%s', util.inspect(result, { depth: null })));
        //callback(null, result);
      }
    });
    // ..use the client instance to manage service resources.
  });
}




exports.login = azurelogin;