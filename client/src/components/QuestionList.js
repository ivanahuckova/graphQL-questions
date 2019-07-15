import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestionsQuery } from '../queries/queries';

class QuestionList extends Component {
    displayQuestions() {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading questions...</div>;
        } else {
            return data.questions.map(question => {
                return <li key={question.id}>{question.question}</li>;
            });
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">{this.displayQuestions()}</ul>
            </div>
        );
    }
}

export default graphql(getQuestionsQuery)(QuestionList);
