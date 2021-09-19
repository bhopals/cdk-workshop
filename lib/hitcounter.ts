import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'

export interface IHitCounterProps {
    downstream: lambda.Function;
}

export class HitCounter extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string, props:IHitCounterProps) {
        super(scope, id);

        //TODO 
    }
}