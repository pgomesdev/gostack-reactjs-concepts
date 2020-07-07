import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories');

      setProjects(data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'rocketseat-meetapp-web',
      url: 'https://github.com/pgomesdev/rocketseat-meetapp-server',
      techs: ['NodeJS', 'Nodemon', 'ExpressJS'],
    };

    const { data } = await api.post('repositories', repository);

    setProjects([...projects, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setProjects([...projects.filter((project) => project.id !== id)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
