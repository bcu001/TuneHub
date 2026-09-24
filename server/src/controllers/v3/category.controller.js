import apiResponse from '../../lib/apiResponse.js';
import Category from '../../models/category.model.js';


export const getCategories = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const totalCategories = await Category.countDocuments({ isActive: true });
        const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), Math.max(totalCategories, 1));
        const skip = (page - 1) * limit;
        const totalPages = Math.ceil(totalCategories / limit);
        const categories = await Category.find({ isActive: true }).limit(limit).skip(skip).lean();
        if (categories.length === 0) return apiResponse(res, "no categories found", 200);
        return apiResponse(res, "categories found", 200, {
            totalCategories,
            totalPages,
            currPage: page,
            limit,
            skip,
            categories
        })
    } catch (error) {
        console.error("Error at getCategories", error);
        return apiResponse(res, "Error at getCategories", 500);
    }
}

export const getCategoryById = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category) return apiResponse(res,'category not found',404);
        return apiResponse(res,"category found", 200, {category});
    } catch(error){
        console.error("Error at getCategoryById", error);
        return apiResponse(res,"Error at getCategoryById",500);
    }
}