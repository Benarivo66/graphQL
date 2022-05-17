const GrpcHelper = require('service-specs').GrpcHelper;
const CustomGraphQLError = require('../Errors/CustomGraphError');

module.exports = class TypesHelper {
    static callGRPC(Service, functionName, args, metadata = {}){
        return new Promise((resolve, reject) => {
            Service[functionName](args, metadata, (grpcError, response) => {
                if(grpcError){
                    const graphQLError = GrpcHelper.convertGRPCError(
                        CustomGraphQLError,
                        grpcError
                    );
                    
                    reject(graphQLError);
                    return;
                }
                resolve(response);
            });
        })
    }
}