import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class FileLogger extends ConsoleLogger {
  private readonly logPath = path.join(__dirname, '..', '..', 'logs');
  private readonly errorFilePath = path.join(this.logPath, 'errors.log');

  constructor() {
    super();
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }
  }

  error(message: any, stack?: string, context?: string) {
    const date = new Date().toISOString().split('T')[0];
    const dailyFileName = `errors-${date}.log`;
    const dailyPath = path.join(this.logPath, dailyFileName);

    const logMessage = `[${new Date().toISOString()}] [ERROR] [${context || this.context}] ${message} \n${stack || 'No Stack Trace'}\n\n`;

    fs.appendFile(dailyPath, logMessage, (err) => {
      if (err) process.stderr.write(`Error escribiendo log: ${err.message}\n`);
    });

    super.error(message, stack, context);
  }
}
