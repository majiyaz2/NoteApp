import React from "react";
import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";
import { ApolloClient, ApolloProvider,createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const uri = "http://localhost:4000/api";

const httpLink = createHttpLink({uri})
const cache = new InMemoryCache();

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
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