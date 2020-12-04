import React, { useContext } from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

function PostCard({post: { body, createdAt, username, id, likeCount, commentCount, likes }}) {
    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                    floated='left'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
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
                {user && user.username === username && (
                    <Button as='div' color='red' onClick={e => console.log('Delete Post')} floated="right">
                        <Icon name="trash" style={{margin: 0}}/>
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard