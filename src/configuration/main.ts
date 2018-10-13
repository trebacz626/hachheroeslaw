

let development = {
  killstagramDB: {
    name: "hackheroes",
    userName: "hackheroesmaster",
    password: "admin1",
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
  azurBlobStorage: {
    containerName: "killterest",
    connectionString: "DefaultEndpointsProtocol=https;AccountName=killterest;AccountKey=p1NBWRRVtC2/KFBSnjSIyZUW516rNq/M0qpH0bT8CSrczDU/1yjdpy8USoAwpcm2ncI+yeh0lvL7ZxPik3kxzg==;EndpointSuffix=core.windows.net",
    url:"https://killterest.blob.core.windows.net/killterest/"
  },
  logger: {
    savePath:"logs.log"
  }
};

let production = {
  killstagramDB: {
    name: "killstagramdb-2018",
    userName: "killstagram-2018",
    password: "k1llstagram123@A",
    host: "killstagramdb-2018.database.windows.net"
  },
  passport: {

  },
  session: {
    secret: "MY little secret",
    secureCookie: false,
    saveUninitialized: false,
    resave: false
  },
  azurBlobStorage: {
    containerName: "killterest",
    connectionString: "DefaultEndpointsProtocol=https;AccountName=killterest;AccountKey=p1NBWRRVtC2/KFBSnjSIyZUW516rNq/M0qpH0bT8CSrczDU/1yjdpy8USoAwpcm2ncI+yeh0lvL7ZxPik3kxzg==;EndpointSuffix=core.windows.net"
  },
  logger: {
    savePath: "logs.log"
  }
};

let config = [];
config['dev'] = development;
config['prod'] = production;

export default config[process.env.NODE_ENV||'dev'];

