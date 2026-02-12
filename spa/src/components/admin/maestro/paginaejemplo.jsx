function PaginaEjemplo({parametro, funcion1}){
    const a = "asd";

    function operacionA(){
        b = a + parametro;
        funcion1();
    }
    return (
        <>
        <p>Hola Chayo</p>
        </>
    )
}

export default PaginaEjemplo;