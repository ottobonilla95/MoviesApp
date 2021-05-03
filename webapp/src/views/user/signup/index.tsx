import React, { FunctionComponent } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// history
import history from "../../../utils/history";

// redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/rootReducer";

// actions
import { logIn, signUp } from "../../../redux/user/actions";

// react hook form
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles({
  container: {
    backgroundImage:
      "url('https://blenderartists.org/uploads/default/original/4X/7/e/2/7e2d7bea4ac21388c4a96e1371f375c4ce00094b.jpg')",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "relative",
    width: "500px",
    alignSelf: "center",
    padding: "20px",
    borderRadius: "5px",
  },
});

// ineterfaces
interface Props extends PropsFromRedux {}
interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  company: string;
}

const LogInView: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  // form
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormFields>();

  // submit
  const onSubmit = (data: FormFields) => {
    delete data.confirmPassword;
    props.signUp(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h3>Register</h3>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The field must contain at least 4 caracteres",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Firt name"
                fullWidth
                placeholder="Enter first name"
                disabled={props.user.loading}
                error={errors.firstName !== undefined}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The field must contain at least 4 caracteres",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Last name"
                fullWidth
                placeholder="Enter last name"
                disabled={props.user.loading}
                error={errors.lastName !== undefined}
                helperText={errors.lastName?.message}
              />
            )}
          />

          <Controller
            name="company"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 1,
                message: "The field must contain at least 1 caracteres",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Company"
                fullWidth
                placeholder="Enter company"
                disabled={props.user.loading}
                error={errors.company !== undefined}
                helperText={errors.company?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "This field is required",

              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                message: "Invalid email",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="email"
                fullWidth
                placeholder="Enter email"
                disabled={props.user.loading}
                error={errors.email !== undefined}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "The name should contain at least 8 caracteres",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                placeholder="Enter password"
                disabled={props.user.loading}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "This field is required",
              validate: (value) => {
                if (watch("password") !== value) {
                  return "The passwords don't match";
                }
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm password"
                type="password"
                fullWidth
                placeholder="Confirm password password"
                disabled={props.user.loading}
                error={errors.confirmPassword !== undefined}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>{props.user.loading && <CircularProgress size={30} />}</div>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={props.user.loading}
              >
                Signup
              </Button>
            </div>
          </div>
          <div>
            <Typography variant="body2">
              Already have an account?
              <Link
                href="#"
                style={{ marginLeft: "5px" }}
                onClick={() => history.push("/user/login")}
              >
                Sign in.
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return state;
};

const connector = connect(mapStateToProps, { logIn, signUp });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LogInView);
