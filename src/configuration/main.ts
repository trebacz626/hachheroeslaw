

let development = {
  killstagramDB: {
    name: "hackheroes",
    userName: "root",
    password: "bau3hTbGrKCBmvn6",
    host: "localhost"
  },
  passport: {
    jwt:{
      secret:"veryveeerysecret"
    }
  },
  session:{
    secret:"MY little secret",
    secureCookie: false,
    saveUninitialized: false,
    resave:false
  },
  logger: {
    savePath:"logs.log"
  }
};


let config = [];
config['dev'] = development;
//config['prod'] = production;

export default config[process.env.NODE_ENV||'dev'];

