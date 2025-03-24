import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rectangle150 from "../../public/images/Rectangle150.png";

const CartProduct = () => {
  return (
    <div className="item item_buys px-1">
      <div className="card">
        <div className="top-picks-space">
          <img
            src={Rectangle150}
            className="img-fluid"
            width="167px"
            height="183px"
            alt="toppicks1"
          />
        </div>
      </div>

      <div className="description">
        <div className="d-flex justify-content-center justify-content-lg-start">
          <p className="toppicks-star">★</p>

          <p className="rate">4.6</p>

          <div className="topicks-border"></div>

          <p className="category">Nutrition</p>
        </div>

        <h2 className="toppicks-heading">
          Enfamil A+ Follow Up Formula Stage 2 (6-12..asdasasd.)
        </h2>

        <p className="toppicks-discount">&#8377; 799.00</p>

        <p className="toppicks-price">&#8377; 751.00</p>

        <a
          className="text-decoration-none align-self-center d-flex cart"
          href="#"
        >
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} size="lg" />
          Add to Cart
        </a>
      </div>
    </div>
  );
};

export default CartProduct;
