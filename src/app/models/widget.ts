import { Translations } from './translations';

export class Widget {
    id: number;
    group_id: number;
    module_name: string;
    custom_init_code: string;
    slug: string;
    translations: Translations[];
    settings: string;
}