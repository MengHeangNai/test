import {
  schemaMigrations,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 15,
      steps: [
        addColumns({
          table: 'carts',
          columns: [
            { name: 'product_id', type: 'string' },
            { name: 'image', type: 'string' },
            { name: 'old_price', type: 'number' },
            { name: 'price', type: 'number' },
            { name: 'name', type: 'string' },
            { name: 'size', type: 'string' },
            { name: 'quantity', type: 'number' },
          ],
        }),
        addColumns({
          table: 'messages',
          columns: [
            { name: 'message', type: 'string' },
            { name: 'isReceiver', type: 'boolean' },
            { name: 'date', type: 'string' },
          ],
        })
      ],
    },
  ],
});
