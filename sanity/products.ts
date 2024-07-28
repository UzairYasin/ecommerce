export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number'
    },
    {
      title: 'price_id',
      name:'PriceId',
      type:'string'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Select categories for this product',
    },
    {
      title: 'Color Variations',
      name: 'colorVariations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Color',
              name: 'color',
              type: 'string'
            },
            {
              title: 'Color Code',
              name: 'colorCode',
              type: 'string'
            },
            {
              title: 'Stock',
              name: 'stock',
              type: 'number'
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              }
            }
          ]
        }
      ]
    }
  ]
}
