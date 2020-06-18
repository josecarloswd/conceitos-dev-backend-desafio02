const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likesArr = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  let count = 0;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).send();
  }

  likesArr.map(like => {
    like.id === id
      ? count++
      : count
  });

  const repository = {
    id,
    title,
    url,
    techs,
    likes: count
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  let count = 0;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).send();
  }

  const like = {
    idLike: uuid(),
    id
  };

  likesArr.push(like);

  likesArr.map(like => {
    like.id === id
      ? count++
      : count
  });

  const likes = { likes: count };

  return response.json(likes);
});

module.exports = app;
