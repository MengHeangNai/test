import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../model/schema';
import migrations from '../model/migrations';

import Cart from 'model/carts';
import Message from 'model/message';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'Heang',
});

export const database = new Database({
  adapter,
  modelClasses: [Cart, Message],
});
