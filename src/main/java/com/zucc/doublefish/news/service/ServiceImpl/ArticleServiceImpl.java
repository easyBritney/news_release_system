package com.zucc.doublefish.news.service.ServiceImpl;

import com.zucc.doublefish.news.dao.ArticleDao;
import com.zucc.doublefish.news.pojo.Article;
import com.zucc.doublefish.news.pojo.ArticleModify;
import com.zucc.doublefish.news.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleDao articleDao;

    public List<Article> findAllArticles(){
        return this.articleDao.findAllArticles();
    }
    public List<Article> findAllArticlesByUserid(int uid){
        return this.articleDao.findAllArticlesByUserid(uid);
    }
    public List<Article> findAllArticlesByColumnid(int cid){
        return this.articleDao.findAllArticlesByColumnid(cid);
    }


    public List<Article> findAllArticlesPublished() {
        List<Article> list=articleDao.findArticlesExceptState("saved");
        for(int i=0;i<list.size();i++){
            if(list.get(i).getState().equals("returned")||list.get(i).getState().equals("deleted")){
                list.remove(i);
                i--;
            }
        }
        return list;
    }

    public List<Article> findArticlesWithPictureByColumnid(int cid) {
        return articleDao.findArticlesWithPictureByColumnid(cid);
    }

    @Transactional
    public void insertArticle(Article article){
        this.articleDao.insertArticle(article);
    }
    public Article findArticleByArticleid(int aid){
        return this.articleDao.findArticleByArticleid(aid);
    }

    @Transactional
    public void deleteArticle(int aid){
        this.articleDao.deleteArticle(aid);
    }

    @Transactional
    public void changeArticleStateByArticleid(int aid,String state){
        Article article=this.findArticleByArticleid(aid);
        article.setState(state);
        this.articleDao.changeArticleStateByArticleid(article);
    }

    @Transactional
    public void insertArticleModify(ArticleModify articleModify){
        articleDao.insertArticleModify(articleModify);
    }

    public List<ArticleModify> findAllArticleModifiesByAid(int aid){
        List<ArticleModify> list=articleDao.findAllArticleModifiesByAid(aid);
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(ArticleModify articleModify:list){
            articleModify.setTime(sdf.format(articleModify.getMtime()));
        }
//        new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(articleModify.getMtime())
        return list;
    }

    @Transactional
    public void modifyArticleByArticleid(Article article){
        articleDao.modifyArticleByArticleid(article);
    }
}
