import { Button, Modal } from "react-bootstrap";

const ConfirmationModel = ({ showModal, hideModal, confirmModal, message, label, ctaTitle, type = 'delete' }) => {
  const buttonColor = type === 'delete' ? 'danger' : 'success'
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="{buttonColor}" onClick={confirmModal}>
          {ctaTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModel;
