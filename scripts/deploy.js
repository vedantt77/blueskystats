import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const DIST_DIR = 'dist';
const HOSTINGER_PATH = 'public_html';
const HOSTINGER_HOST = 'yourusername@yourhostinger.com'; // Replace with your Hostinger SSH details

async function deploy() {
  try {
    // Ensure dist directory exists
    await fs.access(DIST_DIR);

    // Copy .htaccess to dist
    await fs.copyFile('.htaccess', path.join(DIST_DIR, '.htaccess'));

    // Deploy to Hostinger using rsync
    console.log('Deploying to Hostinger...');
    await execAsync(`rsync -avz --delete ${DIST_DIR}/ ${HOSTINGER_HOST}:${HOSTINGER_PATH}`);

    console.log('Deployment complete! Your site is live at https://blueskystats.fyi');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();