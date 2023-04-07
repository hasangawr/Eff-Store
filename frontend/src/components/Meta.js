import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to EffStore',
    description: 'Discover the best products from your favorite local stores. Shop now and get fast,reliable delivery straight to your doorstep. Shopping has never been more effortless.',
    keywords: 'store management, shopping, products, grocery, items, stores'
}

export default Meta