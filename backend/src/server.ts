import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { categoryRoutes } from "infrastructure/web/routes/category-routes";



const server: FastifyInstance = fastify({
    logger: {
        transport:{
            target: "pino-pretty"
        }
    }
});

/**
 * Regista o plugin de CORS (Cross-Origin Resource Sharing)
 * para permitir que o seu front-end (em outro domínio) possa aceder à API.
*/
server.register(cors, {
    origin: "*"
});

/**
 * Regista o plugin do Swagger para gerar a especificação OpenAPI
 * a partir dos esquemas definidos nas suas rotas.
*/
server.register(swagger, {
    openapi: {
        info: {
            title: "Flashcards API",
            description: "API para aplicação de flashcards",
            version: "1.0.0"
        }
    }
});

/**
 * Regista o plugin do Swagger UI para criar uma página web interativa
 * com a documentação da sua API.
*/
server.register(swaggerUI, {
    routePrefix: "/documentation",
    uiConfig: {
        docExpansion: "list",
        deepLinking: false
    }
});


server.register(categoryRoutes, { prefix: "/categories" });
server.register(categoryRoutes, { prefix: "/categories/:id" });

/**
 * Inicia o servidor para ouvir por requisições na porta especificada.
 * Usamos variáveis de ambiente para a porta, ou um valor padrão.
*/
const start = async () => {
    try {
        await server.ready();
        await server.listen({
            port: Number(process.env.PORt) || 3000,
            host: "0.0.0.0" 
        });
        server.log.info("Server is ready and documentation is available at http://localhost:3000/documentation");
    } catch(err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();