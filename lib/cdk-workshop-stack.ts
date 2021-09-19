import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
import {HitCounter} from './hitcounter'

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaInstance = new lambda.Function(this, 'hello-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambdas'),
      handler: 'hitcounter.handler'
    })

   const hitCounter = new HitCounter(this, 'HitCounter', {
     downstream: lambdaInstance
   })
   const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
     handler: hitCounter.handler
   })
 }
}
