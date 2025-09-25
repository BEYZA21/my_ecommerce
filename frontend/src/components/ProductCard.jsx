export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.image && (
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="product-img"
        />
      )}

      <h3>{product.name}</h3>
      <p className="price">{product.price} ₺</p>
      {product.description && <p className="desc">{product.description}</p>}
    </div>
  );
}
