import { ChevronDown, MoreHorizontal } from "lucide-react";
import "./RecentOrders.css";

import camera from "../../assets/products/camera.png";
import dress from "../../assets/products/dress.png";
import arganOil from "../../assets/products/argan-oil.png";
import perfume from "../../assets/products/perfume.png";

const orders = [
  {
    tracking: "#876364",
    name: "Camera Lens",
    image: camera,
    price: "$178",
    quantity: 325,
    amount: "$1,46,660",
  },
  {
    tracking: "#876368",
    name: "Black Sleep Dress",
    image: dress,
    price: "$14",
    quantity: 53,
    amount: "$46,660",
  },
  {
    tracking: "#876412",
    name: "Argan Oil",
    image: arganOil,
    price: "$21",
    quantity: 78,
    amount: "$3,46,676",
  },
  {
    tracking: "#876621",
    name: "EAU DE Parfum",
    image: perfume,
    price: "$32",
    quantity: 98,
    amount: "$3,46,981",
  },
];

function RecentOrders() {
  return (
    <div className="recent-orders-card">
      {/* Header */}
      <div className="recent-orders-header">
        <h3>Recent Orders</h3>

        <button
          className="orders-menu-button"
          aria-label="More options"
          onClick={() => alert("More options")}
        >
          <MoreHorizontal size={22} />
        </button>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>
                <div className="orders-heading">
                  Tracking no
                  <ChevronDown size={13} />
                </div>
              </th>

              <th>
                <div className="orders-heading">
                  Product Name
                  <ChevronDown size={13} />
                </div>
              </th>

              <th>
                <div className="orders-heading">
                  Price
                  <ChevronDown size={13} />
                </div>
              </th>

              <th>
                <div className="orders-heading">
                  Total Order
                  <ChevronDown size={13} />
                </div>
              </th>

              <th>
                <div className="orders-heading">
                  Total Amount
                  <ChevronDown size={13} />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.tracking}>
                <td className="tracking-number">
                  {order.tracking}
                </td>

                <td>
                  <div className="order-product">
                    <div className="order-product-image">
                      <img src={order.image} alt={order.name} />
                    </div>

                    <span>{order.name}</span>
                  </div>
                </td>

                <td className="order-price">
                  {order.price}
                </td>

                <td>
                  <span className="order-quantity">
                    {order.quantity}
                  </span>
                </td>

                <td className="order-amount">
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;