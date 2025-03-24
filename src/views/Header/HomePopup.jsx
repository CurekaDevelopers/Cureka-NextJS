"use client";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const HomePopup = ({ show, onHide, popupData }) => {
  // console.log(popupData, 'popupData', show, "show")
  const [modalPopupShow, setModalPopupShow] = useState(show);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let timeout1, timeout2;
    const popupSeen = sessionStorage.getItem("popupSeen");
    // console.log(popupSeen, "popupSeen");
    // console.log(popupData, 'popupData Home')

    if (popupData.length > 0) {
      // open the popup after 10 seconds
      const timeLagData = popupData && popupData[0] && popupData[0].time_lag;
      // close the popup after 10 seconds
      const countDownData =
        popupData && popupData[0] && popupData[0].count_down;
      const timeLag = timeLagData * 1000;
      const countDown = countDownData * 1000;
      timeout1 = setTimeout(() => {
        if (!popupSeen) {
          // console.log("Popup true")
          setModalPopupShow(true);
        }
      }, timeLag);
      // Close the popup after  x seconds
      timeout2 = setTimeout(() => {
        sessionStorage.setItem("popupSeen", "true");
        // console.log("Popup false")
        setModalPopupShow(false);
      }, timeLag + countDown);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const handleCopyCode = () => {
    setShowButton(true);
    navigator.clipboard.writeText(
      popupData && popupData[0] && popupData[0].coupon_code
    );
  };
  const handlenavigate = () => {
    window.open(popupData && popupData[0] && popupData[0].link, "_blank");
  };
  const handleClosePopup = () => {
    console.log("Popup false close");
    sessionStorage.setItem("popupSeen", "true");
    setModalPopupShow(false);
  };
  return (
    <Modal
      id="HomePopup"
      show={modalPopupShow}
      onHide={handleClosePopup}
      size="lg"
    >
      <Modal.Header closeButton></Modal.Header>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img
          width="800"
          height="400"
          src={popupData && popupData[0] && popupData[0].image}
          alt="Coupon Image"
          className="img-fluid popupimg"
        />
      </div>

      {/* <Modal.Footer> */}
      {popupData && popupData[0] && popupData[0].image && (
        <>
          {popupData &&
            popupData[0] &&
            popupData[0].link &&
            popupData[0].link != "undefined" && (
              <div className="mx-auto w-75 d-block">
                <Button onClick={handlenavigate} className="btn orderpopup-btn">
                  Order Now
                </Button>
              </div>
            )}
          {popupData &&
            popupData[0] &&
            popupData[0].coupon_code &&
            popupData[0].coupon_code != "undefined" && (
              <div className="text-center mx-auto d-block">
                {showButton ? (
                  <div>
                    <Button className="btn orderpopup-btn">Copied</Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className="btn orderpopup-btn"
                      onClick={handleCopyCode}
                    >
                      {popupData && popupData[0] && popupData[0].coupon_code}
                    </Button>
                  </div>
                )}
              </div>
            )}
        </>
      )}
      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default HomePopup;
