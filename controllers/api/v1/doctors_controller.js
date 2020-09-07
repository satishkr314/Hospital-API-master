const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

//Register Controller
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.email==undefined || req.body.name==undefined || req.body.password==undefined)
    {
        return res.status(206).json({
            message: 'Fill complete Detail'
        });
    }
    
    
    //verifying Docters Existance 
    let Email = req.body.email;
    let doctorExists = await Doctor.findOne({email: req.body.email});
    if(doctorExists){
        doctorExists = await doctorExists.toObject();
        
        delete doctorExists.password;
        return res.status(405).json({
            data:{
                doctor: doctorExists
                
            },
            message: 'Doctor Exists'
        });
    }
            
    try{
        let createdDoctor = await (await Doctor.create(req.body)).toObject();
        
        if(createdDoctor){
            delete createdDoctor.password;
            return res.status(200).json({
                data: {
                    doctor:createdDoctor
                },
                message: 'doctor Successfully registered'
            });
        }
        else{
            return res.status(500).json({
                message: 'Error in registering doctor'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}

//Login Controller
module.exports.login = async function(req, res){
    
    if(req.body.email==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
            });
        }

    try{
        let doctor = await Doctor.findOne({email:req.body.email});
        if(doctor){
            let pass = req.body.password;
            let pwdDb = doctor.password;
            if(pass==pwdDb){
                return res.status(200).json({
                    data:{
                        token: jwt.sign(doctor.toJSON(), 'hospitalapi', {expiresIn: 1000000})
                    }
                })
            }
        }
        return res.status(401).json({
            message:'Invalid Email/Password'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}