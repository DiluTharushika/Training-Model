import { createServer } from 'vite';

async function test() {
  const server = await createServer({
    configFile: './vite.config.js',
    server: { port: 1337 }
  });
  const module = await server.ssrLoadModule('./src/data/productImages.js');
  console.log('Images:', module.productImages.slice(0, 3));
  await server.close();
}

test();
