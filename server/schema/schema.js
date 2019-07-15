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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Question.findById(args.id);
            }
        },
        area: {
            type: AreaType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Area.findById(args.id);
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find();
            }
        },
        areas: {
            type: new GraphQLList(AreaType),
            resolve(parent, args) {
                return Area.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArea: {
            type: AreaType,
            args: {
                areaName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let area = new Area({
                    name: args.name
                });
                return area.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                question: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                areaId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let question = new Question({
                    question: args.question,
                    description: args.description,
                    areaId: args.areaId
                });
                return question.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
