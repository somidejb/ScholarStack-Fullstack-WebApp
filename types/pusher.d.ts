declare module 'pusher' {
    interface PusherOptions {
      appId: string;
      key: string;
      secret: string;
      cluster: string;
      useTLS?: boolean;
    }
  
    class Pusher {
      constructor(options: PusherOptions);
      trigger(
        channel: string,
        event: string,
        data: any,
        socketId?: string,
        callback?: (error: any, request: any, response: any) => void
      ): void;
      // Add other Pusher methods and properties as needed
    }
  
    export = Pusher;
  }
  