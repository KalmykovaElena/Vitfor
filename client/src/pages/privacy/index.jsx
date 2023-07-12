import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setApproval } from 'redux/reducers/authReducer';
import './index.scss';
import { confidentiality } from 'constants/confidentiality';

const Privacy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const handleClick = () => {
    dispatch(setApproval(true));
    navigate(-1);
  };

  return (
    <main className="confidentiality">
      <section className="confidentiality-wrapper">
        <h1>Политика конфиденциальности</h1>
        <ol className="confidentiality-block">
          {confidentiality.map((e) => (
            <li className="confidentiality-block-item">
              <h2>{e.heading}</h2>
              {e.content.length === 1 ? (
                <div className="confidentiality-content">{e.content[0]}</div>
              ) : (
                <ol className="confidentiality-content">
                  {e.content.map((el) => {
                    if (Array.isArray(el)) {
                      return (
                        <>
                          {el.map((item) => (
                            <div className="confidentiality-content-item">{item}</div>
                          ))}
                        </>
                      );
                    }
                    return <li className="confidentiality-content-item">{el}</li>;
                  })}
                </ol>
              )}
            </li>
          ))}
        </ol>
        {currentPage === 'registration/privacy' && (
          <div className="link" type="button" onClick={handleClick}>
            Принять
          </div>
        )}
      </section>
    </main>
  );
};

export default Privacy;
