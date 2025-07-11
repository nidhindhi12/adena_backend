const gendermodel = require('../model/gendermodel')

const addgender = async (req, res) => {
    try {
        const genderdata = req.body;
       
        if (!genderdata) {
            return res.status(400).json({ status: false, data: { message: " Gender Data is null" } });
        }

        const dbgender = gendermodel({
            gendername: genderdata.gendername
        })
        dbgender.save();
        return res.status(200).json({ status: true, data: { message: "Product catgory add successfully", data: dbgender } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } });
    }
}

const readgenderdata = async (req, res) => {
    try {
        const genderdata = await gendermodel.find();
      
        return res.status(200).json({ status: true, data: { message: "product read successfully", data: genderdata } });
    }
    catch (error) {
         return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }

}

module.exports = { addgender,readgenderdata };