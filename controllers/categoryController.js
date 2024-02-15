import categoryModel from "../models/categoryModels.js";
import slugify from "slugify";

// yeh callback function hai isliye ismein req and res receive karte hai
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'name is necessary' })
        }

        const existingUser = await categoryModel.findOne({ name })
        if (existingUser) {
            res.status(200).send({
                success: true,
                message: 'Category already envolved'
            })
        }

        const category = new categoryModel({ name, slug: slugify(name) })
        category.save();
        res.status(201).send({
            success: true,
            message: 'Category Created Successfully',
            category: category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'something went wrong',
            error
        })
    }
}

// update category controller here
// yeh callback function hai isliye ismein req and res receive karte hai
// yaha se hum category ko update kar sakte hai
export const updatecategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        // yahape third parameter hame bhejna padega as new varna update nhi hooga
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(201).send({
            success: true,
            message: 'category has been updated successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while updating the category'

        })
    }
}

// controller for getting all the categories

export const getallcategoryController = async (req, res) => {
    try {
        //agar get karna hai all category to woh joh hai wohj find method se hoo jaayega
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category List",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching all the categories",
            error
        })
    }

}

// yahase hum joh hai single category ko fetch kar lenge

export const singlecategoryController = async (req, res) => {
    try {
        // const { slug } = req.params;
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Successfully fetched the single category",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting single category',
            error
        })
    }
}

//category delete karne ke liye controller
// agar kisi category ko delete karna ho toh hum usse findByIdAndDelete method se delete kar sakte hai
export const deletecategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category has been deleted Successfully",

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while deleting the category',
            error
        })
    }
}