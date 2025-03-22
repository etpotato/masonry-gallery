import { useSearchParams } from 'react-router';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';
import { StyledForm } from './styles';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    setSearchParams((prev) => ({ ...Object.fromEntries(prev.entries()), query }));
  }

  return (
    <StyledForm
      action="/"
      method="GET"
      encType="application/x-www-form-urlencoded"
      onSubmit={handleSearch}
    >
      <TextInput name="query" defaultValue={query} />
      <Button type="submit">Search</Button>
    </StyledForm>
  );
};
