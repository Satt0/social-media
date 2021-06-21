import api from 'src/lib/API/URL'
export function getImageURL(url){
            const {path}=url
        
        
       return api.img+(path.substring(path.indexOf('public/')+6));
        
}
export function getAvatarImage(url){
    
    if(url?.indexOf('public/')>=0){
     return api.img+(url.substring(url.indexOf('public/')+6));
    }
    return url
}