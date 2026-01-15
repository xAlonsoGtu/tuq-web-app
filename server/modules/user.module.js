// class UserModule {
//   /**
//    * @description Create an instance of PostService
//    */
//   constructor () {
//     // Create instance of Data Access layer using our desired model
//     //this.MongooseServiceInstance = new MongooseService( PostModel );
//   }

const User = require("../models/user/user.model");
const pool = require("../providers/postgres-db");

//   /**
//    * @description Attempt to create a post with the provided object
//    * @param postToCreate {object} Object containing all required fields to
//    * create post
//    * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
//    */
//   async create ( postToCreate ) {
//     try {
//       //const result = await this.MongooseServiceInstance.create( postToCreate );
//       return { success: true, body: "" };
//     } catch ( err ) {
//       return { success: false, error: err };
//     }
//   }
// }

// module.exports = UserModule;

const UserRepository = {}

UserRepository.create = (newUser) => {
    var sss = new User();
    sss.name = "qqq";
    console.log(sss.name);
    return sss;
};

UserRepository.getPerson = async(personId) => {
    try{
        const text = `SELECT * FROM users WHERE id = $1`;
        const values = [personId];
        var res = await pool.query(text, values);

        if(res.rowCount === 0) throw new Error('No data');
        //console.log(res);
        return { success: true, payload: res.rows[0] };
    }catch(e){
        console.log(e);
        return { success: false, payload: e };
    }

}
module.exports = UserRepository;