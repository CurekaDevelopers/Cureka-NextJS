import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import trash from "../../public/images/trash.svg";
import { moveToCart } from "../../redux/action";
import noproduct from "../../public/images/noimageavailable.png";

const CartProduct = ({ product, onQuantityChange, onRemoveFromCart }) => {
  const inputRef = useRef();
  const [productQuantity, setProductQuantity] = useState(product?.qty || 1);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleProductQuantity = (quantity) => {
    setProductQuantity(quantity);
    if (quantity) {
      onQuantityChange(quantity);
      setShowUpdate(false);
    } else {
      setShowUpdate(true);
    }
  };
  let product_front_image;
  if (product?.product_images) {
    product_front_image = product?.product_images[0].image;
  } else {
    product_front_image = noproduct;
  }
  const onRemoveFromCartFun = (e) => {
    onRemoveFromCart(e);
  };
  const moveTOWishListFun = (e) => {
    console.log(e);
    moveToCart(e.product_id).then(() => {
      window.location.reload();
    });
  };
  return (
    <div>
      <div className="d-lg-flex d-flex-column product-card justify-content-between pb-0">
        <div className="d-lg-flex d-flex-column">
          <div className="card align-self-center">
            {product && product?.product_images?.length > 0 && (
              <img
                className="img-fluid mx-auto"
                src={product?.product_images[0]?.image}
                width="73px"
                height="80px"
                alt={product.product_name}
              />
            )}
          </div>

          <div className="product-details">
            <h2 className="heading">{product.product_name}</h2>

            <div className="d-flex">
              <p className="mrp-price mb-0">MRP ₹ {product.mrp}</p>

              <p className="price mb-0">
                ₹ {Number(product.final_price).toFixed(2)}
              </p>
              {product.discount_percent > 0 ? (
                <p className="mrp-off mb-0">
                  {Number(product.discount_percent).toFixed(2)} % Off
                </p>
              ) : (
                <p className="mrp-off mb-0">
                  {Number(product.discount_amount).toFixed(2)} Off
                </p>
              )}
            </div>

            {/* <p className="mb-lg-0 mt-2 delivery-time">
              Delivery by Sun 27 Aug, 12:00 pm - 10:00 pm
            </p> */}
          </div>
        </div>
        <div
          className="trash cursor-pointer"
          onClick={() => onRemoveFromCartFun(product)}
        >
          <img
            className="img-fluid"
            src={trash}
            width="20px"
            height="20px"
            alt="trash"
          />
          Delete
        </div>
      </div>

      <div className="d-flex justify-content-between quantity">
        <div
          className="d-flex align-self-center pl-4"
          onClick={() => moveTOWishListFun(product)}
        >
          <a>Move to wishlist</a>
        </div>
        <Dropdown>
          <Dropdown.Toggle
            // eslint-disable-next-line react/display-name
            as={forwardRef(({ onClick, children }, ref) => (
              <div
                ref={ref}
                onClick={onClick}
                id="accordion"
                className="cursor-pointer"
              >
                <h2
                  className="sort-by align-items-center d-flex"
                  style={{ padding: 0 }}
                >
                  <button
                    type="button"
                    data-toggle="collapse"
                    data-target="#sort-section"
                    aria-expanded="true"
                    aria-controls="sort-section"
                    className="btn"
                  >
                    {children}
                  </button>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="mr-2"
                    size="lg"
                    style={{ color: "#1b1c1d" }}
                  />
                </h2>
              </div>
            ))}
            id="custom-dropdown-button"
          >
            {`Quantity: ${product?.qty || 1}`}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((quantity) => {
              return (
                <Dropdown.Item
                  key={quantity}
                  onClick={() => handleProductQuantity(quantity)}
                >
                  {quantity}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {/* {showUpdate && <div className="d-flex ml-2">
          <input
            type="number"
            ref={inputRef}
            name="quantity"
            style={{ height: '36px' }}
            required
            placeholder="Enter Quantity"
          />
          <a
            className="text-decoration-none ml-2 cart text-center justify-center d-flex"
            href="#"
            style={{ height: '36px' }}
            onClick={() => { setShowUpdate(false); handleProductQuantity(inputRef.current.value) }}
          >
            Update
          </a>
        </div>} */}
      </div>

      <div className="bottom-border mt-3"></div>
    </div>
  );
};

export default CartProduct;
