import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import InputField from "components/form-controls/InputField";
import PasswordField from "components/form-controls/PasswordField";
// import { LockOutlined } from "@mui/icons";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(4),
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    password: yup.string().required("Vui lòng nhập mật khẩu."),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      {/* <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar> */}

      <Typography className={classes.title} component='h3' variant='h5'>
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='identifier' label='Tài khoản' form={form} />
        <PasswordField name='password' label='Mật khẩu' form={form} />
        <Button
          disabled={isSubmitting}
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
