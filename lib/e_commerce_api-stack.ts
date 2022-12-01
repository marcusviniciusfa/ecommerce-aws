import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cloudwatchlogs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

interface IEcommerceApiStackProps extends cdk.StackProps {
  productFetchHandler: lambdaNodeJS.NodejsFunction;
}

export class ECommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IEcommerceApiStackProps) {
    super(scope, id, props);

    const logGroup = new cloudwatchlogs.LogGroup(this, 'ECommerceApiLogs');

    const api = new apigateway.RestApi(this, 'ECommerceApi', {
      restApiName: 'ECommerceApi',
      deployOptions: {
        accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          ip: true, // Configuração custosa
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          caller: true,
          user: true // Configuração custosa
        })
      }
    });

    const productsFetchIntegration = new apigateway.LambdaIntegration(props.productFetchHandler);

    // root = '/'
    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET', productsFetchIntegration);
  }
}
