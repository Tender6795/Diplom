import Comment from '../models/comment';
import Article from "../models/article";
import *as UserService from '../services/UserService';

export const create = async (req, res, next) => {
  const commentTmp = req.body;
  const token = req.headers['authorization'];
  let article = '';
  try {
    const userTmp = await UserService.getUserByToken(token);
    commentTmp.author = userTmp.nickName;
    let comment = await Comment.create(commentTmp);
    let articleTmp = await Article.findOne({hash: req.params.hash});
    articleTmp.comments.push(comment);
    article = await Article.findOneAndUpdate({hash: req.params.hash}, articleTmp);
    await Comment.findOneAndDelete({hash: comment.hash});//Костыль
  } catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};
//deleteComment

export const deleteComment = async (req, res, next) => {
  let articleTmp;
  try {
    articleTmp = await Article.findOne({hash: req.params.hashArticle});
  } catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  //console.dir(articleTmp);


  res.json(articleTmp);
};
