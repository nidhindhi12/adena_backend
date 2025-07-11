const productmodel = require('../model/Productmodel');
const cloudinary = require('../utils/cloudinary.config');
const categorymodel = require('../model/categorymodel');
const gendermodel = require('../model/gendermodel');
const metalmodel = require('../model/metalmodel');
const ocassionmodel = require('../model/ocassionmodel');
const mongoose = require('mongoose');


const addproduct = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ status: false, data: { message: "Data is null" } });
        }
        const procat = await categorymodel.findById(data.category);
        if (!procat) {
            return res.status(400).json({ status: false, data: { message: "Category not found" } });
        }

        const progender = await gendermodel.findById(data.gender);
        if (!progender) {
            return res.status(400).json({ status: false, data: { message: "Gender not found" } });
        }

        const prometal = await metalmodel.findById(data.metal)
        if (!prometal) {
            return res.status(400).json({ status: false, data: { message: "Metalnot found" } });
        }
        const proocassion = await ocassionmodel.findById(data.ocassion);
        if (!proocassion) {
            return res.status(400).json({ status: false, data: { message: 'ocassion not found' } });
        }


        const uploadimages = req.files.map((file) => ({
            url: file.path,           // This is the Cloudinary URL if using CloudinaryStorage
            public_id: file.filename  // This is the Cloudinary public_id if using CloudinaryStorage
        }));

        const newProduct = new productmodel({
            productid: data.productid,
            title: data.title,
            price: data.price,
            description: data.description,
            gender: progender._id,
            metal: prometal._id,
            ocassion: proocassion._id,   // make sure this spelling matches your schema!
            discount: data.discount,
            size: data.size,
            karatage: data.karatage,
            category: procat._id,
            image: uploadimages
        });

        await newProduct.save();

        return res.status(200).json({
            status: true,
            data: { message: "Product added successfully", product: newProduct }
        });

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({
            status: false,
            data: { message: 'Internal server error', error: error.message }
        });
    }
};
const readproducts = async (req, res) => {
    try {
        const data = await productmodel.aggregate([

            {
                $lookup: {
                    from: 'categories',
                    localField: "category",
                    foreignField: "_id",
                    as: 'categoryInfo'

                }
            },
            { $unwind: '$categoryInfo' },
            {
                $lookup: {
                    from: 'genders',
                    localField: "gender",
                    foreignField: "_id",
                    as: "genderInfo"
                }
            },
            { $unwind: '$genderInfo' },
            {
                $lookup: {
                    from: 'metals',
                    localField: "metal",
                    foreignField: "_id",
                    as: "metalInfo"
                }
            },
            { $unwind: '$metalInfo' },
            {
                $lookup: {
                    from: "ocassions",
                    localField: "ocassion",
                    foreignField: "_id",
                    as: "ocassionInfo"
                }
            },
            { $unwind: '$ocassionInfo' },
            {
                $project:{
                    title:1,
                    price:1,
                    description:1,
                    discount:1,
                    karatage:1,
                    size:1,
                    image:1,
                    category:'$categoryInfo.categoryname',
                    gender:'$genderInfo.gendername',
                    metal:'$metalInfo.metalname',
                    ocassion:"$ocassionInfo.ocassionname"
                }
            }
        ])
        return res.status(200).json({ status: true, data: { message: "Fetched", data: data } });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ status: false, data: { message: 'Internal Server Error', data: error } });
    }
}

module.exports = { addproduct, readproducts };
