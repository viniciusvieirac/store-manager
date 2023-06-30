const productsFromDB = [
    {
        id: 1,
        name: 'Camisa',
    },
    {
        id: 2,
        name: 'Blusa',
    },
];

const oneProductFromDB = {
    id: 1,
    name: 'Camisa',
};

const newProductInDB = {
    id: 4,
    name: 'ProdutoX',
};
const newProductCreatedSucessful = {
    status: 'CREATED',
    data: newProductInDB,
};

const newProduct = {
    name: 'ProdutoX',
};

module.exports = {
    productsFromDB,
    oneProductFromDB,
    newProductInDB,
    newProduct,
    newProductCreatedSucessful,
};