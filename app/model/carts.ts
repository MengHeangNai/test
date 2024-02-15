import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Cart extends Model {
    static table = 'carts';

    @field('product_id') product_id: any;
    @field('image') image: any;
    @field('old_price') old_price: any;
    @field('price') price: any;
    @field('name') name: any;
    @field('size') size: any;
    @field('quantity') quantity: any;
}