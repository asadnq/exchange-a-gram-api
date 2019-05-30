const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla');

class GenericSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject();
    this._attachRelations(modelInstance, json);
    this._attachMeta(modelInstance, json)
    delete json.pivot;
    return json;
  }
}

module.exports = GenericSerializer;
