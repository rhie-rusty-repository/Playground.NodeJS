function initRoutes(app, config) {
    let infoLen = config.route_info.length;

    for (let i = 0; i < infoLen; i++) {
        var curItem = config.route_info[i];
        var curModule = require(curItem.file);

        if (curItem.type == 'get') {
            console.log('=====get=====');
            app.get(curItem.path, curModule[curItem.method]);

        } else if (curItem.type == 'post') {
            console.log('=====post=====');
            app.post(curItem.path, curModule[curItem.method]);

        }
    }

}

module.exports.initRoutes = initRoutes;