import React, { useContext } from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function PostCard({post: { body, createdAt, username, id, likeCount, commentCount, likes }}) {
    const { user } = useContext(AuthContext)

    function deleteCallback() {
        window.location.href = window.location.origin
    }

    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                    floated='left'
                    size='mini'
                    src='/img/user.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{id, likes, likeCount}} user={user}/>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='teal' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} callback={deleteCallback} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard