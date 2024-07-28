export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'Name of the category',
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
        title: 'Image',
        name: 'image',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
    ],
  };