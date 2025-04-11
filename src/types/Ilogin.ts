// definir une interaface pour le typage du message de retour
export default interface Ilogin{
    islogin:boolean,
    token?:string,
    iduser?:number,
    nom?: string,
    email?: string,
    message: string
  }