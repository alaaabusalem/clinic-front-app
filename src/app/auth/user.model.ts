export class User{
   

    constructor(
        public  name :string,
        public  email :string,
        private token :string,
        public  expired :Date,
        public  role:string,
        public  message :string) { }
       
    GetToken(){
        return this.token;
    }
}