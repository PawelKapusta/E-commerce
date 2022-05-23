import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormInput from "./FormInput";
import IconButton from "@mui/material/IconButton";
import FaceIcon from "@mui/icons-material/Face";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginTop: "7%",
        margin: "auto",
        backgroundColor: "#ffffff",
      },
    },
    box: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "40%",
      },
      borderColor: "black",
    },
    icon: {
      marginBottom: "50%",
    },
    form: {
      marginTop: "2%",
      marginLeft: "8%",
    },
    loader: {
      marginTop: "3%",
      width: "90%",
    },
    register: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px #A9A9A9",
      color: "#696969",
      height: 46,
      padding: "0 15px",
      cursor: "pointer",
      marginTop: 5,
    },
    loginButton: {
      cursor: "pointer",
      fontSize: "1.1rem",
    },
    registerBox: {
      textAlign: "center",
      marginRight: "5%",
      marginBottom: "3%",
      marginTop: "1%",
    },
  }),
);

const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  // useEffect(() => {
  //   <Navigate to="/login" replace />;
  // }, [success]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    surname: yup.string().required("Surname is a required field"),
    username: yup.string().required("Username is a required field"),
    email: yup.string().required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must be the same")
      .required("Confirmed password is a required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    reset();
    setOpen(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleRedirectClick = () => {
    navigate("/login");
  };

  const handleClose = (event, reason) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <Paper elevation={3}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              labelTitle="Name"
              name="name"
              control={control}
              register={register}
              errors={errors?.name}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaceIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Surname"
              name="surname"
              control={control}
              register={register}
              errors={errors?.surname}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Username"
              name="username"
              control={control}
              register={register}
              errors={errors?.username}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Email"
              name="email"
              control={control}
              register={register}
              errors={errors?.email}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="email"
            />
            <FormInput
              labelTitle="Password"
              name="password"
              control={control}
              register={register}
              errors={errors?.password}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />
            <FormInput
              labelTitle="Confirmed password"
              name="confirmPassword"
              control={control}
              register={register}
              errors={errors?.confirmPassword}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />
            <div className={classes.registerBox}>
              <input type="submit" value="Register" className={classes.register} />
            </div>
            {/*{loading ? (*/}
            {/* <div className={classes.loader}>*/}
            {/*   <LinearProgress /> <span>Trwa utwarzanie konta...</span>*/}
            {/* </div>*/}
            {/*) : (*/}
            {/* ""*/}
            {/*)}*/}
            {/*{!loading && error?.status === 409 ? (*/}
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
            {/*   <Alert severity="error">*/}
            {/*     Użytkownik o tym nicku już istnieje w bazie danych. Spróbuj innej nazwy*/}
            {/*   </Alert>*/}
            {/* </Snackbar>*/}
            {/*) : (*/}
            {/* ""*/}
            {/*)}*/}
          </form>
        </Paper>
        <Link className={classes.loginButton} variant="outlined" onClick={handleRedirectClick}>
          You have already an account?
        </Link>
      </Box>
    </div>
  );
};

export default RegisterCard;
