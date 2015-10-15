'use strict';
module.exports = function(res, data, msg, code){
    code = code || 200;
    var header = {
            'message': msg,
            'status': code
    };
    res.setHeader("api-meta", JSON.stringify(header));
    res.header('Access-Control-Expose-Headers', ['api-meta', 'X-Session-Token']);
    return res.json(data);
};
