const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Product = require("../model/product");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new product
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save product
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
    //aca toco codigo para ir filtrando
    let product = await Product.find({})
    .sort({name: 'asc'})
    .exec()
    .then((product) => {

      res.json(product)
    })
  .catch((err) => {
    res.status(500).send(err)
  })
});


router.delete("/:id", async (req, res) => {
  try {
    // Find product by id
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
    // Delete product from db
    await product.remove();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || product.name,
      image: result.secure_url || product.image,
      price: req.body.price || product.price,
      description: req.body.description || product.description,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
