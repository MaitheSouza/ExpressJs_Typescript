class User {
    constructor(
        private id: number, 
        private name: string, 
        private email: string, 
        private telephone: string
    ){}

    public getId(){
        return this.id;
    }

    public setId(id: number){
        this.id = id;
    }

    public setName(name: string){
        this.name = name;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public setTelephone(telephone: string){
        this.telephone = telephone;
    }
}

export default User;