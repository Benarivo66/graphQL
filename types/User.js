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
        this.name = user.name;
        this.age = user.age;
        this.isAdmin = user.isAdmin;
        this.deleted = user.deleted;
        this.token = user.token;
        this.password = user.password;
        this.numOfVotes = user.numOfVotes;
        this.contestantNumber = user.contestantNumber;
        this.description = user.description;
        this.isContestant = user.isContestant;
        

        return this;
    }

    async create(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'create', user, metadata);

        this.response.cookie('jwt', result.token);
        

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
    async login(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'login', user, metadata);

        this.response.cookie('jwt', result.token);
        
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
    async update(user){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'update', user, metadata);

        const graphqlResponse = new User(UserGRPCService).init(result);

        return graphqlResponse;
    }
    async getContestants(){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'getContestants', {}, metadata);

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
    async getTopRankings(){
        const UserGRPCService = this.service;
        const metadata = this.metadata;
        
        const result = await TypesHelper.callGRPC(UserGRPCService, 'getTopRankings', {}, metadata);

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
    async logout(){
        const UserGRPCService = this.service;
        const metadata = this.metadata;

        const result = await TypesHelper.callGRPC(UserGRPCService, 'logout', {}, metadata);
        
        this.response.clearCookie('jwt');
        //this.response.clearCookie("false");

        return result;  
    }
}