# ECommerce AWS (Anotações do Estudo de Caso)

App Back-End de ECommerce criado CDK e linguagem TypeScript

## Sumário

1. [Visão Geral (Diagrama)](#visão-geral-diagrama)
2. [Gerenciamento de Produtos (Diagrama)](#gerenciamento-de-produtos-diagrama)
3. [AWS CloudFormation](#aws-cloudformation)
   1. [Stacks](#stacks)
   2. [Passos no provisionamento de um recurso](#passos-no-provisionamento-de-um-recurso)
   3. [AWS CDK (Cloud Development Kit)](#aws-cdk-cloud-development-kit)
      1. [Comandos úteis](#comandos-úteis)
4. [Recursos Utilizados](#recursos-utilizados)
   1. [AWS IAM (Identity and Access Management)](#aws-iam-identity-and-access-management)
   2. [AWS Lambda](#aws-lambda)
   3. [AWS Lambda Layers](#aws-lambda-layers)
   4. [AWS API Gateway](#aws-api-gateway)
   5. [REST API](#rest-api)
   6. [WebSocket API](#websocket-api)
   7. [AWS DynamoDB](#aws-dynamodb)
   8. [NoSQL](#nosql)
   9. [Stream](#stream)
   10. [AWS SNS (Simple Notification Service)](#aws-sns-simple-notification-service)
   11. [AWS SQS (Simple Queue Service)](#aws-sqs-simple-queue-service)
   12. [AWS S3 (Simple Storage Service)](#aws-s3-simple-storage-service)
   13. [AWS SES (Simple Email Service)](#aws-ses-simple-email-service)
   14. [AWS Event Bridge](#aws-event-bridge)
   15. [AWS X-Ray](#aws-x-ray)
   16. [AWS CloudWatch Alarms](#aws-cloudwatch-alarms)
   17. [AWS Cost Explorer](#aws-cost-explorer)
5. [Resolução de problemas](#resolução-de-problemas)

## Visão Geral (Diagrama)

### Gerenciamento de Produtos (Diagrama)

## Recursos Utilizados

### AWS CloudFormation

Processo automatizado que permite gerenciar o provisionamento implantações de infraestrutura da AWS. O AWS CloudFormation permite usar um arquivo de modelo (template) para criar e excluir uma coleção de recursos juntos como uma única unidade (stack)

#### Stacks

Unidade única para organizar e gerenciar recursos relacionados entre si.

#### Passos no provisionamento de um recurso

1. Criação do Template em formato JSON ou YAML
2. O template é submetido ao CloudFormation
3. Stacks são criadas para gerenciar o processo de provisionamento dos recursos
4. Recursos são criados sob Stacks

![CloudFormation Process](cloudformation-process.png)

### AWS CDK (Cloud Development Kit)

* Framework para criação de recursos na nuvem
* Modela recursos de infraestrutura utilizando linguagens de programação como: TypeScript, JavaScript, Python, Java e C#/.Net e Go, e transforma em modelos (templates) JSON/YAML
* Utiliza bibliotecas públicas da AWS

![App Stacks](app-stacks.png)

#### Comandos úteis

* `aws configure` configura a conta com o access key id e o secret access key
* `mkcd project-name && cdk init app --language typescript` cria um novo projeto utilizando o TypeScript para a geração de Templates
* `cdk list` ou `cdk ls` lista todas as Stacks do App
* `cdk diff` compara uma Stack especifica com a Stack implantada ou um arquivo de Template local e retorna se alguma diferença for encontrada
* `cdk destroy --all` Destroi todas as Stacks disponíveis, e os serviços sob a mesma
* `cdk bootstrap` implanta a Stack do CDK no ambiente AWS
* `cdk deploy --all` implanta todas as pilhas disponíveis em sua conta da AWS

### AWS IAM (Identity and Access Management)

Serviço que ajuda a controlar o acesso aos recursos da AWS de forma segura. O IAM é utilizado para controlar quem é autenticado (fez login) e autorizado (tem permissões) a usar os recursos

### AWS Lambda

Recurso de função com concorrência (tratar mais de uma execução ao mesmo tempo), invocada por trigger/evento, executada dentro de um ambiente de execução (NodeJS no caso). O custo é por tempo de execução e memória consumida, logo, otimizações para redução do tempo de execução e memória consumida são prioridades

#### AWS Lambda Layers

### AWS API Gateway

Recurso para criação de APIs REST e de WebSocket

* Validação de URI
* Validação de verbos HTTP
* Validação do corpo das requisições
* Integração com outros recursos AWS
* Integração com AWS Cognito para autenticação e autorização de usuários
* Gráficos de monitoramento no Cloud Watch

#### REST API

| Operação                   | URL             | Verbo HTTP |
|----------------------------|-----------------|------------|
| Listar todos os produtos   | /products       | **GET**    |
| Buscar um produto          | /productos/{id} | **GET**    |
| Criar um produto           | /products       | **POST**   |
| Alterar um produto pelo id | /products/{id}  | **PUT**    |
| Apagar um produto pelo id  | /products/{id}  | **DELETE** |

#### WebSocket API

### AWS DynamoDB

Recurso de Banco de Dados NoSQL

* Criação de tabelas, sem a necessidade de um servidor
* Armazenar itens baseados em documentos ou chave-valor
* Altamente escalável e com regras de segurança bem definidas
* Pode excluir itens automaticamente baseado em um TTL
* Modo de capacidade de leitura/escrita sob demanda ou provisionamento
* Unidades de leitura e escrita
* Permite a criação de regras de auto scaling (modo provisionado)
* Utilização de chave primária composta traz benefícios em certos cenários, como balanceamento de tráfego de acesso e facilidade de implementação de algumas pesquisas

#### NoSQL

##### Modelo de Product

```typescript
// Os campos não são rígidos, é preciso respeitar apenas a chave primária

interface Product {
  id: string;
  name?: string;
  model?: string;
  productUrl?: string;
  code?: string;
  price?: number;
  [prop: string]: any;
}
```

#### Stream

### AWS SNS (Simple Notification Service)

### AWS SQS (Simple Queue Service)

### AWS S3 (Simple Storage Service)

### AWS SES (Simple Email Service)

### AWS Event Bridge

### AWS X-Ray

### AWS CloudWatch Alarms

### AWS Cost Explorer

## Resolução de problemas

* [AWS Cloud Formation: role (arn:aws:iam:xxx) is invalid or cannot be assumed](https://thewerner.medium.com/aws-cloud-formation-role-arn-aws-iam-xxx-is-invalid-or-cannot-be-assumed-14c17e1098e2)
* [How to enable CloudWatch logs for API Gateway](https://kennbrodhagen.net/2016/07/23/how-to-enable-logging-for-api-gateway/)

