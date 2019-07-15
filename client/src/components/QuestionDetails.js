import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestionQuery } from '../queries/queries';

class QuestionDetails extends Component {
    displayQuestionDetails() {
        console.log(this.props.data);
        const { question } = this.props.data;
        if (question) {
            console.log(question);
            return (
                <div>
                    <h2>{question.question}</h2>
                    <p>{question.description}</p>
                    <p>{question.area.areaName}</p>
                    <p>All questions in this area:</p>
                    <ul className="other-books">
                        {question.area.questions.map(question => {
                            return <li key={question.id}>{question.question}</li>;
                        })}
                    </ul>
                </div>
            );
        } else {
            return <div>No question selected</div>;
        }
    }
    render() {
        return (
            <div id="question-details">
                <p>Output question details here</p>
                {this.displayQuestionDetails()}
            </div>
        );
    }
}

export default graphql(getQuestionQuery, {
    options: props => {
        return {
            variables: {
                id: props.questionId
            }
        };
    }
})(QuestionDetails);
