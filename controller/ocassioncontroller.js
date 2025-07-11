const ocassionmodel = require('../model/ocassionmodel');
const ocasssionmodel = require('../model/ocassionmodel')

const addocasssion = async (req, res) => {
    try {
        const ocasssiondata = req.body;
        console.log(ocasssiondata);
        if (!ocasssiondata) {
            return res.status(400).json({ status: false, data: { message: " ocasssion Data is null" } });
        }

        const dbocasssion = ocasssionmodel({
            ocassionname: ocasssiondata.ocassionname
        })
        dbocasssion.save();
        return res.status(200).json({ status: true, data: { message: "Ocassion add successfully", data: dbocasssion } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } });
    }
}

const readocassiondata = async (req, res) => {
    try {
        const ocasssiondata = await ocasssionmodel.find();
        return res.status(200).json({ status: true, data: { message: "product read successfully", data: ocasssiondata } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }
}
const updateocassion = async (req, res) => {
    try {
        const id = req.params.id;
        const occa = req.body;

        if (!occa) {
            return res.status(400).json({ status: false, data: { message: " Ocassion Data is null" } });
        }
        const updb = await ocassionmodel.updateOne({ _id: id }, {
            ocassionname: occa.ocassionname
        })
        return res.status(200).json({ status: true, data: { message: " ocassion updated successfully" } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }

}
const deleteocassion = async (req, res) => {
    try {
        const id = req.params.id;

        await ocassionmodel.deleteOne({ _id: id });
        return res.status(200).json({ status: true, data: { message: 'ocassion deleted  successfully' } });

    } catch (error) {

        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } });
    }
}
const getocassionwithproductcount = async (req, res) => {
    try {
        const data = await ocassionmodel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: '_id',
                    foreignField: 'ocassion',
                    as: 'ocassionInfo'

                }
            },
            {
                $addFields: {
                    totalProducts: { $size: { $ifNull: ["$ocassionInfo", []] } }
                }
            },
            {
                $project: {
                    ocassionId: "$_id",
                    ocassionname: '$ocassionname',
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

module.exports = { addocasssion,readocassiondata,deleteocassion,getocassionwithproductcount,updateocassion };