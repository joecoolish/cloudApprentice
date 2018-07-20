const AWS = require('aws-sdk');
var fs = require("fs")

//cidata = JSON.parse(fs.readFileSync(process.env.CIDATA))

// reminder me to set these or
if(! process.env.AWS_SDK_LOAD_CONFIG  ||  ! process.env.AWS_PROFILE ) {
  console.error( "export AWS_SDK_LOAD_CONFIG=true ")
  console.error( "export AWS_PROFILE=default_sts ")
  process.exit(1)
}
  
var request = new AWS.EC2().describeInstances( (e,d) => { 
   if (e) process.stderr.write(err, err.stack);
   else process.stdout.write(JSON.stringify(d));
});


