import React, { useState, useRef, FunctionComponent } from "react";

// react bootstrap
import Modal from "react-bootstrap/Modal";

// material-ui
import Button from "@material-ui/core/Button";
import DropzoneComponent from "react-dropzone-component";
import Cropper from "react-cropper";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  setCropResult: (url: any) => void;
}
const ImagePickerModal: FunctionComponent<Props> = ({
  isOpen,
  closeModal,
  setCropResult,
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const cropperRef = useRef<HTMLImageElement>(null);

  //  close modal
  const closeModalAction = () => {
    setImage(null);
    closeModal();
  };

  //   drop zone event
  const dropZoneEventHandlers = {
    addedfile: (file: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
    dragenter: () => setDragOver(true),
    dragleave: () => setDragOver(false),
  };

  //   drop zone conf
  const djsConfig = {
    autoProcessQueue: false,
  };

  const componentConfig = {
    postUrl: "no-url",
  };

  // crop image
  const cropImage = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    setCropResult(cropper.getCroppedCanvas().toDataURL());
    setImage(null);
    closeModal();
  };

  return (
    <Modal show={isOpen} onHide={() => closeModalAction()}>
      <Modal.Header>Image picker</Modal.Header>
      <Modal.Body>
        {!image && (
          <div
            style={{
              backgroundColor: dragOver ? "lightgray" : "white",
              padding: "20px",
              height: "100px",
              borderRadius: 5,
            }}
          >
            {/* @ts-ignore */}
            <DropzoneComponent
              config={componentConfig}
              eventHandlers={dropZoneEventHandlers}
              djsConfig={djsConfig}
            />
          </div>
        )}
        {image && (
          <Cropper
            style={{ height: 400, width: "100%" }}
            preview=".img-preview"
            guides={true}
            src={image as string}
            ref={cropperRef}
            aspectRatio={4 / 4}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          onClick={() => setImage(null)}
          style={{ marginRight: 10 }}
        >
          Clear
        </Button>

        <Button
          variant="contained"
          onClick={() => closeModalAction()}
          color="secondary"
          style={{ marginRight: 10 }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={image === null}
          onClick={() => {
            cropImage();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImagePickerModal;
