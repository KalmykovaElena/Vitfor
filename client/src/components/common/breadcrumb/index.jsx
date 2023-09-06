import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const BreadCrumb = ({ data, className }) => {
  const { pathname } = useLocation();
  const breadCrumbView = () => {
    const pathnames = pathname.split('/').filter((item) => item);
    if (pathnames.find((e) => e === 'ad' || e === 'theme' || e === 'event')) pathnames.splice(-1);
    const capatilize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : null);
    const items = [
      pathnames.length > 0
        ? {
            title: <Link to="/">Главная</Link>,
            className: className || '',
          }
        : {
            title: 'Главная',
            className: className || '',
          },
      ...pathnames.map((e, index, arr) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const renderData =
          data.find((item) => item.link === `/${e}`) ||
          data.find((item) => item.link === `/${arr[index - 1]}`).items.find((item) => item.search === e);
        const name = renderData ? (renderData.name ? renderData.name : renderData.label) : e;
        return isLast
          ? {
              title: capatilize(name),
              className: className ? `${className} ${className}__end` : '',
            }
          : {
              title: <Link to={`${routeTo}`}>{capatilize(name)}</Link>,
              className: className || '',
            };
      }),
    ];
    return (
      <div className={`breadcrumb ${className}`}>
        <Breadcrumb separator=">" items={items} />
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
