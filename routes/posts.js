import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll,getById,getMyPosts,deletePost,updatePost,getPostComments} from "../controllers/posts.js";
const router = new Router();

//создание поста
router.post('/',checkAuth, createPost)
//получить все посты
router.get('/', getAll)
//получить пост по ид
router.get('/:id', getById)

//get my posts
router.get('/user/me',checkAuth, getMyPosts)
//delete
router.delete('/:id',checkAuth, deletePost)
//update post 
router.put('/:id',checkAuth, updatePost)

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router;
