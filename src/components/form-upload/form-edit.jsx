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
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import songApi from "api/songApi";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.object,
};

function EditForm(props) {
  const { edit } = props;
  const { enqueueSnackbar } = useSnackbar();
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
      name_song: edit.name_song,
      name_singer: edit.name_singer,
      category: edit.category,
      song: null,
      img_song: null,
    },
    // resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    try {
      let formData = new FormData();

      formData.append("id", edit._id);
      formData.append("name_song", values.name_song);
      formData.append("name_singer", values.name_singer);
      formData.append("category", values.category);
      formData.append("song", values.song);
      formData.append("img_song", values.img_song);

      await songApi.update(formData);
      enqueueSnackbar("Chỉnh sửa thành công!!!", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const { isSubmitting } = form.formState;

  const [nameSong, setNameSong] = useState();
  const [nameImg, setNameImg] = useState();
  // useEffect(() => {
  //   if (form.watch("song")?.name !== undefined) {
  //     setNameSong(form.watch("song")?.name);
  //   }
  // }, [form.watch("song")]);
  // //img
  // useEffect(() => {
  //   if (form.watch("img_song")?.name !== undefined) {
  //     setNameImg(form.watch("img_song")?.name);
  //   }
  // }, [form.watch("img_song")]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 10,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "red",
          marginBottom: 1,
        }}
      >
        <MusicNoteIcon />
      </Avatar>
      {isSubmitting && <LinearProgress />}

      <Typography
        sx={{
          marginBottom: 3,
        }}
        component='h3'
        variant='h5'
      >
        Chỉnh sửa bài hát
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='name_song' label='Tên bài hát' form={form} />
        <InputField name='name_singer' label='Tên ca sĩ' form={form} />
        <InputField name='category' label='Thể loại' form={form} />

        <label className='label-input-song' htmlFor='input-song'>
          <FileField id='input-song' name='song' form={form} />
          <span>
            {nameSong != undefined
              ? form.watch("song")?.name
              : edit?.cloudinary_id_song}
          </span>
        </label>
        <label className='label-input-photo' htmlFor='input-photo'>
          <FileField id='input-photo' name='img_song' form={form} />
          <img src={edit.img_song} style={{ width: "552px" }} alt='' />
        </label>
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
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
