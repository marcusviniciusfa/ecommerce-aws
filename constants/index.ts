import * as cdk from 'aws-cdk-lib';

export const ENV: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

export const TAGS = {
  cost: 'ECommerce'
};
