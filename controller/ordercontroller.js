const ordermodel = require('../model/ordermodel');

const addorder = async (req, res) => {
    try {
        const userid = req.params.id;
         const { products, paymentmode } = req.body;
         console.log(products);
        if (!userid) return res.status(400).json({ status: false, data: { message: 'User Id is null' } });
        if (!products) return res.status(400).json({ status: false, data: { message: 'proudct data is null' } });
        const neworder = new ordermodel({
            user: userid,
            products: products.map(p => ({
                product: p.productId,
                quantity: p.qty,
                price: p.price
            })),
            paymentmode:paymentmode
        })
        await neworder.save();
        return res.status(200).json({
            status: true,
            data: { message: "Order added successfully", product: neworder }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            data: { message: 'Internal server error', error: error.message }
        });
    }
}

module.exports = { addorder }

