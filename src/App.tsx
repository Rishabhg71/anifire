import Screen from "./screen/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import RemoteContolsContext from "./context/RemoteControl";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RemoteContolsContext>
        <div className="m-0 p-0">
          <Router />
        </div>
      </RemoteContolsContext>
    </QueryClientProvider>
  );
}

export default App;
