import { Form, Button } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/client' 
import gql from 'graphql-tag'

function PostForm() {
    
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        errorPolicy: 'all',
        variables: values,
        update(proxy, result) {
            values.body = ''
            window.location.href = window.location.origin
        }
    })

    function createPostCallback() {
        createPost().catch(e => console.log(e))
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom: "20px"}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id body createdAt username
            likes {
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm