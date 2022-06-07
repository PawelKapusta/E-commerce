import React, { Fragment } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  createStyles({
    label: {
      marginTop: 10,
      marginBottom: 5,
      fontSize: "1.2em",
    },
    input: {
      width: "90%",
      backgroundColor: "#F0FFFF",
    },
    span: {
      display: "block",
      fontSize: "1em",
      marginTop: 5,
      color: "#FF0000",
    },
  }),
);

const FormInput = ({
  labelTitle,
  control,
  register,
  errors,
  name,
  numberRows,
  InputProps,
  type,
  required,
  defaultValue,
  multiline,
  setValue,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.label}>{labelTitle}</div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value } }) => (
          <TextField
            className={classes.input}
            {...register(name, { required: true })}
            id="filled-multiline-flexible"
            name={name}
            rows={numberRows}
            value={value}
            onChange={e => setValue(name, e.target.value)}
            variant="filled"
            margin="normal"
            multiline={multiline}
            InputProps={InputProps}
            type={type}
            required={required}
          />
        )}
        rules={{ required: `${name} required` }}
      />
      <span className={classes.span}>{errors?.message}</span>
    </Fragment>
  );
};

export default FormInput;
