export const getJwt =()=>{
    return localStorage.getItem("SolrMAt");
}
export const getUserToken=()=>{
    return localStorage.getItem("SolrMUt");
}
export const Url ="http://localhost:56482/api";