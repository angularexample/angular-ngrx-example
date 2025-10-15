# Angular Ngrx Example

## To Run This App

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Install Angular Material

Angular Material is used for the loading spinner and the alert dialog snackbar.

Install Angular Material per documentation:
https://material.angular.io/guide/getting-started

```
ng add @angular/material
```

## Replace Jasmin with Jest

Most experts agree that Jest is superior to Jasmine for unit testing.

For more information, see the [Jest documentation](https://jestjs.io/).

### Remove Karma and Jasmine

Remove all the Jasmine and Karma packages from `package.json`.

```
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.9.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
```

### Add Jest

Add the Jest packages to the package.json file.

```
    npm install --save-dev jest @types/jest jest-preset-angular jest-environment-jsdom
```

### Create jest.config.js File

Create a `jest.config.js` file in the root of the project.

```javascript
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    transform: {
        '^.+\\.ts$': 'ts-jest', // Only transform .ts files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
    ],
};
```

### Create setup-jest.ts File

Create a `setup-jest.ts` file in the root of the project.

If not using Zone.js, add the following to the setup-jest.ts file.
```javascript
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();
```

If using Zone.js, add the following to the setup-jest.ts file.
```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

### Update test Section in angular.json

Update the test section in the angular.json file.

```
"test": {
  "builder": "@angular-devkit/build-angular:jest",
  "options": {
    "tsConfig": "tsconfig.spec.json"
  }
}
```

### Add esModuleInterop to tsconfig.json

Add the following to the `tsconfig.json` file under the `compilerOptions` section.

```
"esModuleInterop": true,
```

### Update tsconfig.spec.json

In the `tsconfig.spec.json` file, update the `compilerOptions` section as follows:

```
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
```

### Update scripts in package.json

In the `scripts` section of the `package.json` file, change the `test` property to `jest`.

```
    "test": "jest"
```

## Install ESLint and Prettier

For consistent code formatting, install and configure ESLint and Prettier.

### The Difference Between ESLint and Prettier

ESLint is a linter. It checks your code for errors and warnings.
Problems that are not discovered by the linter can cause compile or runtime errors, or unexpected behavior.

Prettier is a code formatter. It reformats your code to make it more consistent and easier to read.
Format errors normally do not cause compile or runtime errors.

But formatting is a good practice to follow, especially when working with a team.
If all team members use the same code formatting, it makes it easier to read and understand each other's code.

### Remove .editorconfig

The `.editorconfig` file is added by default by the Angular CLI when you create a new project using `ng new`.
It is normally used by IDEs to automatically configure the code formatting.

To prevent conflicts or unintended overrides of the lint or formatting rules, remove the `.editorconfig` file.

## Install ESLint

Experts agree that ESLint is the best tool for linting JavaScript code.

For more information, see the [ESLint documentation](https://eslint.org/).

Install and configure ESLint using this command:

```
npm init @eslint/config@latest
```

Accept these default settings:

```
✔ What do you want to lint? · javascript
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
...
✔ Where does your code run? · browser
...
eslint, @eslint/js, globals, typescript-eslint
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

...Except for the following settings:

```
Which framework does your project use? …  
  React
  Vue.js
❯ None of these

```
Select `None of these`

```
? Does your project use TypeScript? › No / Yes
```
Select `Yes`.

```
 Which language do you want your configuration file be written in? …  
  JavaScript
  TypeScript
```
Select `TypeScript`.

```
Jiti is required for Node.js <24.3.0 to read TypeScript configuration files.
? Would you like to add Jiti as a devDependency? › No / Yes
```
Check your version of Node.js. If it is less than 24.3.0, select `Yes`.

### Configure ESLint in Your IDE

For IntelliJ IDEA, see docs to automatically run ESLint on save.

https://www.jetbrains.com/help/idea/eslint.html#ws_js_eslint_automatic_configuration


## Install Prettier

Follow the instructions in the [Prettier documentation](https://prettier.io/docs/en/install.html).

Install and configure Prettier using this command:

```
npm install --save-dev --save-exact prettier
```

### Create Prettier Config File

Then, create an empty config file to let editors and other tools know you are using Prettier:

```
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

### Create .prettierignore File

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

```
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```

### Install eslint-config-prettier

To use Prettier with ESLint, you need to install the eslint-config-prettier package:

```
npm i -D eslint-config-prettier
```

Add the following to the `.eslintrc.config.mts` file:

```
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js }, extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  { ignores: ["node_modules/", "dist/", "*.min.js", ".idea", ".vscode", "coverage/", "jest.config.js"]},
  eslintConfigPrettier,
  tseslint.configs.recommended,
]);
```

### Configure Prettier in your IDE

For IntelliJ IDEA, see docs to automatically run Prettier on save.
https://prettier.io/docs/webstorm

## Install NgRx and NgRx Extensions

You will need the store, effects, operators, and devtools to use NgRx.

### Install NgRx Store

Install NgRx per documentation:
https://ngrx.io/guide/store/install

```
ng add @ngrx/store@latest
```
This command will also configure the NgRx store for standard Angular CLI projects.

### Install NgRx Effects

Install NgRx Effects per documentation:
https://ngrx.io/guide/effects/install

```
ng add @ngrx/effects@latest
```

### Install NgRx Operators

The NgRx operators are needed to use the `concatLatestFrom` operator. 

Install NgRx Operators per documentation:
https://ngrx.io/guide/operators/install

```
ng add @ngrx/operators@latest
```

### Install NgRx DevTools

The NgRx DevTools are needed to use the Redux DevTools Chrome extension.

Install NgRx DevTools per documentation:
https://ngrx.io/guide/store-devtools/install

```
ng add @ngrx/store-devtools@latest
```

## Install Redux DevTools Chrome Extension

Install Redux DevTools Chrome Extension per documentation:

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

This extension is needed to view the Redux store in the browser DevTools.

It requires the @ngrx/store-devtools package.


## Install NgRx Eslint Plugin

The NgRx Eslint Plugin is needed to use the NgRx Eslint rules.

Install NgRx Eslint Plugin per documentation:
https://ngrx.io/guide/eslint-plugin/install

```
ng add @ngrx/eslint-plugin
```

### Configure NgRx Eslint Plugin

Add the following to the `.eslintrc.config.js` file:

```
import ngrx from '@ngrx/eslint-plugin/v9';
  
  {
    extends: [
      ...ngrx.configs.all
    ]
  }
```
