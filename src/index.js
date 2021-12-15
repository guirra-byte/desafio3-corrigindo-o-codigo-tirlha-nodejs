const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories
  .push(repository)
  
  return response
  .status(201)
  .json(repositories)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response
    .status(404)
    .json({ error: "Mensagem de erro" });
  }

  if(title){
    repository.title = title
  }
  if(url){
    repository.url = url
  }
  if(techs){
    repository.techs = techs
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response
    .status(404)
    .json({ error: "Mensagem de erro" });
  }

  repositories.splice(repositoryIndex, 1);

  return response
  .status(204)
  .send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response
    .status(404)
    .json({ error: "Repository not found" });
  }

 
  const repository = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  }

  const likes = repository.likes++

  return response
  .json(likes);
});

module.exports = app;

