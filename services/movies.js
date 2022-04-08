const Item = require('../models/Item');


async function getAll() {
    return Item.find({});
}

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}

function getById(id) {
    return Item.findById(id);
}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.title = item.title;
    existing.description = item.description;
    existing.image = item.image;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
};