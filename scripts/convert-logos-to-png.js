// SPDX-License-Identifier: MIT

import chalk from 'chalk';
import logSymbols from 'log-symbols';
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import svg2 from 'oslllo-svg2';

const logos = (await readdir('.', { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.svg'))
    .map(dirent => dirent.name.replace(/\.svg$/, ''));

logos.forEach(async logo => {
    try {
        console.log(logSymbols.info, chalk.blue(`Converting ${logo} to PNG...`));
        await svg2(`${logo}.svg`).png().toFile(path.join('images', `${logo}.png`));
        console.log(logSymbols.success, chalk.green(`Converted ${logo} to PNG`));
    } catch (error) {
        console.error(logSymbols.error, chalk.red(`Converting ${logo} to PNG failed: ${error}`));
    }
});
