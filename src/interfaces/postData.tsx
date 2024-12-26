export type PostData={
    _id:string,
    body:string,
    image?:string,
    
    user:UserType,
    createdAt: string,
    comments:CommentType[]

}
export type UserType=
    {
        _id: string, 
        name: string,
        photo?:string
    }

export type CommentType={
commentCreator:UserType 
content: string,
createdAt: string,
post:string,
_id:string ,

    }
export type SignUpData={
        name: string,
        email:string,
        password:string,
        rePassword:string,
        dateOfBirth:string,
        gender:string
    }
export type UserDataInfo={
    
createdAt:string, 

dateOfBirth:string
email:string,
gender:string
name:string,
photo:string,
_id:string
}