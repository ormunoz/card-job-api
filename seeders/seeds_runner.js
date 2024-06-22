import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Convertir __filename y __dirname utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    const seedersFolder = __dirname;

    // Leemos todos los seeders
    const seeders = readdirSync(seedersFolder);
    // Ejecutamos los seeders
    for (const seederFile of seeders) {
      if (seederFile === 'seeds_runner.js') {
        continue;
      }

      const seederPath = join(seedersFolder, seederFile);
      const seederURL = pathToFileURL(seederPath).href;
      const seederModule = await import(seederURL);
      const seederMain = seederModule.default;
      await seederMain();
    }

    console.log('Todos los seeders han sido ejecutados correctamente.');
  } catch (error) {
    console.error('Error durante la ejecución de los seeders:', error);
  }
}

main();
