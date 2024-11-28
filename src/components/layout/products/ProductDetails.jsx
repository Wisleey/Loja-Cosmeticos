// components/layout/products/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { all_products } from "../../../lista_produtos"; // Certifique-se de importar o array de produtos
import "./ProductDetails.css"

const ProductDetails = () => {
  const { productName } = useParams(); // Captura o parâmetro da URL

  // Busca o produto correspondente ao productName
  const productData = all_products.find(product => product.name === productName);

  if (!productData) {
    return <div>Produto não encontrado</div>; // Caso o produto não seja encontrado
  }

  return (
    <div>
      <Header />
      <div className="product-details">
        <h1>Detalhes do Produto: {productData.name}</h1>
       

        <img src={productData.img} alt={productData.name} />
        <p>{productData.description}</p>
        <p>Preço: R$ {productData.price}</p>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
