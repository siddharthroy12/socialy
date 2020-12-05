import { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client'
import { Grid, Image, Card, Button, Icon, Label, Form, Container } from 'semantic-ui-react'
import moment from 'moment'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { AuthContext } from '../context/auth'

function SinglePost(props) {
    const postId = props.match.params.postId
    const { user } = useContext(AuthContext)

    const [comment, setComment] = useState('')

    const  { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment('')
            window.location.reload()
        },
        variables: {
            postId,
            body: comment
        }
    })

    let postMarkup

    function deleteCallback() {
        props.history.push('/')
    }

    function deleteCommentCallback() {
        document.location.reload()
    }

    if (!data) {
        postMarkup = <p>Loading...</p>
    } else {
        const {
            id, body, createdAt, username, comments,
            likes, likeCount, commentCount
        } = data.getPost

        postMarkup = (
            <Container>
            <Grid className="single-post">
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Image
                                    floated='left'
                                    size='mini'
                                    src='/img/user.png'
                                />
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}} />
                                <Button labelPosition='right' as='div'>
                                    <Button color='teal' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='teal' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && <DeleteButton postId={id} callback={deleteCallback}/>}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment..."
                                            name="comment"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}>
                                        </input>
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}>
                                                Submit
                                        </button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                {user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id} callback={deleteCommentCallback} />}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
        )
    }

    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id body createdAt username likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id body createdAt username
            }
            commentCount
        }
    }
`

export default SinglePost