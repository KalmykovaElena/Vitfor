/* eslint-disable react-hooks/exhaustive-deps */
import Logo from 'components/logo';
import { getForumTheme } from 'http/Forum/getForumTheme';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-grid-carousel';
import { useParams } from 'react-router-dom';
// import { setForumTheme } from 'redux/reducers/forumReducer';
import { ReactComponent as MessageIcon } from 'assets/forum-message.svg';
import { ReactComponent as RightArrow } from 'assets/right-arrow.svg';
import { ReactComponent as LeftArrow } from 'assets/left-arrow.svg';
import './index.scss';
import Comments from 'components/sale-components/comments';

const ThemeFullCard = () => {
  const { theme } = useSelector((state) => ({
    theme: state.auth.theme,
    // forumTheme: state.forum.forumTheme,
  }));
  const [forumTheme, setForumTheme] = useState();
  const { themeId } = useParams();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (themeId) {
      getForumTheme(themeId, setForumTheme);
    }
    return () => setForumTheme(null);
  }, []);
  return (
    <section className={`forum-theme forum-theme__${theme}`}>
      {forumTheme && (
        <>
          <div className="theme-header">
            <div className="theme-header__content">
              <div className="content-title">
                <Logo
                  name="user"
                  text={forumTheme.userName}
                  subtext={forumTheme.nickName}
                  img={forumTheme.userPhoto}
                  textLocation="right"
                />
                <div className="title">{forumTheme.title}</div>
              </div>
              <div className="content-description">
                <MessageIcon /> {forumTheme.description}
              </div>
            </div>
            {forumTheme.files.length > 0 && (
              <Carousel
                cols={forumTheme.files.length > 3 ? 3 : forumTheme.files.length > 2 ? 2 : 1}
                rows={1}
                gap={10}
                containerStyle={{ display: 'flex', alignItems: 'center' }}
                loop
                arrowRight={forumTheme.files.length > 4 ? <RightArrow /> : ''}
                arrowLeft={forumTheme.files.length > 4 ? <LeftArrow /> : ''}
              >
                {forumTheme.files.map((e) => (
                  <Carousel.Item key={e.fileString}>
                    <img
                      width="100%"
                      className="carousel-item"
                      src={`data:image/png;base64,${e.fileString}`}
                      alt="additional"
                      role="presentation"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
          <Comments advert={forumTheme} />
        </>
      )}
    </section>
  );
};

export default ThemeFullCard;
