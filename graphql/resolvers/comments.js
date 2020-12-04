const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            const { username }  = checkAuth(context)
            if (body.trim() === ''){
                throw UserInputError('Empty Comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }
            const post = await Post.findById(postId)
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else throw new UserInputError('Post does not exist')
        },
        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id == commentId)
                if (post.comments[commentIndex].username == username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found')
            }

        }
    }
}