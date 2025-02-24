class Logger {
  private async writeToFile(message: any) {
    try {
      const fileServerUrl = process.env.REACT_APP_FILE_SERVER_URL || 'http://localhost:4001';
      console.log('Debug - Writing to log server:', fileServerUrl);
      const response = await fetch(`${fileServerUrl}/api/debug/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      if (!response.ok) {
        console.error('Failed to write to log file:', response.statusText);
        console.error('Response:', await response.text());
      } else {
        console.log('Debug - Successfully wrote to log file');
      }
    } catch (error) {
      console.error('Error writing to log file:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
    }
  }

  async log(message: any) {
    try {
      console.log(message);
      await this.writeToFile(message);
    } catch (error) {
      console.error('Error in log method:', error);
    }
  }

  async error(message: any) {
    try {
      console.error(message);
      await this.writeToFile(message);
    } catch (error) {
      console.error('Error in error method:', error);
    }
  }

  async warn(message: any) {
    try {
      console.warn(message);
      await this.writeToFile(message);
    } catch (error) {
      console.error('Error in warn method:', error);
    }
  }

  async info(message: any) {
    try {
      console.info(message);
      await this.writeToFile(message);
    } catch (error) {
      console.error('Error in info method:', error);
    }
  }
}

export default new Logger();