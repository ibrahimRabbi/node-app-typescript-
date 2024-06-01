
export type Name = {
    first: string,
    middle?: string,
    last: string
}



export type Student = {
    id:string,
    name: Name,
    age: number,
    address: string,
    contactNo: number,
    email: string,
    gender: 'male' | 'female' | 'trans-gender',
    image?: string,
    blood: 'A+' | 'B+' | 'o+' | 'AB+' | 'AB-',
    password: string,
    isDeleted:boolean
}