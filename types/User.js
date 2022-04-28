const TypesHelper = require('../helper/TypesHelper');

module.exports = class User{
    constructor(service, metadata, response){
        if (typeof service === undefined){
            throw Error('Please, pass in a valid argument')
        }
        this.service = service;
        this.metadata = metadata;
        this.response = response;

        return this;
    }

    init(user){
        this.id = user._id;
        this.email = user.email;
        this.isAdmin = user.isAdmin;
        this.deleted = user.deleted;
        this.token = user.token;
        this.password = user.password;

        return this;
    }

    async create(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'create', user, metadata);

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
    async login(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'login', user, metadata);

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
    async getAll(){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'getAll', {}, metadata);

        const users = [];
        if(Array.isArray(result.users) && result.users.length > 0){
            const userList = result.users;
            for(let i=0; i<userList.length; i++){
                const user = new User(UserGRPCService).init(userList[i]);
                users.push(user);
            }
        }
        return users;
    }
    async getOne(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'getOne', user, metadata);

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
    async deleteOne(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'deleteOne', user, metadata);

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
}