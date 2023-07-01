const DummyData = require("./dummy_data")
const Category = require("../../model/category_model")


async function seedCategories() {
    try {

        const createdCategories = await Category.create(DummyData.categories);

        console.log('Categories seeded successfully:');
        console.log(createdCategories);
        seedCategories().then(r => console.info("Category Added"))
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        process.exit(); // Terminate the script
    }

}

async function seedSubCategories() {
    try {

        const createdCategories = await Category.create(DummyData.subCategory);

        console.log('Categories seeded successfully:');
        console.log(createdCategories);
        seedCategories().then(r => console.info("Category Added"))
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        process.exit(); // Terminate the script
    }

}

module.exports = {seedCategories, seedSubCategories}