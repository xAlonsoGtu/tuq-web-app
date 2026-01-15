const authCtrl = {};
const UserRepository = require('../modules/user.module.js');

authCtrl.login = async (req, res) => {
	try{
        var sss = await UserRepository.getPerson("1");
        res.status(200).send({ success: true, payload: sss.payload });
    }
    catch(e){
        console.log(e);
        res.status(400).send({ success: false, error: e.message});
    }
}

module.exports = authCtrl;
