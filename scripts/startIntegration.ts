import { execSync } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';
import { createServer } from 'vite';

const LOCAL_SERVER_URL = 'http://localhost:3000';
const LOCAL_UI_URL = 'http://localhost:5173';

type DopplerEnv = 'development' | 'staging' | 'local';

const getDopplerEnv = (env: DopplerEnv) => {
  const GET_DOPPLER_ENV_PATH = path.join(
    process.cwd(),
    'scripts/getDopplerEnv.js',
  );
  const result = execSync(
    `doppler run --project onboarding-sdk --config ${env} -- ts-node ${GET_DOPPLER_ENV_PATH}`,
    {
      encoding: 'utf-8',
    },
  );
  return JSON.parse(result) as {
    APPLICANT_BASE_URL: string;
    APPLICANT_WEBAPP_ORIGIN: string;
  };
};

const startIntegration = async () => {
  const { INTEGRATION_MODE }: { INTEGRATION_MODE: 'cloud' | 'local' } =
    await inquirer.prompt({
      name: 'INTEGRATION_MODE',
      type: 'rawlist',
      message: 'Select the integration mode:',
      choices: [
        {
          name: 'Cloud - Connected with internet test environments',
          value: 'cloud',
        },
        {
          name: `Local - Connected with local server and ui`,
          value: 'local',
        },
      ],
    });

  switch (INTEGRATION_MODE) {
    case 'cloud':
      {
        const { ENVIRONMENT }: { ENVIRONMENT: DopplerEnv } =
          await inquirer.prompt({
            name: 'ENVIRONMENT',
            type: 'rawlist',
            message: 'Select an environment:',
            choices: [
              { name: 'Develop', value: 'development' },
              { name: 'Staging', value: 'staging' },
              { name: 'Local', value: 'local' },
            ],
          });

        const DOPPLER_ENV = getDopplerEnv(ENVIRONMENT);
        process.env.VITE_API_URL = DOPPLER_ENV.APPLICANT_BASE_URL;
        process.env.VITE_ORIGIN = DOPPLER_ENV.APPLICANT_WEBAPP_ORIGIN;
      }
      break;
    case 'local':
      {
        const { ENVIRONMENT }: { ENVIRONMENT: DopplerEnv } =
          await inquirer.prompt({
            name: 'ENVIRONMENT',
            type: 'rawlist',
            message: 'Select the lambda domain:',
            choices: [
              { name: 'Remote develop', value: 'development' },
              { name: 'http://localhost:3000', value: 'local' },
            ],
          });

        const DOPPLER_ENV = getDopplerEnv(ENVIRONMENT);
        const VITE_API_URL =
          ENVIRONMENT === 'local'
            ? LOCAL_SERVER_URL
            : DOPPLER_ENV.APPLICANT_BASE_URL;
        process.env.VITE_API_URL = VITE_API_URL;
        process.env.VITE_ORIGIN = LOCAL_UI_URL;
      }
      break;
    default:
      break;
  }

  const server = await createServer({
    configFile: 'vite.config.ts',
  });
  await server.listen();
  server.printUrls();
};

startIntegration();
