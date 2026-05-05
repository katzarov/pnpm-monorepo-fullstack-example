import { join } from 'node:path';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

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

    const codeDistPath = join(__dirname, "../../api/dist")

    const fn = new lambda.Function(this, "ApiNestHandler", {
      code: lambda.Code.fromAsset(codeDistPath),
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "main.handler",
      environment: {},
    });

    const api = new apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: fn,
    });

    new cdk.CfnOutput(this, 'HelloApiUrl', {
      value: api.url,
    });

  }
}
