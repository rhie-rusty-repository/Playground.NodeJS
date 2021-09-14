const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

function init(app, config){
    mongoose.connect(`${config.db_url}/${config.db_name}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const modellist = loadSchema(mongoose);

    app.set('db_model_list', modellist)
}

function loadSchema(mongoose){
    const schemadir = path.join(__dirname, "schema");
    const modellist = {};
    const filelist = fs.readdirSync(schemadir);
    filelist.forEach(file => {
        const filename = path.basename(filelist[0], path.extname(filelist[0]));
        const schema_info = require(`./schema/${filename}`);
        const schema = mongoose.Schema(schema_info.schema);
        if(schema_info.method) schema_info.method.forEach(m=>schema.method(m.name, m))
        if(schema_info.static) schema_info.static.forEach(s=>schema.static(s.name, s))
        modellist[schema_info.name] = mongoose.model(schema_info.name, schema)
    })
    
    return modellist;
}

module.exports.init = init
