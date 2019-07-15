import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestionsQuery } from '../queries/queries';
import QuestionDetails from './QuestionDetails';

class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    displayQuestions() {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading questions...</div>;
        } else {
            return data.questions.map(question => {
                return (
                    <li
                        key={question.id}
                        onClick={e => {
                            console.log(this.state.selected);
                            this.setState({ selected: question.id });
                        }}>
                        {question.question}
                    </li>
                );
            });
        }
    }
    render() {
        return (
            <div>
                <ul id="question-list">{this.displayQuestions()}</ul>
                <QuestionDetails questionId={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getQuestionsQuery)(QuestionList);
