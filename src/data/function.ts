import constant from "./constant";

const NewNotification=async (libelle:string,message:string,id_user:number,statut:string)=>{

        let data={
            "libelle":libelle,
            "description":message,
            "id_user":id_user,
            "statut":statut,
          }
          try {
            const response = await fetch(`${constant.host}/AlumniDocs-API/NewNotification`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });
            console.log(data);
            if (!response.ok) {
              throw new Error('La réponse du serveur n\'est pas valide.');
            }
            console.log(await response.text());
          } catch (error) {
            console.error('Erreur lors de l\'envoi de la notification ');

          }
}

export default NewNotification;