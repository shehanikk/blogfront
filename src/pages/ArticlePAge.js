import { useParams} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect (() =>{
        const loadArticleInfo = async () => {
        const response = await axios.get(`/api/articles/${articleId}`);
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);

        }
        loadArticleInfo();
    }, []);

    
    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatesArticle = response.data;
        setArticleInfo(updatesArticle);
    }

    if (!article) {
        // Handle the case when the article is not found
        return <NotFoundPage/>
    }

    const { title, content } = article;

    return (
        <>
            <h1>{title}</h1>
            <div>
                { user 
                ?  <button onClick={addUpvote}>Upvote</button>  
            : <button>Log in first</button>}
            </div>
           
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
            {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {user 
              ? <AddCommentForm
              articleName={articleId}
              onArticleUpdated={updatesArticle => setArticleInfo(updatesArticle)} />
              :<button>Loging to comment</button>
            
            }
            <CommentsList comments={articleInfo.comments}/>
        </>
    );
}

export default ArticlePage;
