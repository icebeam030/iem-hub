# The Vue.JS front-end

## Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```


## Key Functionalities
- You can create an admin account of email address `admin@admin.com` to access create, edit and delete functionalities.
- You can rate an IEM by clicking the button. Your rating will be saved in back-end.
- The state will persist after page refreshing, so remember to log out (User token will expire in one week).
- You can search by brand or model name.


## Key design elements
- It's recommended you setup the project with the ever-evolving [Vue CLI](https://cli.vuejs.org/guide/installation.html) to get maximum flexibility.
- Components are simple at this stage, but it's suggested you set up folders to group them as the project gets bigger.
- The beautiful material design and layout is achieved by the awesome Vuetify plugin, check their even better [documentation](https://vuetifyjs.com/en/getting-started/quick-start)!
- The UI calls services in the `Services` folder to hit back-end endpoints.
- `App.vue` is basically the header and the footer.
- Routing are done by the core [Vuerouter](https://router.vuejs.org/) library, navigation guards are set to prevent unauthenticated access to the app.
- The [Vuex](https://vuex.vuejs.org/) store is used to store application-wide states such as user token.
- To maintain user states after page refreshes, [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme) is used.
- The app adjusts to different screen sizes by using the Vuetify [breakpoints](https://vuetifyjs.com/en/layout/breakpoints#introduction) system.
