// Endpoint geral 

// nome do type que vai ser exportada
import swaggerJSDoc from "swagger-jsdoc";
/* Obrigatorio: title e version. Ex:

    definition: {
        openapi: "3.0.0",
        info:{
            title: "All-clinic",
            version: "1.0.0",
        }
    }
*/

const option: swaggerJSDoc.Options = {
    definition: 
    {
        openapi: "3.0.0",
        info:{
            title: "All-clinic",
            version: "1.0.0",
            description: "Documentação da api das rotas do projeto"
        },

        servers:[
            {
                url: "http://localhost:3000",
                description: "Local"
            } //Mais servidores a partir daqui. Ex: produção e homologação
        ],

        paths:{
        //Todos os endpoints entram aqui, com seus respectivos métodos
            "/api/v1/pacientes": {
                get:{
                    summary: "Resgatar dados do paciente",
                    description: "Endpoint para buscar os dados dos pacientes registrados no banco",
                    tags:["teste"],
                    responses:{
                        200: {
                            description: "Estatisticas recuperadas com sucesso",
                            content: {
                                "aplication/json":{
                                    schema:{
                                        type: "object",
                                        properties:{
                                            nome:{type:"string", example:"Rogerio"},
                                            cpf:{type:"string", example:"11100011122"},
                                            telefone:{type:"string", example:"1122223333"}
                                        }
                                    }
                                }
                            }
                        },
                        400:{

                        },
                        401:{

                        }
                    },
                },
                post:{
                    summary: "Subir dados do paciente",
                    description: "Teste"
                }
            }

        }
    },
    apis:[], //pesquisar melhor
};

export const swaggerSpec = swaggerJSDoc(option);