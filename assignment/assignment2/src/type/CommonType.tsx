export type StateType = {
    userid:string;
    username:string;
    isLogin:boolean;
}

export type AuthAction = {type:"LOGIN", value:StateType} 
                        | {type:"LOGOUT", value:StateType}

export type AlbumType = {
    "userId":string,
    "id":string,
    "title":string
}

export type PhotoType = {
    "albumId":string,
    "id":string,
    "title":string,
    "url":string,
    "thumbnailUrl":string
}