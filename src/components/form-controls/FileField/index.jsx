import { Input } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

FileField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  onChange: PropTypes.func,

  disabled: PropTypes.bool,
};

function FileField(props) {
  const { form, name, label, disabled, onChange } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      sx={{
        marginTop: 1,
      }}
      accept='image/*'
      id='contained-button-file'
      type='file'
      name={name}
      control={form.control}
      // render={({ field: { onChange } }) => (
      //   <Input onChange={(e) => onChange(e.target.files[0])} />
      // )}
      render={({ onChange }) => (
        <Input type='file' onChange={(e) => onChange(e.target.files[0])} />
      )}
      margin='normal'
      fullWidth
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  );
}

export default FileField;
