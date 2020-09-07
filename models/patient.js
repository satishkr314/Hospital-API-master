//Schema for patient detail
const mongoose=require('mongoose');      
const patientSchema=new mongoose.Schema({
    name:{                                      
        type:String,
        required:true
    },
    phone:{                                   
        type:Number,
        required:true,
        unique:true
    },
    reports:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'report',
    }]
},
{
    timestamps:true                             
});
const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;