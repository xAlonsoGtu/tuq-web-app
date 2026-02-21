import SingleFileUploader from "../../shared/singleFileUploader";

function MaestroPerfilPage(){
    

    return(
        <div>
            <h1>Perfil</h1>
            <p>Ejemplo subir una imágen.</p>
            <SingleFileUploader/>

            <p>Imagen en el servidor</p>
            <img src="http://localhost:3001/public/file-1770239658096-586564320.png" alt="" width={100} height={100} />
        </div>
    )
}
export default MaestroPerfilPage;