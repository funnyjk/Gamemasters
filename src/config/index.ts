interface OConfig {
  uri: string;
  url: string;
}

export const config = (): OConfig => {
  const env = process.env.NODE_ENV;
  switch (env) {
    case 'production':
      return {
        uri: 'http://gmmstrs.com:4000',
        url: 'http://gmmstrs.com'
      };
    case 'development':
      return {
        uri: 'http://localhost:4000',
        url: 'http://localhost:8000'
      };
  }
};