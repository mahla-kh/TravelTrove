import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "./Button";

function BackBtn() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClickHandler={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackBtn;
