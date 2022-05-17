const {GraphQLError} = require('graphql');


class CustomGraphQLError extends GraphQLError {
    constructor(code, message){
        super(message);

        this.code = code;
    }

    static customFormatError(error){
        const errorOriginalError = error.originalError || error;
        
        const errorFormat = {
            message: errorOriginalError.message,
            code: errorOriginalError.code,
            locations: error.locations,
            path: error.path
        }

        return errorFormat;
    }
}

module.exports = CustomGraphQLError;