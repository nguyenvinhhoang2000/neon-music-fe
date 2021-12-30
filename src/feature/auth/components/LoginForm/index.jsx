import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputField from "components/form-controls/InputField";
import PasswordField from "components/form-controls/PasswordField";
// import { LockOutlined } from "@mui/icons";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    password: yup.string().required("Vui lòng nhập mật khẩu."),
  });

  const form = useForm({
    defaultValues: {
      username: "",
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 10,
      }}
    >
      {isSubmitting && <LinearProgress />}

      <Avatar
        sx={{
          backgroundColor: "red",
          marginBottom: 1,
        }}
      >
        <LockOutlinedIcon></LockOutlinedIcon>
      </Avatar>

      <Typography
        sx={{
          marginBottom: 3,
        }}
        component='h3'
        variant='h5'
      >
        Đăng Nhập
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='username' label='Tài khoản' form={form} />
        <PasswordField name='password' label='Mật khẩu' form={form} />
        <Button
          disabled={isSubmitting}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{
            marginTop: 2,
            backgroundColor: "#7e04b1",
            "&:hover": {
              backgroundColor: "#680293",
            },
          }}
        >
          Đăng Nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
