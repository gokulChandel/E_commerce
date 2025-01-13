import bcrypt from 'bcrypt'

 export const hashPassword = async(password)=>{
    try{
       const saltRound = 10;
       const hashedPass = await bcrypt.hash(password, saltRound);
        return hashedPass;
    }
    catch(err){
        console.log(err);
        
    }
 } 

 export const camparePassword = async (password, hashedPass)=>{
   return bcrypt.compare(password, hashedPass)
 }


 