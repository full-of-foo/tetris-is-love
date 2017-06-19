import developmentConfig from './development';
import productionConfig from './production';
import testConfig from './test';
import {version} from '../package.json';

const env = process.env.NODE_ENV || 'development';
let config = developmentConfig;
if (env === 'test')
    config = testConfig;
else if (env === 'production')
    config = productionConfig;

export default Object.assign(config, {
    version: version || process.env.npm_package_version,
    env: env
});
