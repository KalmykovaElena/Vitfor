import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const BreadCrumb = ({ data, className }) => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split('/').filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
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
          data.filter((item) => item.link === `/${e}`)[0] ||
          data.filter((item) => item.link === `/${arr[index - 1]}`)[0].items.filter((item) => item.search === e)[0];
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
      <div className="breadcrumb">
        <Breadcrumb separator=">" items={items} />
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
