import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Image, Card, Label, Container } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import { FETCH_POST_QUERY } from '../utils/graphql'

function Profile({ history }) {
    const { user } = useContext(AuthContext)
    if (!user) {
        history.push('/')
    }
    const { loading, data } = useQuery(FETCH_POST_QUERY)
    const posts = data ? data.getPosts : {}
    return (
       <Container>
           <Grid columns={1}>
            <Grid.Row>
                <Card fluid style={{marginTop: "150px"}}>
                    <Card.Content>
                        <Image
                            floated='left'
                            size='mini'
                            src='/img/user.png'
                        />
                        <Card.Header>{user.username}</Card.Header>
                        <Card.Meta>Joined At {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Card.Meta>
                        <Label>Email: </Label><Label>{user.email}</Label>
                    </Card.Content>
                </Card>
            </Grid.Row>
            <Grid.Row className="page-title">
                <h1>Your Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    posts && posts.map(post => {
                        if (post.username === user.username) {
                            return (
                                <Grid.Column key={post.id} style={{marginBottom: "40px"}}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            )
                        }
                        return null
                    }
                ))}
            </Grid.Row>
        </Grid>
           
       </Container>
    )
}

export default Profile