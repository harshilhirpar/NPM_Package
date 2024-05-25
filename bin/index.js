// #!/usr/bin/env node
const arg = require('arg')
const chalk = require('chalk')
const fs = require('node:fs')
const path = require('node:path')
const { exec } = require('child_process')

try {
    const args = arg({
        '--configure': Boolean,
        '--start': Boolean,
        '--build': Boolean
    })

    if (args['--configure']) {
        // 1. Creating a Folder
        // 2. Creating a Source Folder
        // 3. Creating a Routes Folder
        // 4. Creating env file
        // 5. NPM init
        // 6. Installing Express, dotenv
        printingMessages('Creating Folder')
        createFolder(args._)
        printingMessages('Creating src Folder')
        createSourceFolder(args._)
        printingMessages('Creating Essential Folders')
        createFoldersInsideSrc(args._)
        printingMessages('Creating ENV File')
        createEnvFile(args._)
        printingMessages('Creating index File')
        createIndexFile(args._)
        printingMessages('creating .gitignore File')
        createGitIgnoreFile(args._)
        printingMessages('Initialize the Project')
        npmInit(args._)
        printingMessages('Installing Express')
        installExpress(args._)
        printingMessages('Installing DotEnv')
        installDotEnv(args._)
    }
    if (args['--start']) {
        console.log(chalk.bgCyanBright('starting the app'))
    }
    if (args['--build']) {
        console.log("Building the APPLICATION")
    }
} catch (error) {
    console.log(chalk.yellow(error.message))
    usage()
}

function usage() {
    console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`)
}

function printingMessages(message) {
    console.log(chalk.yellow(message))
}

function createFolder(folderName) {
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}`
    if (fs.existsSync(folderPath)) {
        console.log("Folder exist")
    } else {
        fs.mkdirSync(folderPath)
    }
}

function createSourceFolder(folderName) {
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}/src`
    fs.mkdirSync(folderPath)
}

function createEnvFile(folderName) {
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}/.env`
    fs.writeFileSync(folderPath, "Your ENV variables")
}

function createIndexFile(folderName){
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}/src/index.js`
    fs.writeFileSync(folderPath, `console.log(""Hello World"")`)
}

function npmInit(folderName){
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}`
    exec('npm init -y', { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

function installExpress(folderName) {
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}`
    exec('npm install express --save-dev', { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })

}

function installDotEnv(folderName){
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}`
    exec('npm install dotenv --save-dev', { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

function createFoldersInsideSrc(folderName){
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}/src`
    // Create Routes
    const RouteFolderPath = parentDir + `/${folderName}/src/routes`
    fs.mkdirSync(RouteFolderPath)
    // Create Controllers
    const ControllersFolderPath = folderPath + '/controllers'
    fs.mkdirSync(ControllersFolderPath)
    // Create DB
    const DBFolderPath = folderPath + '/DB'
    fs.mkdirSync(DBFolderPath)
    // Create Middlewares
    const middlewaresFolderPath = folderPath + '/middleware'
    fs.mkdirSync(middlewaresFolderPath)
    // Utils
    const utilsFolderPath = folderPath + '/utils'
    fs.mkdirSync(utilsFolderPath)
    // Tests
    const testFolderPath = folderPath + '/tests'
    fs.mkdirSync(testFolderPath)
}

function createGitIgnoreFile(folderName) {
    const parentDir = path.resolve(__dirname, '../..')
    const folderPath = parentDir + `/${folderName}/.gitignore`
    fs.writeFileSync(folderPath, `.gitignore`)
}