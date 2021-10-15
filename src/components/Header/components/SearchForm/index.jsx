import SearchIcon from "@mui/icons-material/Search";
import Button from "components/Button";
import Input from "components/form-controll/Input";
import React from "react";
import "./style.scss";

SearchForm.propTypes = {};

function SearchForm(props) {
  return (
    <>
      <form className='search' action=''>
        <div className='search__container'>
          <Button>
            <SearchIcon />
          </Button>

          <div className='input-wrapper'>
            <Input
              className='z-input-placeholder'
              placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
