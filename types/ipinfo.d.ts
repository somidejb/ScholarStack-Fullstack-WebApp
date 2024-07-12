
declare module 'ipinfo' {
    interface LocationInfo {
      ip: string;
      city: string;
      region: string;
      country: string;
      loc: string;
      org: string;
      postal: string;
      timezone: string;
    }
  
    type Callback = (err: Error | null, loc: LocationInfo) => void;
  
    function ipinfo(ip: string, callback: Callback): void;
  
    export = ipinfo;
  }
  