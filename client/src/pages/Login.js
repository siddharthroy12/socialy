import { useContext } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

function Login({ history }) {
    const context = useContext(AuthContext)
    let errors = []

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    const [loginUser, { loading, error: mutationError }] = useMutation(LOGIN_USER, {
        errorPolicy: 'all',
        update(proxy, result) {
            context.login(result.data.login)
            window.location.href = window.location.origin
        },
        variables: values,
    })

    if (mutationError) {
        errors = mutationError.graphQLErrors[0].extensions.exception.errors
    }
    

    function loginUserCallback() {
        loginUser().catch(e => console.log(e))
    }

    return (
        <Container text style={{marginTop: "60px"}}>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1 style={{marginTop: "40px"}}>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.user}
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
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(username: $username, password: $password) {
            id email username token
        }
    }
`

export default Login