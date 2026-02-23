import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Details from "./pages/Details";
import Watch from "./pages/Watch";
import Search from "./pages/Search";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movies" component={Movies} />
      <Route path="/tv" component={TvShows} />
      <Route path="/search" component={Search} />
      
      {/* Wrap Details in a wrapper to pass the type prop */}
      <Route path="/movie/:id">
        {() => <Details type="movie" />}
      </Route>
      <Route path="/tv/:id">
        {() => <Details type="tv" />}
      </Route>
      
      {/* Player Route */}
      <Route path="/watch/:type/:id" component={Watch} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
