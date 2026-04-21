# pnpm-monorepo-fullstack-example

pnpm monorepo

nest js serverless

angular

cdk iac with local stack

https://medium.com/@ukpai/set-up-a-monorepo-using-pnpm-workspace-30688e95147a

might actually extend it with obsersability and e2e and basically dry run the way I want to setup my backing tracks app...

https://dev.to/vinomanick/create-a-monorepo-using-pnpm-workspace-1ebn



https://github.com/orgs/pnpm/discussions/4288

https://dev.to/heyradcode/surviving-pnpm-react-native-how-i-finally-stopped-metro-from-screaming-about-babelruntime-493i

https://docs.localstack.cloud/aws/integrations/containers/devcontainers/

## CDK

https://github.com/localstack/aws-cdk-local/issues/126

npm install -g aws-cdk-local aws-cdk --before=2026-03-04T19:20:55.760Z

cdk cli-telemetry --disable

cdk init app --language typescript --generate-only

pnpm install

## Nest

nest new api --skip-git --skip-install

pnpm --filter api test:e2e

https://dev.to/slsbytheodo/nestjs-on-aws-lambda-the-ultimate-cdk-deployment-strategy-for-monolithic-apis-380j

https://medium.com/@ddewaele/deploying-your-nestjs-app-as-a-lambda-behind-api-gateway-cbf5e61a6199
