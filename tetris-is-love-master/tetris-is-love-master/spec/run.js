import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile(process.env.JASMINE_CONFIG_PATH);
jasmine.execute();
