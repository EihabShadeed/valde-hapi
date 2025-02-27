
"use strict";


var path = require("path"),
    appConfig = require("valde-hapi").app_config.getConfig(),
    Joi = require("joi");





function get_customer_account(request, reply) {
    return reply({
        success: true,
        message: "This method is just a dummy for demo purposes",
        "sl-decorator": "",
        redirect: appConfig.get("app_root") + "/home"
    }).type("application/json");
}


/**
 *
 * @param server
 * @param options
 * @param next
 */
module.exports.register = function (server, options, next) {

    /**
     *
     */
    server.route({
        method: "GET",
        path: "/rest/v1/customer/get_customer_account",
        config: {
            handler: get_customer_account,
            tags: ["api"],
            description: "get_customer_account",
            notes: "An API method to retrieve the customer account profile",
            auth: "session",
            plugins: {
                "hapi-auth-cookie": {
                    redirectTo: false
                },
                "csrf_agent": {
                    enabled: true
                },
                "resource_set": {
                    enabled: true
                }
            },
            validate: {
                headers: Joi.object({
                    "sa-decorator": Joi.string().required(),
                    "accept-language": Joi.string().required(),
                    "user-agent": Joi.string().required()
                }).options({
                    allowUnknown: true
                })
            }
        }
    });



    next();
};

module.exports.register.attributes = {
    pkg: require("./package.json")
};