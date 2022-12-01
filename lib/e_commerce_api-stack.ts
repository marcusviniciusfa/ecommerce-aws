import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
// import * as cloudwatchlogs from 'aws-cdk-lib/aws-logs';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';

interface IEcommerceApiStackProps extends cdk.StackProps {
  productFetchHandler: lambdaNodeJS.NodejsFunction;
}

export class ECommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IEcommerceApiStackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'ECommerceApi', {
      restApiName: 'ECommerceApi'
    });

    const productsFetchIntegration = new apigateway.LambdaIntegration(props.productFetchHandler);

    // root = '/'
    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET', productsFetchIntegration);
  }
}
