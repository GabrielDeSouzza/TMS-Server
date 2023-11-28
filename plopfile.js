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
        templateFile: 'prop-templates/PrismaTemplates/PrismaDTO/prismaDTO.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/DTO/{{entityName}}GraphqlDTO.ts',
        templateFile: 'prop-templates/GraphqlTemplates/GraphqlDTO/graphqlDTO.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.input.ts',
        templateFile: 'prop-templates/GraphqlTemplates/GraphqlEntity/input.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.model.ts',
        templateFile: 'prop-templates/GraphqlTemplates/GraphqlEntity/model.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.module.ts',
        templateFile: 'prop-templates/GraphqlTemplates/GraphqlEntity/module.template.hbs',
      },
      {
        type: 'add',
        path: 'src/infra/graphql/entities/{{entityName}}Graphql/{{entityName}}.resolver.ts',
        templateFile: 'prop-templates/GraphqlTemplates/GraphqlEntity/resolver.template.hbs',
      },
      {
        type: 'add',
        path: 'src/domain/repositories/{{entityName}}.repository.ts',
        templateFile: 'prop-templates/repositoryTemplate/repository.template.hbs',
      },
      {type: 'add',
        path: 'src/infra/database/prisma/services/{{entityName}}.service.ts',
        templateFile: 'prop-templates/PrismaTemplates/PrismaService/prisma-service.hbs'
    }
    ],
  });
}

function camelCaseString(inputString) {
  if (inputString === '') {
    return inputString;
  }

  const words = inputString.split(/(?=[A-Z])/);

  const camelCaseString = words
    .map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('');

  return camelCaseString;
}
