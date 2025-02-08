import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await CommandFactory.run(AppModule, ['debug', 'error', 'log']);

}
bootstrap();
