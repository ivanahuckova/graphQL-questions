import { gql } from 'apollo-boost';

const getQuestionsQuery = gql`
    {
        questions {
            question
            description
            area
            id
        }
    }
`;

const getAreasQuery = gql`
    {
        areas {
            area
            id
        }
    }
`;

const addQuestionMutation = gql`
    mutation($question: String!, $description: String!, $areaId: ID!) {
        addQuestion(question: $question, description: $description, areaId: $areaId) {
            question
            description
            area
            id
        }
    }
`;

export { getQuestionsQuery, getAreasQuery, addQuestionMutation };
