import itemModel from '../models/model.js';
const addItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const item = new itemModel ({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        type:req.body.type,
        image:image_filename
    })
    try {
        await item.save();
        res.json({success: true, message: "Item Added Successfully"});
    }
    catch (err) {
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}

const itemList = async(req, res) => {
    try {
        const items = await itemModel.find({});
        res.json({success: true, data: items})
    }
    catch (err) {
        console.log(err);
        res.json({success: false, message: "Error"});
    }
}
export { addItem, itemList };

