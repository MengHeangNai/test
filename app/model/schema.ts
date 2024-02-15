import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 15, // Increment the version number
  tables: [
    tableSchema({
      name: 'carts',
      columns: [
        { name: 'product_id', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'old_price', type: 'number', isOptional: true }, // Add the new column
        { name: 'price', type: 'number' },
        { name: 'name', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'quantity', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        { name: 'message', type: 'string' },
        { name: 'isReceiver', type: 'boolean' },
        { name: 'date', type: 'string' },
      ],
    }),
  ],
});
