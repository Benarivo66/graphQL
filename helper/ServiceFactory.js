const grpc = require('@grpc/grpc-js');
const loadSpec = require('service-specs');

module.exports = class ServiceFactory {
    static getService(specificationName, serviceName, serviceAddress){
        const apiSpec = loadSpec.load(grpc, specificationName);
        const service = apiSpec[serviceName];

        return new service(serviceAddress, grpc.credentials.createInsecure());
    }
}