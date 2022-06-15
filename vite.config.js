import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'karen233',
            fileName: s => `karen233.${s}.js`,
        },
        minify: false,
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
});
