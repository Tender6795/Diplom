import express from 'express';
import * as ArticleController from '../controllers/article';
import imageUpload from '../middlewares/imageUpload';
import isAdmin from '../middlewares/isAdmin'

const router = express.Router();

router.get('/article', ArticleController.all)
  .post('/article/create', isAdmin,imageUpload.single('photo'), ArticleController.create)
    .delete('/article/:hash', isAdmin, ArticleController.deleteArticle);
export default router;