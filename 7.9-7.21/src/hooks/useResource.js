import { useState, useEffect } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchData();
  }, [baseUrl]);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    setResources(resources.map((r) => (r.id === id ? response.data : r)));
  };

  const service = {
    create,
    update,
  };

  return [resources, service];
};
