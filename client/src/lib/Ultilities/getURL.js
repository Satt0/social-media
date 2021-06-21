import api from 'src/lib/API/URL'
export function getImageURL(url){
            const {path}=url
        
        
       return api.img+path
        
}
export function getAvatarImage(url){
    
    if(url?.indexOf('public/')>=0){
     return api.img+url
    }
    return url
}