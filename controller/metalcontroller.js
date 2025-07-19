
const metalmodel = require('../model/metalmodel')

const addmetal = async (req, res) => {
    try {
        const metaldata = req.body;

        if (!metaldata) {
            return res.status(400).json({ status: false, data: { message: " metal data is null" } });
        }

        const dbmetal = metalmodel({
            metalname: metaldata.metalname
        });
        dbmetal.save();
        return res.status(200).json({ status: true, data: { message: "metal add successfully", data: dbmetal } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } });
    }
}
const readmetaldata = async (req, res) => {
    try {
        const metaldata= await metalmodel.find();
        return res.status(200).json({ status: true, data: { message: "product read successfully", data: metaldata } });
        
    } catch (error) {
          return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }
}
const updatemetal = async (req, res) => {
    try {
        const id = req.params.id;
        const metal = req.body;

        if (!metal) {
            return res.status(400).json({ status: false, data: { message: " Metal Data is null" } });
        }
        const updb = await metalmodel.updateOne({ _id: id }, {
            metalname: metal.metalname
        })
        return res.status(200).json({ status: true, data: { message: " metal updated successfully" } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' , data: error }});
    }

}
const deletemetal = async (req, res) => {
    try {
        const id = req.params.id;

        await metalmodel.deleteOne({ _id: id });
        return res.status(200).json({ status: true, data: { message: 'metal deleted  successfully' } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } });
    }
}
const getmetalwithproductcount = async (req, res) => {
    try {
        const data = await metalmodel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: '_id',
                    foreignField: 'metal',
                    as: 'metalInfo'

                }
            },
            {
                $addFields: {
                    totalProducts: { $size: { $ifNull: ["$metalInfo", []] } }
                }
            },
            {
                $project: {
                    metalId: "$_id",
                    metalname: '$metalname',
                    totalProducts: 1,
                }
            }
        ])

        return res.status(200).json({ status: true, data: { message: "Fetched", data: data } });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ status: false, data: { message: 'Internal Server Error', data: error } });
    }
}
module.exports = { addmetal,readmetaldata,deletemetal, getmetalwithproductcount,updatemetal };