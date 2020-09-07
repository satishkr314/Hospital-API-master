const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
let Doctor = require('../../../models/doctor');
const Status = require('../../../config/status');

//Registering patient
module.exports.register = async function(req, res){

    if(req.body.phone==undefined || req.body.name==undefined){
        return res.status(206).json({
            message: 'Fill all data'
        });
    }

    let patientExists = await Patient.findOne({phone: req.body.phone});
    if(patientExists){
        return res.status(405).json({
            data:{
                patient:patientExists
            },
            message: 'Patient Exists'
        })
    }

    try{
        //Adding Patient
        let createdPatient = await Patient.create(req.body);
        if(createdPatient){
            return res.status(200).json({
                data: {
                    patient:createdPatient,
                    
                },
                message: 'Patient Successfully Added'
            });
        }
        else{
            return res.status(500).json({
                message: 'Error in addin patient'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Cannot add patient'
        });
    }
}

//Creating report of patient
module.exports.createReport = async function(req, res){

    let patientId = req.params.id;
    let docId = req.body.doctor;

    if(patientId==undefined || docId==undefined){
        return res.status(206).json({
            message: 'Fill complete data'
        });
    }

    //updating status
    let st = req.body.status;
    req.body.status = Status[st];
    try{
        let patient = await Patient.findById(req.params.id);
        let doctor = await Doctor.findById(req.body.doctor);

        if(patient && doctor){
            req.body.patient = patientId;
            let report = await Report.create(req.body);
            if(report){
                //pushing the new report in the patients report array
                await patient.reports.push(report);
                await patient.save();
            }
           
            return res.status(200).json({
                data:{
                    report:{
                        patient: patient.name,
                        status: report.status,
                        doctor: doctor.name,
                        date: report.createdAt
                    }
                },
                message: 'Report Updated'
            })
        }
        else{
            return res.status(401).json({
                message: 'Invalid detail'
            });
        }
    }
    catch(err){
        console,log(err);
        return res.status(500).json({
            message: 'Error in updating'
        });
    }
}
// showing all detail
module.exports.allReports = async function(req, res){
    
    try{
        let report=await Report.find({ patient:req.params.id }).sort("createdAt").populate('doctor').populate('patient');
        
        return res.status(200).json({
            data:{
                    report
            },
            message:'Complete patient Detail',
          //details:report
        })
      }
      catch(err){
          return res.status(500).json({
          message:'Error in showing all detail'
        })
      }
    };