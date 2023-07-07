import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setApproval } from 'redux/reducers/authReducer';

const Privacy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setApproval(true));
    navigate(-1);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Принять
      </button>
    </div>
  );
};

export default Privacy;
