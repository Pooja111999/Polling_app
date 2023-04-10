const User = require('../model/user')


module.exports.home = (req,res)=>{
    console.log(req.cookies);
    res.render('home')
};

module.exports.sign_in = (req,res)=>{
    res.render('user_sign_in')
};

module.exports.sign_up = (req,res)=>{
    res.render('user_sign_up')
};


// findone use for finding data from the database

//for sing up
module.exports.create = async(req,res)=>{
   if(req.body.password!=req.body.confirm_password){
    return res.redirect('back')
   }else{
    try{
        const data = await User.findOne({email:req.body.email});

            if (!data) {
                await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password 
                })
                return res.redirect('/sign-in')
            }
            if(data){
                console.log(data)
            }      
    } catch (err){
        console.log(err)
    }
}
   
} 
module.exports.createSession = async (req, res)=>{
       // steps to authenticate
         //firnd the user
         let user = await User.findOne({email: req.body.email});
         if(user){
             //handle password does'nt match
             if(user.password != req.body.password){
                 return res.redirect('back');
             }
             res.cookie('user_id', user.id);
            
           return res.redirect('/');
    
         }else{
            return res.redirect('/')
        }
     }


     //voter list
   
     var Voterlist = [
        {
            name: "pooja",
            Id: "2323232323"
        },
        {
            name: "Akshay",
        Id : "4545454545"
        }
    ]

    module.exports.getdata=(req,res)=>{
       // console.log(Voterlist);
        return  res.render('home',{
            Voter_list : Voterlist
     
     })
    }


module.exports.createvote = async (req,res)=>{

    Voterlist.push(req.body);
    console.log(req.body)
    res.redirect('/')

}

