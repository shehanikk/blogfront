import articles from "./article-content";
//import { Link } from "react-router-dom";
import ArticleList from "../components/ArticlesList";

const ArticlesListPage = () => {
    return (
        <>
        <h1>Articles</h1>
        <ArticleList articles={articles}/>
        </>
    );
}

export default ArticlesListPage;