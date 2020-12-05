import { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'

function DeleteButton(props) {

    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = props.commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrComment] = useMutation(mutation, {
        variables: {
            postId: props.postId,
            commentId: props.commentId
        },
        update() {
            setConfirmOpen(false)
            if (props.callback) {
                props.callback()
            }
        }
    })

    return (
        <>
        <Button as='div' color='red' onClick={e => setConfirmOpen(true)} floated="right">
            <Icon name="trash" style={{margin: 0}}/>
        </Button>
        <Confirm
                open={confirmOpen}
                onCancel={e => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}>
        </Confirm>
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton