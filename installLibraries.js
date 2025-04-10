const { exec } = require('child_process');

exec(
  'apt-get update && apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libglib2.0-0 libnss3 libgbm1 libpango-1.0-0 libxrandr2 libcups2 libatk1.0-0 libpangocairo-1.0-0 libatk-bridge2.0-0 libgtk-3-0 libdrm2',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing libraries: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);