const db = require('../models');


exports.getAllCatagories = async (req, res) => {
    try {
        const query = {
            include: [{
                model: db.sub_categories
            }]
        }
        db.categories.findAll(query).then(_data => {
            return res.status(200).json({
                data: _data
            })
        })
    } catch (error) {
        return res.status(400).json({ msg: error.toString() })
    }
}