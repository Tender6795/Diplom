import * as UserService from "../services/UserService";
import Article from "../models/article";




export const all =async (req,res,next)=>{
  let articles;
  try{
    articles=await Article.find({});
  }catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(articles);
};

export const create=async (req,res,next)=>{
  const articleTmp=req.body;
  let article;
  try{
    articleTmp.pathToPicture=req.file.path;
    article=await Article.create(articleTmp);

  }catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};

export const deleteArticle=async (req,res,next)=>{
  let article;
  try{
    article=await Article.findOneAndRemove({hash: req.params.hash});
  } catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};