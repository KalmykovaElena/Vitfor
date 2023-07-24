/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import React from 'react'
import { useParams } from 'react-router-dom';

const SaleAds = () => {
  const params = useParams();
  console.log(params);
  return (
    <main>SaleAds</main>
  )
}

export default SaleAds