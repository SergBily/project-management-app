// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://glacial-earth-79071.herokuapp.com',
  team: [
    {
      name: 'Sergey Belyavsky',
      appointment: 'team lead',
      photo: 'https://avatars.githubusercontent.com/u/89011743?v=4',
      gitHub: 'https://github.com/SergBily',
      description: [
        'Backend setup',
        'User authorization and login / sign up',
        'Board page (route)',
        'Deployment',
      ],
    },
    {
      name: 'Evgeny Parkhomenko',
      appointment: 'frontend',
      photo: 'https://avatars.githubusercontent.com/u/77242330?v=4',
      gitHub: 'https://github.com/Parxommm',
      description: [
        'Main page (route)',
        'Drag-n-drop',
        'Modals',
        'Localization (ru/en)',
      ],
    },
    {
      name: 'Siarhei Ashmiana',
      appointment: 'frontend',
      photo: 'https://avatars.githubusercontent.com/u/95861915?v=4',
      gitHub: 'https://github.com/Sergei5431',
      description: [
        'Welcome page(route)',
        'Header',
        'Footer',
      ],
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
