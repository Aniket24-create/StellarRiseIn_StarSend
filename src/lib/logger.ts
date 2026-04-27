type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
    
    this.logs.push(entry);
    
    // In production, this would send to a monitoring service like Sentry or Logtail
    console.log(`[${level.toUpperCase()}] ${message}`, data || '');
  }

  getLogs() {
    return this.logs;
  }
}

export const logger = Logger.getInstance();
