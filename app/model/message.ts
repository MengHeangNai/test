import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Message extends Model {
    static table = 'messages';

    @field('message') message: any;
    @field('isReceiver') isReceiver: boolean;
    @field('date') date: any;
}