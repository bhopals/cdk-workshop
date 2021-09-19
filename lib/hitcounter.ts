import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as dynamoDB from '@aws-cdk/aws-dynamodb';

export interface IHitCounterProps {
    downstream: lambda.Function;
}

export class HitCounter extends cdk.Construct {

    public readonly handler: lambda.Function

    constructor(scope: cdk.Construct, id: string, props:IHitCounterProps) {
        super(scope, id);

        const dynamo = new dynamoDB.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamoDB.AttributeType.STRING }
        })

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambdas'),
            handler: 'hitcounter.handler',
            environment: { 
                HITS_COUNTER_TABLE_NAME: dynamo.tableName,
                DOWN_STREAM_FUNCTION_NAME: props.downstream.functionName
            }
        })

        dynamo.grantReadWriteData(this.handler)

        props.downstream.grantInvoke(this.handler);

    }
}