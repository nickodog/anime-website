import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchForm = () => {
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push(`/search/${content}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} /><br />
    </form>
  );
};