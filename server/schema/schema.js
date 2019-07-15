const graphql = require('graphql');
const Area = require('../models/area');
const Question = require('../models/question');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        description: { type: GraphQLString },
        area: {
            type: AreaType,
            resolve(parent, args) {
                return Area.findById(parent.areaId);
            }
        }
    })
});

const AreaType = new GraphQLObjectType({
    name: 'Area',
    fields: () => ({
        id: { type: GraphQLID },
        areaName: { type: GraphQLString },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({ areaId: parent.id });
            }
        }
    })
});
