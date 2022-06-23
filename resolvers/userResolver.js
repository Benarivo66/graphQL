const User = require('../types/User');
const grpc = require('@grpc/grpc-js');

module.exports = class userResolver {
    static async resolver(args, context){
        const { userServiceRoutes, req, res } = context;
        const metadata = new grpc.Metadata();
    
        if(req.headers.cookie){
            metadata.add('jwt', req.headers.cookie.split('=')[1]);
        }

        console.log('resolver', metadata);

        // if(req.headers.isAdmin){
        //     metadata.add('isAdmin', req.headers.isAdmin);
        // }

        const userType = new User(userServiceRoutes, metadata, res);
        
        return userType;
    }
}

