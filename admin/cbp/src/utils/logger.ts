class Logger {
  private writeToFile(message: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} ${JSON.stringify(message)}\n`;
    // Just use console logging for now
    console.log(logEntry);
  }

  async log(message: any): Promise<void>;
  async log(message: string, payload: string): Promise<void>;
  async log(message: any, payload?: string) {
    try {
      const logMessage = payload ? { message, payload } : message;
      console.log(logMessage);
      await this.writeToFile(logMessage);
    } catch (error) {
      console.error('Error in log method:', error);
    }
  }

  async error(message: any): Promise<void>;
  async error(message: string, payload: string): Promise<void>;
  async error(message: any, payload?: string) {
    try {
      const logMessage = payload ? { message, payload } : message;
      console.error(logMessage);
      await this.writeToFile(logMessage);
    } catch (error) {
      console.error('Error in error method:', error);
    }
  }

  async warn(message: any): Promise<void>;
  async warn(message: string, payload: string): Promise<void>;
  async warn(message: any, payload?: string) {
    try {
      const logMessage = payload ? { message, payload } : message;
      console.warn(logMessage);
      await this.writeToFile(logMessage);
    } catch (error) {
      console.error('Error in warn method:', error);
    }
  }

  async info(message: any): Promise<void>;
  async info(message: string, payload: string): Promise<void>;
  async info(message: any, payload?: string) {
    try {
      const logMessage = payload ? { message, payload } : message;
      console.info(logMessage);
      await this.writeToFile(logMessage);
    } catch (error) {
      console.error('Error in info method:', error);
    }
  }
}

export default new Logger();