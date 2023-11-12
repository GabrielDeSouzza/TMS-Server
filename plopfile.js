module.exports = function (propTools) {
  propTools.setHelper('camelCase', (name) => camelCaseString(name));
  propTools.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'entityName',
        message: 'entity name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/infra/database/prisma/prismaDTO/{{entityName}}.ts',
        templateFile: 'prop-templates/PrismaDTOTemplate/prismaDTO.template.hbs',
      },
    ],
  });
}

function camelCaseString(inputString) {
  if (inputString === '' || inputString.toLowerCase() === inputString) {
    return inputString;
  }

  const words = inputString.split(/(?=[A-Z])/);

  const camelCaseWords = words.map((word, index) =>
    index === 0
      ? word.toLowerCase()
      : word.charAt(0).toLowerCase() + word.slice(1),
  );

  const camelCaseString = camelCaseWords.join('');

  return camelCaseString;
}
