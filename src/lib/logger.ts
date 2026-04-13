type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private log(level: LogLevel, message: string, context?: LogContext, error?: unknown) {
    const timestamp = new Date().toISOString();
    const env = process.env.NODE_ENV || 'development';

    const logEntry: Record<string, any> = {
      timestamp,
      level,
      env,
      message,
    };

    if (context) {
      logEntry.context = context;
    }

    if (error !== undefined && error !== null) {
      logEntry.error = error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: env === 'development' ? error.stack : undefined
      } : error;
    }

    // In a real production application, you would send this to Datadog, Sentry, CloudWatch, etc.
    // For now, we output structured JSON to stdout/stderr which can be easily parsed by log aggregators.
    const output = JSON.stringify(logEntry);

    switch (level) {
      case 'info':
        console.info(output);
        break;
      case 'warn':
        console.warn(output);
        break;
      case 'error':
        console.error(output);
        break;
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: unknown, context?: LogContext) {
    this.log('error', message, context, error);
  }
}

export const logger = new Logger();
