{
    "name": "res-med-app",
    "version": "0.0.0",
    "license": "MIT",
    "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build -prod && node server/server.js",
        "watch:client": "ng serve --proxy-config proxy.conf.json --open",
        "watch:server": "nodemon /server/server.js",
        "watch": "run-p watch:*",
        "test": "ng test",
        "lint": "ng lint",
        "e2e": "ng e2e"
    },
    "private": true,
    "dependencies": {
        "@angular/animations": "^4.0.0",
        "@angular/common": "^4.0.0",
        "@angular/compiler": "^4.0.0",
        "@angular/core": "^4.0.0",
        "@angular/forms": "^4.0.0",
        "@angular/http": "^4.0.0",
        "@angular/platform-browser": "^4.0.0",
        "@angular/platform-browser-dynamic": "^4.0.0",
        "@angular/router": "^4.0.0",
        "angular2-jwt": "^0.2.3",
        "auth0-js": "^8.8.0",
        "auth0-lock": "^10.19.0",
        "bcrypt": "^1.0.2",
        "body-parser": "^1.17.2",
        "bootstrap": "^3.3.7",
        "connect-mongo": "^1.3.2",
        "cookie-parser": "^1.4.3",
        "core-js": "^2.4.1",
        "cors": "^2.8.4",
        "crypto": "^0.0.3",
        "dotenv": "^4.0.0",
        "errorhandler": "^1.5.0",
        "express": "^4.15.3",
        "express-jwt": "^5.3.0",
        "express-jwt-authz": "^1.0.0",
        "express-session": "^1.15.4",
        "font-awesome": "^4.7.0",
        "jquery": "^3.2.1",
        "jsonwebtoken": "^7.4.1",
        "jwks-rsa": "^1.2.0",
        "lodash": "^4.17.4",
        "mongodb": "^2.2.30",
        "morgan": "^1.8.2",
        "nodemon": "^1.11.0",
        "passport": "^0.3.2",
        "passport-local": "^1.0.0",
        "rxjs": "^5.4.2",
        "zone.js": "^0.8.14"
    },
    "devDependencies": {
        "@angular/cli": "1.2.6",
        "@angular/compiler-cli": "^4.0.0",
        "@angular/language-service": "^4.0.0",
        "@types/jasmine": "~2.5.53",
        "@types/jasminewd2": "~2.0.2",
        "@types/node": "~6.0.60",
        "codelyzer": "~3.0.1",
        "jasmine-core": "~2.6.2",
        "jasmine-spec-reporter": "~4.1.0",
        "karma": "~1.7.0",
        "karma-chrome-launcher": "~2.1.1",
        "karma-cli": "~1.0.1",
        "karma-coverage-istanbul-reporter": "^1.2.1",
        "karma-jasmine": "~1.1.0",
        "karma-jasmine-html-reporter": "^0.2.2",
        "protractor": "~5.1.2",
        "ts-node": "~3.0.4",
        "tslint": "~5.3.2",
        "typescript": "~2.3.3"
    }
}
