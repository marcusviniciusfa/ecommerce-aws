import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  if (event.resource === '/products') {
    if (event.httpMethod === 'GET') {
      console.log('GET');

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'GET Products - OK'
        })
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Bad request'
    })
  };
}
