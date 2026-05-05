import { execSync } from "node:child_process"
import { join, resolve } from "node:path"
import { loadEnvFile } from 'node:process';
import { test as setup } from '@playwright/test';
import { DockerComposeEnvironment, Wait, LABEL_TESTCONTAINERS_SESSION_ID } from "testcontainers";

// https://github.com/testcontainers/testcontainers-node/issues/1274
// https://docs.localstack.cloud/aws/tutorials/gitlab-ci-testcontainers/
// https://hashnode.localstack.cloud/testing-aws-cdk-stacks-on-github-actions-with-localstack
setup('create infra', async ({ }) => {
  console.log('creating infra...');

  const envPath = join(__dirname, '../../../secret.env');

  loadEnvFile(envPath);

  if (typeof process.env.LOCALSTACK_AUTH_TOKEN !== 'string') {
    throw Error("No localstack token");
  }

  const composeFilePath = join(__dirname, '../../../');
  const composeFile = "docker-compose.yml";

  const lsContainerName = 'e2e-localstack-main';

  // https://docs.localstack.cloud/aws/tutorials/gitlab-ci-testcontainers/#_top
  const environment = await new DockerComposeEnvironment(composeFilePath, composeFile)
    .withEnvironmentFile(envPath)
    .withEnvironment({
      LOCALSTACK_DOCKER_NAME: lsContainerName,
      // LAMBDA_DOCKER_FLAGS: LABEL_TESTCONTAINERS_SESSION_ID,
      // LAMBDA_RUNTIME_ENVIRONMENT_TIMEOUT: '90'
    })
    .withWaitStrategy(lsContainerName, Wait.forLogMessage("Ready."))
    .up();



  // // i might prefer to do this form a docker compose file actually
  // const localstack = await new LocalstackContainer("localstack/localstack-pro:latest")
  //   .withEnvironment({
  //     LOCALSTACK_AUTH_TOKEN: process.env.LOCALSTACK_AUTH_TOKEN,
  //     DEBUG: "1",
  //     LAMBDA_RUNTIME_ENVIRONMENT_TIMEOUT: "90"
  //     // DOCKER_HOST: "tcp://docker:2375"
  //   })
  //   .withNetworkAliases("localstack")
  //   // "/var/run/docker.sock:/var/run/docker.sock"
  //   .withBindMounts([{
  //     source: "/var/run/docker.sock",
  //     target: "/var/run/docker.sock"
  //   }])
  //   .start();

  // const endpoint = localstack.getConnectionUri();

  // // todo ai slop
  // // https://github.com/localstack/aws-cdk-local?tab=readme-ov-file#configurations
  // const env = {
  //   ...process.env,

  //   AWS_ACCESS_KEY_ID: 'test',
  //   AWS_SECRET_ACCESS_KEY: 'test',
  //   // CDK_DEFAULT_ACCOUNT: "000000000000",
  //   // AWS_DEFAULT_ACCOUNT: "000000000000",

  //   // CDK_DEFAULT_REGION: "us-east-1",
  //   AWS_DEFAULT_REGION: 'us-east-1',

  //   AWS_ENDPOINT_URL: endpoint,
  //   AWS_ENDPOINT_URL_S3: endpoint,

  //   // LOCALSTACK_AUTH_TOKEN: process.env.LOCALSTACK_AUTH_TOKEN

  //   // ENDPOINT_URL: endpoint
  //   // LOCALSTACK_HOST: endpoint.replace('http://', ''), // deprecated
  // };



  const rootDir = resolve(__dirname, '../../../')

  const outputSetup = execSync("pnpm iac:setup", {
    encoding: 'utf-8',
    cwd: rootDir,
    // env
  });

  console.log(outputSetup);

  const outputDeploy = execSync("pnpm iac:deploy:ci", {
    maxBuffer: 99999999999999999,
    encoding: 'utf-8',
    cwd: rootDir,
    // env
  });

  console.log(outputDeploy);

  const t = 'wait'

  // todo 
  // https://docs.localstack.cloud/aws/tutorials/gitlab-ci-testcontainers/

  // https://hub.docker.com/r/localstack/localstack-pro

  // https://node.testcontainers.org/modules/localstack/

  // https://docs.localstack.cloud/aws/getting-started/installation/#starting-localstack-with-docker-compose


  // https://github.com/localstack/localstack/blob/main/docker-compose.yml
});


// https://github.com/localstack/localstack/issues/12643