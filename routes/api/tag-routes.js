const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all products
    try{
      const tagData = await Tag.findAll({
          include: [
              {
                  model: Product,
                  through: ProductTag,
                  as: 'productTag_product'
              }
          ]
        })
      res.json(tagData)
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try{
        const tagData = Tag.findOne({
            where: {
                id: req.params.id
            },
            include:[
                {
                    model: Product,
                    through: ProductTag,
                    as: 'productTag_product'
                }
            ]
        });
        if(!tagData){
            res.status(404).json(
                {
                    message: 'Tag was not found'
                });
                return;
        }
            res.json(tagData);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

router.post('/', async (req, res) => {
    // create a new category
    try{
      const tagData= await Tag.create({
          tag_name: req.body.tag_name
        })
        res.json(tagData);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  });

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try{
      const tagData = await Tag.update({
          tag_name: req.body.tag_name
      },
      {
          where: {
              id: req.params.id
          }
      })
      if(!tagData){
          res.status(404).json({ message: 'No category found'});
          return;
      }
      res.json(tagData);
  }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
    
  });

router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    try {
     const tagData= await Tag.destroy({
          where:{
              id: req.params.id
          }
        })
        if(!tagData){
          res.status(404).json({message: 'Category doesnt exist'});
          return;
        }
        res.json(tagData);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;