const validateQuantity = (req, res, next) => {
    const sale = req.body;

    const quantityFilter = sale
        .map((prod) => prod.quantity).some((quantity) => quantity === undefined);
    const quantity = sale
        .map((prod) => prod.quantity).some((q) => q <= 0);
    if (quantityFilter) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity) {
        return res.status(422).json(
            { message: '"quantity" must be greater than or equal to 1' },
        );
    }
    next();
};

module.exports = validateQuantity;