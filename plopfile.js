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
        path: 'src/infra/database/prisma/services/prismaDTO/{{entityName}}PrismaDto.ts',
        templateFile: 'prop-templates/PrismaDTOTemplates/prismaDTO.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/DTO/{{entityName}}.ts',
        templateFile: 'prop-templates/graphqlDTOTemplate/graphqlDTO.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.input.ts',
        templateFile: 'prop-templates/graphqlTemplates/input.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.model.ts',
        templateFile: 'prop-templates/graphqlTemplates/model.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.module.ts',
        templateFile: 'prop-templates/graphqlTemplates/module.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.resolver.ts',
        templateFile: 'prop-templates/graphqlTemplates/resolver.template.hbs',
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
