import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req, res)=>{
      try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Existing"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success :true,
            message:"new category created",
            category
        })
        
      } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in Category"

        })
        
      }

};

// update Category

export const updateCategoryController = async (req, res)=>{
    try {
      const {name} = req.body;
      const {id} = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        {name , slug:slugify(name)},
        {new :true}
      )  
      res.status(200).send({
        success :true,
        message:"category updated successfully",
        category
      })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success:false,
            message:"Error while updating category",
            error
        })
        
    }

};

export const categoryController = async(req, res)=>{
   try {
    const category = await categoryModel.find({});
    res.status(200).send({
        success:true,
        message:"All Categories list",
        category
    })
    
   } catch (error) {
    console.log(error);
    res.status(501).send({
        success:false,
        message:"Error while getting categories ",
        error
    })
    
   }
};

// single Category Controller

export const singleCategoryController = async(req, res)=>{
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    res.status(200).send({
        success:true,
        message:"get single categories successfully",
        category
    })
  } catch (error) {
    console.log(error);
    res.status(501).send({
        success:true,
        message:"Error while getting single category",
        error
    })
    
  }
};

export const deleteCategoryController =  async(req, res)=>{
 try {
    const {id} = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
        success:true,
        message:"Category delete successfully"
    })
 } catch (error) {
    console.log(error);
    res.status(501).send({
        success:false,
        message:"Error while deleting category",
       error
    })
    
 }
}