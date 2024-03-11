import React from "react";
import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const uri = "http://localhost:4000/api";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools:true
});


function App(){
  return (
        <ApolloProvider client={client}>
          <GlobalStyle/>
           <Pages/>
        </ApolloProvider>
    
  );
}

export default App