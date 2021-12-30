import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { LockOutlined } from "@mui/icons";
import InputField from "components/form-controls/InputField";
import PasswordField from "components/form-controls/PasswordField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FileField from "components/form-controls/FileField";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập họ tên.")
      .test("abc", "Họ tên phải có nhiều hơn 2 từ.", (value) => {
        return value.split(" ").length >= 2;
      }),

    email: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp."),
    // avatar: yup.
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
      avatar: null,
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
        Tạo Tài Khoản
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='name' label='Họ và tên' form={form} />
        <InputField name='email' label='Tài khoản' form={form} />
        <PasswordField name='password' label='Mật khẩu' form={form} />
        <PasswordField
          name='retypePassword'
          label='Nhập lại mật khẩu'
          form={form}
        />
        <FileField name='avatar' form={form} />
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
          TẠO TÀI KHOẢN
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
