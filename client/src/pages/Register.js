import { useContext } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

function Register({ history }) {
    const context = useContext(AuthContext)
    let errors = []

    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    })

    const [addUser, { loading, error: mutationError }] = useMutation(REGISTER_USER, {
        errorPolicy: 'all',
        update(proxy, result) {
            console.log(result.data.register)
            context.login(result.data.register)
            console.log(1)
            window.location.href = window.location.origin
        },
        onError() {
            if (mutationError) {
                errors = mutationError.graphQLErrors[0].extensions.exception.errors
            }
        },
        variables: values,
    })


    function registerUser() {
        addUser().catch(e => console.log(e))
    }
    
    return (
        <Container text style={{marginTop: "150px"}}>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1 style={{marginTop: "40px"}}>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.user}
                    onChange={onChange}>
                </Form.Input>
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}>
                </Form.Input>
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}>
                </Form.Input>
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}>
                </Form.Input>
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username token
        }
    }
`

export default Register