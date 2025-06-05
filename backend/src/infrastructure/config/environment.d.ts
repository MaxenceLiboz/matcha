declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MYSQL_DATABASE: string;
        HOST: string;
        MYSQL_USER: string;
        MYSQL_PASSWORD?: string; 
        MYSQL_PORT?: string;     
        PORT?: string;           
        FRONTEND_HOST: string;
        FRONTEND_PORT: string;
        JWT_SECRET: string;
        JWT_EXPIRES_IN: number;
      }
    }
  }
  
  export {};