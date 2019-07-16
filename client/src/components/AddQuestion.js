import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAreasQuery, addQuestionMutation, getQuestionsQuery } from '../queries/queries';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            description: '',
            areaId: ''
        };
    }
    displayAreas = () => {
        let data = this.props.getAreasQuery;
        if (data.loading) {
            return <option disabled>Loading areas...</option>;
        } else {
            return data.areas.map(area => {
                return (
                    <option key={area.id} value={area.id}>
                        {area.areaName}
                    </option>
                );
            });
        }
    };

    submitForm = e => {
        e.preventDefault();
        this.props.addQuestionMutation({
            variables: {
                question: this.state.question,
                description: this.state.description,
                areaId: this.state.areaId
            },
            refetchQueries: [{ query: getQuestionsQuery }]
        });
    };

    render() {
        return (
            <div>
                <form id="add-book" onSubmit={e => this.submitForm(e)}>
                    <div className="field">
                        <label>Question:</label>
                        <input type="text" onChange={e => this.setState({ question: e.target.value })} />
                    </div>

                    <div className="field">
                        <label>Description:</label>
                        <input type="text" onChange={e => this.setState({ description: e.target.value })} />
                    </div>

                    <div className="field">
                        <label>Area:</label>
                        <select onChange={e => this.setState({ areaId: e.target.value })}>
                            <option>Select area</option>
                            {this.displayAreas()}
                        </select>
                    </div>

                    <button>+</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAreasQuery, { name: 'getAreasQuery' }),
    graphql(addQuestionMutation, { name: 'addQuestionMutation' })
)(AddQuestion);
