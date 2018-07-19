

const AWS = require('aws-sdk');

if(! process.env.AWS_SDK_LOAD_CONFIG  ||  ! process.env.AWS_PROFILE ) {
  console.error( "export AWS_SDK_LOAD_CONFIG=true ")
  console.error( "export AWS_PROFILE=default_sts ")
  process.exit(1)
}
  

var request = new AWS.EC2({apiVersion: '2014-10-01'}).describeInstances();

request.on('success', function(response) {
  console.log(response.data); 
});

request.send();

