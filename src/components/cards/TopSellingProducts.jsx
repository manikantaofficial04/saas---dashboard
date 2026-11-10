import { useState } from "react";
import {
  Star,
  X,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import nikeImage from "../../assets/products/nike-shoes.png";
import iphoneImage from "../../assets/products/iphone-12.png";

import "./TopSellingProducts.css";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    category: "Sports Shoes",
    image: nikeImage,
    price: "$120.00",
    oldPrice: "$150.00",
    rating: 4.8,
    reviews: 120,
    sold: 850,
    percentage: 85,
    badge: "Best Seller",
    description:
      "Premium Nike sports shoes designed for comfort, performance, and everyday style.",
  },
  {
    id: 2,
    name: "iPhone 12",
    category: "Smartphones",
    image: iphoneImage,
    price: "$699.00",
    oldPrice: "$799.00",
    rating: 4.9,
    reviews: 245,
    sold: 720,
    percentage: 72,
    badge: "Popular",
    description:
      "Apple iPhone 12 featuring a Super Retina XDR display and advanced camera system.",
  },
];

function TopSellingProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="top-selling-card">
      <div className="top-selling-header">
        <div>
          <div className="top-selling-title">
            <h3>Top Selling Products</h3>
            <TrendingUp size={19} />
          </div>
          <p>Best performing products this month</p>
        </div>

        <button
          className="top-selling-view-all"
          onClick={() => setSelectedProduct("all")}
        >
          View All <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="top-selling-summary">
        <div className="summary-icon">
          <ShoppingBag size={20} />
        </div>

        <div>
          <span>Total Products</span>
          <strong>02</strong>
        </div>

        <div className="summary-divider" />

        <div>
          <span>Total Units Sold</span>
          <strong>1,570</strong>
        </div>
      </div>

      <div className="top-selling-list">
        {products.map((product, index) => (
          <div className="selling-product" key={product.id}>
            <div className="selling-product-image">
              <span className="product-rank">#{index + 1}</span>
              <img src={product.image} alt={product.name} />
            </div>

            <div className="selling-product-details">
              <div className="selling-product-top">
                <div>
                  <span className={`product-badge badge-${index + 1}`}>
                    {product.badge}
                  </span>

                  <h4>{product.name}</h4>
                  <p className="product-category">{product.category}</p>
                </div>

                <button
                  className="product-view-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="product-rating">
                <Star size={14} fill="#FFB547" color="#FFB547" />
                <strong>{product.rating}</strong>
                <span>({product.reviews} reviews)</span>
              </div>

              <div className="product-price-row">
                <div className="product-price">
                  <strong>{product.price}</strong>
                  <del>{product.oldPrice}</del>
                </div>

                <span className="product-sold">
                  {product.sold} sold
                </span>
              </div>

              <div className="product-progress">
                <div
                  className="product-progress-fill"
                  style={{ width: `${product.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {selectedProduct === "all" ? (
              <>
                <h2>Top Selling Products</h2>
                <p className="modal-description">
                  There are {products.length} products in this dashboard
                  showcase.
                </p>

                {products.map((product) => (
                  <div className="modal-product-row" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.sold} units sold</p>
                    </div>
                    <strong>{product.price}</strong>
                  </div>
                ))}
              </>
            ) : (
              <>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="modal-product-image"
                />

                <span className="product-badge badge-1">
                  {selectedProduct.badge}
                </span>

                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">
                  {selectedProduct.category}
                </p>

                <div className="product-rating modal-rating">
                  <Star size={15} fill="#FFB547" color="#FFB547" />
                  <strong>{selectedProduct.rating}</strong>
                  <span>({selectedProduct.reviews} reviews)</span>
                </div>

                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                <div className="modal-price">
                  <strong>{selectedProduct.price}</strong>
                  <del>{selectedProduct.oldPrice}</del>
                </div>

                <div className="modal-sales">
                  <TrendingUp size={17} />
                  {selectedProduct.sold} units sold this month
                </div>
              </>
            )}

            <button
              className="modal-close-action"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopSellingProducts;