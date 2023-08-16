/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import style from './index.module.scss';

const CardSceleton = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <SkeletonTheme color="#979393" highlightColor="#ede7e7">
      <section className={classNames(style.wrapper, { [style.light]: theme === 'light' })}>
        <div className={style.display}>
          <Skeleton height="12rem" width="100%" borderRadius="1.25rem" duration={3} baseColor="#bdb4b44a" />
        </div>
        <h4 className={style.title}>
          <div className={style.left}>
            <Skeleton height={30.35} width="100%" borderRadius="1.25rem" duration={3} baseColor="#bdb4b44a" />
          </div>
          <div className={style.right}>
            <Skeleton height={30.35} width="100%" borderRadius="1.25rem" duration={3} baseColor="#bdb4b44a" />
          </div>
        </h4>
        <p className={style.row}>
          <Skeleton height={17.99} width="100%" borderRadius="1.25rem" duration={3} baseColor="#bdb4b44a" />
        </p>
      </section>
    </SkeletonTheme>
  );
};

export default CardSceleton;
