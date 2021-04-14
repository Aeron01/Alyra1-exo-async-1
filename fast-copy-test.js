const chalk = require('chalk');
const fsPromise = require('fs/promises')

if (process.argv.length !== 8) {
  console.log(chalk.red('Usage: node fast-copy.js src.txt dst.txt'))
  process.exit(1)
}


/*
if (!fs.existsSync(process.argv[2])) {
  console.log(chalk.red(`Error: ${process.argv[2]} does not exist`))
  process.exit(1)
}

const stats = fs.statSync(process.argv[2])
if (!stats.isFile()) {
  console.log(chalk.red(`Error: ${process.argv[2]} is not a file`))
  process.exit(1)
}
*/


/*
const ReadFiles = async (task) => {
  try {
    let fileCont = await fsPromise.readFile(task, 'utf-8')
    console.log(fileCont)
    //return fileCont
  } catch (e) {
    throw e
  }
}

let chekfileE = fs.existsSync(process.argv[3])
if (chekfileE === true) {
  if (readlineSync.keyInYN(`The file ${process.argv[3]} exist. Overwrite it ? `)) {
    
  } else {
    console.log(chalk.cyanBright('Program interupted by user.'))
    process.exit(1)
  }
}
*/

const main = async () => {
  try {
    const file1 = process.argv[2]
    const file2 = process.argv[3]
    const file3 = process.argv[4]


    let fileCont1 = await fsPromise.readFile(file1, 'utf-8')
    let fileCont2 = await fsPromise.readFile(file2, 'utf-8')
    let fileCont3 = await fsPromise.readFile(file3, 'utf-8')


    const [res1, res2, res3] = await Promise.allSettled([file1, file2, file3])


    if (res1.status === 'fulfilled') {
      await fsPromise.writeFile(`${process.argv[5]}`, `${fileCont1}`)
      console.log(chalk.blueBright(`${file1} ==> ${process.argv[5]}`))
      console.log(chalk.greenBright('Copy complete !'))
    } else {
      console.error(`${file1}: ${res1.reason}`)
    }
    if (res2.status === 'fulfilled') {
      await fsPromise.writeFile(`${process.argv[6]}`, `${fileCont2}`)
      console.log(chalk.blueBright(`${file2} ==> ${process.argv[6]}`))
      console.log(chalk.greenBright('Copy complete !'))
    } else {
      console.error(`${file2}: ${res2.reason}`)
    }
    if (res3.status === 'fulfilled') {
      await fsPromise.writeFile(`${process.argv[7]}`, `${fileCont3}`)
      console.log(chalk.blueBright(`${file3} ==> ${process.argv[7]}`))
      console.log(chalk.greenBright('Copy complete !'))
    } else {
      console.error(`${file3}: ${res3.reason}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}
main()