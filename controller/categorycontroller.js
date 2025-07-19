const categorymodel = require('../model/categorymodel')


const addcategory = async (req, res) => {
    try {
        const catedata = req.body;

        if (!catedata) {
            return res.status(400).json({ status: false, data: { message: " Category Data is null" } });
        }
        const dbcat = categorymodel({
            categoryname: catedata.categoryname
        })
        await dbcat.save();
        return res.status(200).json({ status: true, data: { message: "Product catgory add successfully", data: dbcat } });

    } catch (error) {

        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } });
    }
}

const readcategory = async (req, res) => {
    try {
        const categorydata = await categorymodel.find();

        return res.status(200).json({ status: true, data: { message: "category read successfully", data: categorydata } });
    } catch (error) {
         return res.status(500).json({ status: false, data: { message: 'Internal server error.' , data: error }});
    }

}
const updatecategory = async (req, res) => {
    try {
        const id = req.params.id;
        const cat = req.body;

        if (!cat) {
            return res.status(400).json({ status: false, data: { message: " Category Data is null" } });
        }
        const updb = await categorymodel.updateOne({ _id: id }, {
            categoryname: cat.categoryname
        })
        return res.status(200).json({ status: true, data: { message: " category updated successfully" } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' , data: error }});
    }

}
const deletecategory = async (req, res) => {
    try {
        const id = req.params.id;

        await categorymodel.deleteOne({ _id: id });
        return res.status(200).json({ status: true, data: { message: 'Product deleted  successfully' } });

    } catch (error) {

        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } });
    }
}
const getcategorywithproductcount = async (req, res) => {
    try {
        const data = await categorymodel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: '_id',
                    foreignField: 'category',
                    as: 'categoryInfo'

                }
            },
            {
                $addFields: {
                    totalProducts: { $size: { $ifNull: ["$categoryInfo", []] } }
                }
            },
            {
                $project: {
                    categoryId: "$_id",
                    categoryname: '$categoryname',
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

module.exports = { addcategory, readcategory, getcategorywithproductcount, updatecategory, deletecategory }