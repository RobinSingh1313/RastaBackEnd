const router=require('express').Router();
const UserController=require("../controller/user.controller");
router.post('/registration',UserController.register);
router.put('/updatePassword/:username/:password',UserController.UpdatePassword)
module.exports=router;