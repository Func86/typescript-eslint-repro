// Reports the heap still in use after linting; typescript-estree keeps its Programs until exit.
process.on('exit', () => {
  globalThis.gc();
  console.error(`retained heap: ${Math.round(process.memoryUsage().heapUsed / 2 ** 20)} MB`);
});
