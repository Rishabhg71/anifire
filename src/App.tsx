import Screen from "./screen/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-0 p-0">
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
