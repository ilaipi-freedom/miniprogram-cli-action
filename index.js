const core = require('@actions/core');
const ci = require('miniprogram-ci');

(async () => {
  try {
    const appid = core.getInput('appid');
    const privateKey = core.getInput('private_key');
    const projectPath = core.getInput('project_path');
    const version = core.getInput('version');
    const desc = core.getInput('desc');

    const project = new ci.Project({
      appid: appid,
      type: 'miniProgram',
      projectPath: projectPath,
      privateKey: privateKey,
      ignores: ['node_modules/**/*'],
    });

    const uploadResult = await ci.upload({
      project,
      version,
      desc,
      setting: {
        es6: true,
      },
      onProgressUpdate: console.log,
    });

    core.setOutput('result', uploadResult);
    console.log('Upload successful:', uploadResult);
  } catch (error) {
    core.setFailed(`Upload failed: ${error.message}`);
  }
})();