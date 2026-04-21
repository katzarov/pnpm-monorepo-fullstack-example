import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

// import path from 'node:path';
// import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const fn = new NodejsFunction(this, 'MyFunction', {
    //   runtime: lambda.Runtime.NODEJS_22_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    //   bundling: {
    //   }
    // });

    const fn = new lambda.Function(this, "ApiNestHandler", {
      code: lambda.Code.fromAsset("../api/dist"),
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "main.handler",
      environment: {},
    });

    new apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: fn,
    });

  }
}
