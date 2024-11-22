// SPDX-License-Identifier: MIT

import chalk from 'chalk';
import logSymbols from 'log-symbols';
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import svg2 from 'oslllo-svg2';

const logos = (await readdir('.', { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.svg'))
    .map(dirent => dirent.name.replace(/\.svg$/, ''));

const outputDirectory = 'images';

console.log(logSymbols.info, chalk.blue(`Writing to the ${outputDirectory} directory...`));

logos.forEach(async logo => {
    try {
        console.log(logSymbols.info, chalk.blue(`Converting ${logo} to PNG...`));
        await svg2(`${logo}.svg`)
            .png()
            .toFile(path.join(outputDirectory, `${logo}.png`));
        console.log(logSymbols.success, chalk.green(`Converted ${logo} to PNG`));
    } catch (error) {
        console.error(logSymbols.error, chalk.red(`Converting ${logo} to PNG failed: ${error}`));
    }
});

try {
    console.log(logSymbols.info, chalk.blue('Converting logo-small to a favicon...'));
    await svg2('logo-small.svg')
        .svg.resize({ width: 64, height: 64 })
        .png()
        .toFile(path.join(outputDirectory, 'favicon.ico'));
    console.log(logSymbols.success, chalk.green('Converted logo-small to a favicon'));
} catch (error) {
    console.error(logSymbols.error, chalk.red(`Converting logo-small to a favicon failed: ${error}`));
}
