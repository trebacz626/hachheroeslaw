let jwt=require("jsonwebtoken");
import config from '../../configuration/main'
class JWTPromise{
  constructor(){

  }
  async sign(data){
    return await new Promise((resolve,reject)=>{
      jwt.sign(data, config.passport.jwt.secret,{ expiresIn: 60 * 30 }, function(err, token) {
        if(err)reject(err);
        else resolve(token);
      });
    }).catch(err=>{throw err});
  }
  async verify(token){
    return await new Promise((resolve,reject)=>{
      jwt.verify(token,config.passport.jwt.secret,function(err,decoded){
        if(err){
          reject("invalid access token");
        }else{
          resolve(decoded);
        }
      });
    }).catch(err=>{throw err});
  }
}
var jwtObj = new JWTPromise();
export default jwtObj;
