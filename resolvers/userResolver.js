const User = require('../types/User');
const grpc = require('@grpc/grpc-js');

module.exports = class userResolver {
    static async resolver(args, context){
        const { userServiceRoutes, req, res } = context;

        const metadata = new grpc.Metadata();
        
        const userType = new User(userServiceRoutes, metadata, res);
        
        return userType;
    }
}

