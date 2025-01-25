class Logger {
  private async writeToFile(message: any) {
    try {
      const fileServerUrl = process.env.REACT_APP_FILE_SERVER_URL || 'http://localhost:4001';
      const response = await fetch(`${fileServerUrl}/api/debug/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        console.error('Failed to write to log file:', response.statusText);
      }
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  log(message: any) {
    console.log(message);
    this.writeToFile(message);
  }

  error(message: any) {
    console.error(message);
    this.writeToFile(message);
  }

  warn(message: any) {
    console.warn(message);
    this.writeToFile(message);
  }

  info(message: any) {
    console.info(message);
    this.writeToFile(message);
  }
}

export default new Logger();
