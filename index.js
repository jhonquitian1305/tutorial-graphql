import { gql, ApolloServer } from "apollo-server";

const persons = [
    {
        name: "Midu",
        phone: "83872881659",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "3d151514-3411-e15c-sacaf-fafsafsfsa"
    },
    {
        name: "Youssef",
        phone: "55578678787687",
        street: "Avenida Fullstack",
        city: "Mataro",
        id: "3d151861-45111-5saf8-551sf-5fsa18fsa"
    },
    {
        name: "Itzi",
        street: "Pasaje Testing",
        city: "Ibiza",
        id: "3d15f4sa-1812-f5e2-f55fsa-affsafsfsa"
    },
]

const typeDefinitions = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person{
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String): Person
    }
`;

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`server ready at ${url}`);
})