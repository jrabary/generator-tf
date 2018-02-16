'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
        'Welcome to the sublime ' + chalk.red('generator-tf') + ' generator!'));

    const prompts = [
      {
        name: 'projectName',
        type: 'input',
        message: `Project name`,
        default: this.appname.replace(/\s+/g, '_')
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const projectName = this.props.projectName;

    this.fs.copyTpl(
        this.templatePath('_project/_data/inputs.py'),
        `${projectName}/data/inputs.py`, this.props);

    this.fs.copyTpl(
        this.templatePath('_project/_models/__init__.py'),
        `${projectName}/models/__init__.py`, this.props);

    this.fs.copyTpl(
        this.templatePath('_project/_models/my_model.py'),
        `${projectName}/models/my_model.py`, this.props);

    this.fs.copyTpl(
        this.templatePath('_project/estimator.py'),
        `${projectName}/estimator.py`, this.props);

    this.fs.copyTpl(
        this.templatePath('_project/parameters.py'),
        `${projectName}/parameters.py`, this.props);

    this.fs.copyTpl(
        this.templatePath('_experiments/run.py'), `experiments/run.py`,
        this.props);

    this.fs.copyTpl(
        this.templatePath('_configs/config.sample.json'),
        `configs/config.sample.json`, this.props);

    this.fs.copyTpl(
        this.templatePath('_README.md'), this.destinationPath('README.md'),
        this.props);

    this.fs.copyTpl(
        this.templatePath('gitignore'), this.destinationPath('.gitignore'),
        this.props);
  }

  install() {
    // this.installDependencies();
  }
};
