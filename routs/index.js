const AuthRout = require("../routs/auth_rout");
const CategoryRout = require("../routs/category_rout");
const SubCategoryRout = require("../routs/sub_category_rout");

const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
    app.use('/api/v1/categories', CategoryRout)
    app.use('/api/v1/categories', SubCategoryRout)
};

module.exports = mountRoutes;
