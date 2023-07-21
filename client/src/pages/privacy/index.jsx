/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setApproval } from 'redux/reducers/authReducer';
import './index.scss';
import { confidentiality } from 'constants/confidentiality';
import LinkParser from 'react-link-parser';

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
  const watchers = [
    {
      type: 'startsWith',
      watchFor: 'https:',
      render: (tag) => <a href={`${tag}`}>{tag}</a>,
    },
  ];
  return (
    <main className="confidentiality">
      <section className="confidentiality-wrapper">
        <h1>Политика конфиденциальности</h1>
        <ol className="confidentiality-block">
          {confidentiality.map((e) => (
            <li className="confidentiality-block-item">
              <h2>{e.heading}</h2>
              {e.content.length === 1 ? (
                <div className="confidentiality-content">
                  <LinkParser watchers={watchers}>{e.content[0]}</LinkParser>
                </div>
              ) : (
                <ol className="confidentiality-content">
                  {e.content.map((el) => {
                    if (Array.isArray(el)) {
                      return (
                        <>
                          {el.map((item) => (
                            <div className="confidentiality-content-item">
                              <LinkParser watchers={watchers}>{item}</LinkParser>
                            </div>
                          ))}
                        </>
                      );
                    }
                    return (
                      <li className="confidentiality-content-item">
                        <LinkParser watchers={watchers}>{el}</LinkParser>
                      </li>
                    );
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
