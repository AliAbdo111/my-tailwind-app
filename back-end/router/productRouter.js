    const express= require('express');
    const Product= require('./../module/Product');
    const multer = require('multer')


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function(req, file, cb) {
          cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
        }
      })
    const upload= multer({storage:storage})
  const  productRouter=express.Router()

    productRouter.post('/',upload.array('image-file') ,async(req, res)=>{
        try{
            const url = req.protocol + '://' + req.get('host')
            const imageUrls = await req.files.map((file) => `${url}/uploads/${file.filename}`);
            const prduct = await Product.create({...req.body,imgUrl: imageUrls })
            res.status(200).json({
                message:" product created successflly",
                data:prduct
            })
        }catch(error){
            res.status(500).send('serever Error Happpend')
        }
    })

    productRouter.get('/:id',async (req, res)=>{
        try{
            const id= req.params.id
            const prduct = await Product.find({_id:id})
            res.status(200).json({
                message:" you get prducte by id"+id,
                data:prduct
            })
          }catch(error){
            
            res.status(500).send('serever Error Happpend'+error)
          }
       })

    productRouter.get('/',async (req, res)=>{
        try{
            const prduct = await Product.find()
            res.status(200).json({
                message:" you get all prductes",
                data:prduct
            })
            }catch(error){
            res.status(500).send('serever Error Happpend')
            }
    })
module.exports={ productRouter}