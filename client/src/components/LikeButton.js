import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

function LikeButton({ post: { id, likeCount, likes}, user }) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='red'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='red' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button color='red' basic as={Link} to='/login'>
                <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
                <Label basic color='red' pointing='left'>
                    {likeCount}
                </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likeCount
        }
    }
`

export default LikeButton