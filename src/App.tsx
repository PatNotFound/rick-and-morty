import { ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharactersPage from './components/charactersPage';

const queryClient = new QueryClient();

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <CharactersPage />
    </QueryClientProvider>
  );
}

export default App;
