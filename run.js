// dependencias
const fs = require('fs');
const prompts = require('prompts');
const colors = require('colors/safe');

// helpers
const SimpleParse = (longName) => longName.slice(0, 8);

function logSuccessFile(file) {
  console.log(colors.green(`✅ ${file} => ${SimpleParse(file)}.txt`))
}

// --- functions --- //
function simpleRename(folder, files) {
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fs.rename(`${folder}/${file}`, `${folder}/${SimpleParse(file)}.txt`, (err) => {
      if(err) console.log(colors.red('⚠   hubo un error al renombrar los archivos'))
    })
    logSuccessFile(file);

  }
  // SUCCESS
  console.log(colors.green(`✅ Se renombraron ${files.length} archivos`));
}


// runtime
(async () => {
  const res1 = await prompts({
    type: 'text',
    name: 'folderPath',
    message: 'cuál es la dirección de la carpeta con archivos que desea renombrar?'
  });

  fs.readdir(res1.folderPath, (err, files) => {
    if(err) console.log(colors.red('⚠   hubo un error al encontrar la carpeta, vaide la ruta'))
    else {

      // mensaje de files encontrados
      console.log(colors.green(`✅ Se econtraron ${files.length} archivos`));

      // select de cambio a aplicar
      (async () => {
        const res2 = await prompts({
          type: 'select',
          name: 'function',
          message: 'Elija la función que desea aplicar',
          choices: [
            { title: 'Elimiar todo despues de los primeros 8 caracteres', value: 'simple' },
          ],
        });
       
        // funcinones if
        if(res2.function === 'simple') {
          simpleRename(res1.folderPath, files)
        }

      })();

      
    }
  });
  
})();