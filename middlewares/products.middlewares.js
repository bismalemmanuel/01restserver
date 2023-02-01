const Product = require('../models/product.model');

exports.validProductById = async (req, res, next) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR EL PRODUCTO A ELIMINAR
    const product = await Product.findOne({
      where: {
        id,
        status: true,
      },
    });

    //3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'The product was not found',
      });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
