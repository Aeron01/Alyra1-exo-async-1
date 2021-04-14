const fsPromises = require('fs/promises')

const main = async () => {
  try {
    const dirDst = await fsPromises.mkdir(process.argv[3])
  } catch (e) {
    console.error(e.message)
  }

  try {
    const dirSrc = await fsPromises.opendir(process.argv[2])
    for await (const elem of dirSrc) {
      await fsPromises.copyFile(`${process.argv[2]}/${elem.name}`, `${process.argv[3]}/${elem.name}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}

main()


//let fileCont2 = await fsPromise.readFile(file2, 'utf-8')
//let fileCont3 = await fsPromise.readFile(file3, 'utf-8')

/*
      const [res1] = await Promises.allSettled([elem.name])


      if (res1.status === 'fulfilled') {
        await fsPromises.writeFile(`${dirSrc} ${elem.name}`, `${fileCont1}`)
        console.log(chalk.blueBright(`./WH40K-DW ${file1} ==> ${dirDst}`))
        console.log(chalk.greenBright('Copy complete !'))
      } else {
        console.error(`${file1}: ${res1.reason}`)
      }*/