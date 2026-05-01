import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | MealNova` : 'MealNova - Premium Meal Delivery'}</title>
      <meta name="description" content={description || 'MealNova offers premium, healthy meal delivery services right to your doorstep.'} />
      {/* End standard metadata tags */}

      {/* Facebook tags */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title || 'MealNova - Premium Meal Delivery'} />
      <meta property="og:description" content={description || 'MealNova offers premium, healthy meal delivery services right to your doorstep.'} />
      {/* End Facebook tags */}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || 'MealNova'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'MealNova - Premium Meal Delivery'} />
      <meta name="twitter:description" content={description || 'MealNova offers premium, healthy meal delivery services right to your doorstep.'} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SEO;
