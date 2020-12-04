import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Container } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POST_QUERY } from '../utils/graphql'

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POST_QUERY)
    const posts = data ? data.getPosts : {}
    return (
        <Container text style={{marginTop: "60px"}}>
        <Grid columns={1}>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: "40px"}}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
        </Container>
    )
}

export default Home