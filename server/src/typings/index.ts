declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_PORT: number;
      PROD_PORT: number;
      ALLOWEDOMAINS: string;
      DATABASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export interface IMsgs {
  author: string;
  msg: string;
  msgDatenTime: Date;
}

export interface JoinArr {
  nickName: string;
  joinedDatenTime: Date;
}

export interface IJoinList {
  id: string;
  nickName: string;
  joinedDatenTime: Date;
}
