export class User {
    _id: string;
    username: string = '';
    password: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}