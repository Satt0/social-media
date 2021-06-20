import api from 'src/lib/API/URL'
export function getImageURL(url){
            const {path}=url
        
        
       return api.dev+(path.substring(path.indexOf('public/')+6));
        
}