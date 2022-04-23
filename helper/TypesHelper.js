

module.exports = class TypesHelper {
    static callGRPC(Service, functionName, args, metadata = {}){
        return new Promise((resolve, reject) => {
            Service[functionName](args, metadata, (grpcError, response) => {
                if(grpcError){
                    reject(grpcError)
                }
                resolve(response);
            });
        })
    }
}