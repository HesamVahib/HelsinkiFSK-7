import { useField } from '../hooks/useField';
import { useResource } from '../hooks/useResource';

const Form = () => {
  const [users, userService] = useResource('http://localhost:3005/users');

  const { reset: resetName, ...name } = useField('text');
  const { reset: resetNumber, ...number } = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...name} />
      <input {...number} />
      <button>create</button>
    </form>
  );
};

export default Form;
