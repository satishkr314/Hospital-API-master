const Report = require('../../../models/report');
const Status = require('../../../config/status');

//getting patient detail by status
module.exports.fetchReports = async function(req, res){
    let status = Status[req.params.status];

    if(status==undefined){
        return res.status(404).json({
            message:'Report not created .Please wait for report'
        });
    }

    try{
        let reportstatus = await Report.find({status: status}).sort("createdAt").populate('patient doctor');

            return res.status(200).json({
                data: {reportstatus},
                message: 'requried Details'
            });
        }
    catch(err){
        return res.status(500).json({
            message: 'Error in showing Details by status'
        });
    }
}