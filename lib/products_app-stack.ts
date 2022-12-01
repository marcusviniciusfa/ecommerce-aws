// import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductsAppStack extends cdk.Stack {
  readonly productsFetchHandler: lambdaNodeJS.NodejsFunction;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Um Construct (this) pode representar um único recurso da AWS, como um bucket do Amazon Simple Storage Service (Amazon S3). Um construct também pode ser uma abstração de nível superior que consiste em vários recursos relacionados da AWS
    this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(this, 'ProductsFetchHandler', {
      functionName: 'ProductsFetchHandler',
      entry: 'lambda/products/productsFetchFunction.ts',
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(5),
      bundling: {
        // Se deve reduzir os arquivos ao fazer o bundling
        minify: true,
        // Se os mapas de origem devem ser incluídos ao fazer o bundling
        sourceMap: false
      }
    });
  }
}
