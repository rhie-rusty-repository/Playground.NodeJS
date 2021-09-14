const mongoose = require('mongoose');

function connectAndLoad(app, config) {
    mongoose.connect(`${config.db_uri}/${config.db_name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const SchemaModelItems = loadSchemaAndModel(config);

    app.set('database', {
        connection : mongoose.connection,
        schema_model_items : SchemaModelItems
    });
}

function loadSchemaAndModel(config){
    const schemaLen = config.db_schemas.length;
    const SchemaModelItems = {}

    for(let i = 0; i < schemaLen; i++){
        let curItem = config.db_schemas[i];
        let curSchema = require(`./${curItem.file}`).createSchema(mongoose);
        let curModel = mongoose.model(curItem.collectionName, curSchema)
        SchemaModelItems[curItem.schemaName] = curSchema;
        SchemaModelItems[curItem.modelName] = curModel;
    }

    return SchemaModelItems;
}

module.exports.connectAndLoad = connectAndLoad;