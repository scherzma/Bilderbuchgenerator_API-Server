// eslint-disable-next-line import/no-relative-packages
const kDeployApiEndpoint = '';

const DeployInstance = {
  DEPLOY_INSTANCE_Webui: 'web-ui',
  DEPLOY_INSTANCE_Apiserver: 'api-server',
};

async function callDeployApi(deployInstance) {
  const response = await fetch(`${kDeployApiEndpoint}?instance=${deployInstance}`);
  console.log('---BEGIN-DEPLOY-RESPONSE---');
  if (response.status !== 200) {
    throw new Error(`deploy failed, responseCode: ${response.status}`);
  }
  console.log(response);
  console.log('---END-DEPLOY-RESPONSE---');
}

console.log('--- deploy call begin ---');
callDeployApi(DeployInstance.DEPLOY_INSTANCE_Apiserver);
console.log('--- deploy call end ---');
