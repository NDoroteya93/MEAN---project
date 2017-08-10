export class User {
    id: number;
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    authorities: Array<any> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}