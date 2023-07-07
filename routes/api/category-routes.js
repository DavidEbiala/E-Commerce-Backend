const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all products
    try{
      const categoryData = await Category.findAll({
          include: [
              {
                  model: Product
              },
          ]
        })
      res.json(categoryData)
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  });

  
router.get('/:id', async (req, res) => {
    try{
        const categoryData = Category.findOne({
            where: {
                id: req.params.id
            },
            include:[
                {
                    model: Product
                },
            ]
        });
        if(!categoryData){
            res.status(404).json(
                {
                    message: 'Category was not found'
                });
                return;
        }
            res.json(categoryData);
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
    const categoryData= await Category.create({
        category_name: req.body.category_name
      })
      res.json(categoryData);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update({
        category_name: req.body.category_name
    },
    {
        where: {
            id: req.params.id
        }
    })
    if(!categoryData){
        res.status(404).json({ message: 'No category found'});
        return;
    }
    res.json(categoryData);
}catch(err){
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    try {
     const categoryData= await Category.destroy({
          where:{
              id: req.params.id
          }
        })
        if(!categoryData){
          res.status(404).json({message: 'Category doesnt exist'});
          return;
        }
        res.json(categoryData);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;