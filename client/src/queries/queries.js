import { gql } from 'apollo-boost';

const getQuestionsQuery = gql`
    {
        questions {
            question
            description
            id
        }
    }
`;

const getQuestionQuery = gql`
    query($id: ID) {
        question(id: $id) {
            id
            question
            description
            area {
                areaName
                questions {
                    question
                    id
                }
            }
        }
    }
`;

const getAreasQuery = gql`
    {
        areas {
            areaName
            id
        }
    }
`;

const addQuestionMutation = gql`
    mutation($question: String!, $description: String!, $areaId: ID!) {
        addQuestion(question: $question, description: $description, areaId: $areaId) {
            question
            description
            id
        }
    }
`;

export { getQuestionsQuery, getQuestionQuery, getAreasQuery, addQuestionMutation };
