import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductsAppStack extends cdk.Stack {
  private readonly productsFetchHandler: lambdaNodeJS.NodejsFunction;
  private readonly productsAdminHandler: lambdaNodeJS.NodejsFunction;
  private readonly productsTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.productsTable = new dynamodb.Table(this, 'ProductsTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      tableName: 'products',
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY // Política de exclusão de recursos, caso a Stack seja destroida
    });

    // Um Construct (this) pode representar um único recurso da AWS, como um bucket do Amazon Simple Storage Service (Amazon S3). Um construct também pode ser uma abstração de nível superior que consiste em vários recursos relacionados da AWS
    this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(this, 'ProductsFetchHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      functionName: 'ProductsFetchHandler',
      entry: 'lambda/products/productsFetchHandler.ts',
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(5),
      bundling: {
        // Se deve reduzir os arquivos ao fazer o bundling
        minify: true,
        // Se os mapas de origem devem ser incluídos ao fazer o bundling
        sourceMap: false
      },
      environment: {
        PRODUCTS_TABLE: this.productsTable.tableName // Captura o nome da tabela para dentro da função, utilizando uma variável de ambiente
      }
    });

    this.productsTable.grantReadData(this.productsFetchHandler); // Aplica permissão de somente leitura para a função Lambda de busca de produtos

    this.productsAdminHandler = new lambdaNodeJS.NodejsFunction(this, 'ProductsAdminHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      functionName: 'ProductsAdminHandler',
      entry: 'lambda/products/productsAdminHandler.ts',
      handler: 'handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(5),
      bundling: {
        minify: true,
        sourceMap: false
      },
      environment: {
        PRODUCTS_TABLE: this.productsTable.tableName
      }
    });

    this.productsTable.grantWriteData(this.productsAdminHandler); // Aplica permissão de somente escrita para a função Lambda de gerenciamento de produtos
  }

  public get useProductsFetchHandler(): lambdaNodeJS.NodejsFunction {
    return this.productsFetchHandler;
  }

  public get useProductsTable(): dynamodb.Table {
    return this.productsTable;
  }
}
