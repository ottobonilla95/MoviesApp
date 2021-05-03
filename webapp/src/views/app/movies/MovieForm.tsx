import React, { FunctionComponent, useState } from "react";

// react bootstrap
import Modal from "react-bootstrap/Modal";

// material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// components
import ImagePicker from "../../../components/common/ImagePicker";

// react hook form
import { useForm, Controller } from "react-hook-form";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (form: FormFields) => void;
  loading: boolean;
}

interface FormFields {
  name: string;
  description: string;
  image: string;
}

const MovieForm: FunctionComponent<Props> = (props) => {
  // state
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  const [imageErrorMessage, setImageErrorMessage] = useState<
    string | undefined
  >(undefined);

  // form
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  // submit
  const onSubmit = (data: FormFields) => {
    setImageErrorMessage(undefined);

    if (!previewImage) {
      setImageErrorMessage("You must provide an image.");

      return;
    }
    props.onSubmit({ ...data, image: previewImage! });
    // reset form
    reset({ name: "", description: "" });
    setPreviewImage(undefined);
  };

  return (
    <>
      <Modal show={props.isOpen} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Modal.Body>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "This field is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="name"
                  fullWidth
                  placeholder="Enter name"
                  disabled={props.loading}
                  error={errors.name !== undefined}
                  helperText={errors.name?.message}
                  variant="outlined"
                />
              )}
            />
            <br />
            <br />
            <Controller
              name="description"
              control={control}
              rules={{
                required: "This field is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="description"
                  fullWidth
                  placeholder="Enter description"
                  disabled={props.loading}
                  error={errors.description !== undefined}
                  helperText={errors.description?.message}
                  variant="outlined"
                />
              )}
            />
            {previewImage && (
              <img
                src={previewImage}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: 5,
                  display: "block",
                  marginTop: 10,
                }}
              />
            )}

            <Button
              variant="contained"
              onClick={() => setShowImagePicker(true)}
              style={{ marginRight: 10, marginTop: 10 }}
            >
              Select image
            </Button>
            {imageErrorMessage && (
              <Typography
                variant="caption"
                color="error"
                style={{ display: "block", marginTop: "10px" }}
              >
                {imageErrorMessage}
              </Typography>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              onClick={props.handleClose}
              style={{ marginRight: 10 }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ImagePicker
        isOpen={showImagePicker}
        closeModal={() => setShowImagePicker(false)}
        setCropResult={(crop) => {
          setPreviewImage(crop);
          setImageErrorMessage(undefined);
        }}
      />
    </>
  );
};
export default MovieForm;
