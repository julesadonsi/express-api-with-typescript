import shortid from "shortid";
import debug from "debug";


import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');


class UserDao{

    Schema = mongooseService.getMongoose().Schema;
    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: {type: String, select:false},
        firstName:String,
        lastName: String,
        permissionFlags: Number,
    }, {id:false});


    User = mongooseService.getMongoose().model("Users", this.userSchema)

    constructor() {
        log('Created new instance of UsersDao');
    }

    /**
     * Create an user in database and return this id field
     * 
     * @param userFields 
     * @returns  string user id
     */
    async addUser(userFields: CreateUserDto) {
        const userId = shortid.generate();
        const user = new this.User({
            _id:userId,
            ...userFields,
            permissionFlags:1
        })
        await user.save();
        return userId;
    }
    
    /**
     * Get an user in database and return it
     * 
     * @param email 
     * @returns user instance
     */
    async getUserByEmail (email: string) {
        return this.User.findOne({email: email}).exec();
    }


    /**
     * Get an user by using this id field
     * 
     * @param userId 
     * @returns user instance
     */
    async getUserById(userId: string) {
        return this.User.findOne({_id:userId}).exec();
    }


    /**
     * 
     * Get user list with page limite
     * @param limit 
     * @param page 
     * @returns list of users
     */
    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    /**
     * Update an user by using this id
     * 
     * @param userId 
     * @param userFields 
     * @returns 
     */
    async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto){
        const existingUser = await this.User.findByIdAndUpdate(
            {_id:userId}, {$set:userFields}, {new:true}
        ).exec();

        return existingUser;
    }


    /**
     * Remove user by using this id field
     * 
     * @param userId 
     * @returns 
     */
    async removeUserById(userId: string) {
        return this.User.deleteOne({_id:userId}).exec();
    }

    /**
     * Get user by using this email field
     * 
     * @param email 
     * @returns 
     */
    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({email: email})
            .select('_id email permissionFlags +password')
            .exec();
    }

}


export default new UserDao();