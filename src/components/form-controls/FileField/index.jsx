import { Input } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

FileField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

  onChange: PropTypes.func,

  disabled: PropTypes.bool,
};

function FileField(props) {
  const { form, name, label, disabled, onChange, id } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      sx={{
        marginTop: 1,
      }}
      name={name}
      control={form.control}
      render={({ onChange }) => (
        <Input
          id={id}
          type='file'
          onChange={(e) => onChange(e.target.files[0])}
          style={{ display: "none" }}
        />
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
