import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// import components
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:40000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Interview Questions:</h1>
                <QuestionList />
                <AddQuestion />
            </div>
        </ApolloProvider>
    );
}

export default App;
