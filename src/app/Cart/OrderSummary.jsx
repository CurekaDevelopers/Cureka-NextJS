const OrderSummary = ({ subTotalAmount, discountInfo, isGiftWrappingSelected, finalAmount, selectedPaymentMethod, shippingCharge, walletMoney, isWalletMoneyChecked }) => {

  return (
    <div className="order-summary">
      <p className="summary">Order Summary</p>

      <div className="d-flex justify-content-between">
        <p className="subtotal">Sub Total</p>

        <p className="amount">₹ {Number(subTotalAmount).toFixed(2)}</p>
      </div>
      {!!discountInfo?.final_amount && (
        <div className="d-flex justify-content-between">
          <p className="subtotal">
            Discount{" "}
            {!!discountInfo?.discount_percentage && (
              <span className="paid-amount">({discountInfo?.discount_percentage}% Off)</span>
            )}
          </p>


          <p className="paid-amount">-₹ {Number(discountInfo?.discount).toFixed(2)}</p>
        </div>
      )}
      {selectedPaymentMethod === 'makeapayement' && subTotalAmount > 599 ? (
        <>
          <div className="d-flex justify-content-between">
            <p className="subtotal">
              Additional 1% Discount on Prepay {" "}
            </p>
            <p className="paid-amount">-₹ {Number(subTotalAmount && subTotalAmount * 0.01).toFixed(2)}</p>

          </div>
        </>
      ) : (
        <>
          {selectedPaymentMethod === 'makeapayement' && finalAmount > 599 && !!discountInfo?.final_amount &&
            <div className="d-flex justify-content-between">
              <p className="subtotal">
                Additional 1% Discount on Prepay{" "}
              </p>
              <p className="paid-amount">-₹ {Number(finalAmount && finalAmount * 0.01).toFixed(2)}</p>

            </div>
          }
        </>
      )}
      {selectedPaymentMethod === 'makeapayement' &&
        <div className="d-flex justify-content-between">
          <p className="subtotal">Shipping Charges</p>

          <p className="paid-amount">₹{shippingCharge && shippingCharge.charge}</p>
        </div>
      }
      {selectedPaymentMethod === 'cashOnDelivery' &&
        <div className="d-flex justify-content-between">
          <p className="subtotal">Shipping Charges</p>

          <p className="paid-amount">₹{shippingCharge && shippingCharge.charge}</p>
        </div>
      }
      {isWalletMoneyChecked && (
        <div className="d-flex justify-content-between">
          <p className="subtotal">Wallet Money</p>

          <p className="amount">{isWalletMoneyChecked ? '(Applied)' : '(Not Applied)'}: ₹{walletMoney}</p>
        </div>
      )}
       {/* {isWalletMoneyChecked && finalAmount > 599 &&  (
        <div className="d-flex justify-content-between">
          <p className="subtotal">Additional 1% Discount on Prepay</p>
          <p className="paid-amount">-₹ {Number(finalAmount && finalAmount * 0.01).toFixed(2)}</p>
          </div>
      )} */}

      {isGiftWrappingSelected && (
        <div className="d-flex justify-content-between">
          <p className="subtotal">Gift wrapping charges</p>

          <p className="amount">₹ 40.00</p>
        </div>
      )}

      <div className="bottom-border mb-4"></div>
      {selectedPaymentMethod === 'makeapayement' && finalAmount > 599 ? (
        <div className="d-flex justify-content-between">
          <p className="subtotal">Amount to be paid</p>
          <p className="amount total-amount">
            ₹ {
              (() => {
                let payableAmount;
                if (selectedPaymentMethod === 'makeapayement' && finalAmount > 599) {
                  payableAmount = Number(Math.round((finalAmount) - (subTotalAmount * 0.01)) + (shippingCharge && shippingCharge.charge)).toFixed(2);
                } else {
                  payableAmount = Number(Math.round(finalAmount)).toFixed(2);
                }
                // Apply wallet deduction if wallet is used
                if (isWalletMoneyChecked) {
                  if (walletMoney >= payableAmount) {
                    payableAmount = 0; // Wallet covers the entire amount
                  } else {
                    payableAmount = Number(Math.round(payableAmount - walletMoney)).toFixed(2); // Deduct wallet balance from total amount
                  }
                }

                return payableAmount;
              })()
            }
          </p>
        </div>
      ) : (
        <div className="d-flex justify-content-between">
          {selectedPaymentMethod === 'cashOnDelivery' ? (
            <>
              <p className="subtotal">Amount to be paid</p>
              <p className="amount total-amount">
                ₹ {
                  (() => {
                    let payableAmount = Number(Math.round((finalAmount) + (shippingCharge && shippingCharge.charge))).toFixed(2);

                    // Apply wallet deduction if wallet is used
                    if (isWalletMoneyChecked) {
                      if (walletMoney >= payableAmount) {
                        payableAmount = 0; // Wallet covers the entire amount
                      } else {
                        payableAmount = Number(payableAmount - walletMoney).toFixed(2); // Deduct wallet balance from total amount
                      }
                    }

                    return payableAmount;
                  })()
                }
              </p>
            </>
          ) : (
            <>
              <p className="subtotal">Amount to be paid</p>
              <p className="amount total-amount">
                ₹ {
                  (() => {
                    let payableAmount;
                    if (selectedPaymentMethod === 'makeapayement' && finalAmount < 599) {
                      payableAmount = Number(Math.round((finalAmount) + (shippingCharge && shippingCharge.charge))).toFixed(2);
                    } else {
                      payableAmount = Math.round(finalAmount).toFixed(2);
                    }

                    // Apply wallet deduction if wallet is used
                    if (isWalletMoneyChecked) {
                      if (walletMoney >= payableAmount) {
                        payableAmount = 0; // Wallet covers the entire amount
                      } else {
                        payableAmount = Number(payableAmount - walletMoney).toFixed(2); // Deduct wallet balance from total amount
                      }
                    }

                    return payableAmount;
                  })()
                }
              </p>
            </>
          )}
        </div>
      )}


      {!!discountInfo?.discount && (
        <div className="d-flex justify-content-between">
          <p className="paid-amount">Total savings for this order</p>

          <p className="paid-amount">₹ {selectedPaymentMethod === 'makeapayement' && finalAmount > 599 ? Number(discountInfo?.discount + subTotalAmount * 0.01).toFixed(2) : Number(discountInfo?.discount).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};
export default OrderSummary;
