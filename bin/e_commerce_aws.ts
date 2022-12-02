#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import 'source-map-support/register';
import { ENV, TAGS } from '../constants';
import { ECommerceApiStack } from '../lib/e_commerce_api-stack';
import { ProductsAppStack } from '../lib/products_app-stack';

dotenv.config();

// Observar relação de dependência entre as stacks

const app = new cdk.App();

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  tags: { cost: TAGS.cost },
  env: ENV
});

const eCommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  productFetchHandler: productsAppStack.getProductsFetchHandler(),
  tags: { cost: TAGS.cost },
  env: ENV
});

eCommerceApiStack.addDependency(productsAppStack);
