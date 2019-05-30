const { ioc } = require('@adonisjs/fold');

ioc.bind('GenericSerializer', () => {
  return require('../app/Serializers/GenericSerializer');
});
