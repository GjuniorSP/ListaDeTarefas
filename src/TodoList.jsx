import React, {useState, useEffect} from "react";
import './TodoList.css';
import Icone from './assets/icon.webp'
function TodoList(){

    const listaStorage = localStorage.getItem('Lista');
    const [lista,setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");
    //const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
    const monName = new Array ("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12")
    const hourDay = new Array ("00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23")
    const minuteDay = new Array ("00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59")
    var now = new Date
   
    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if (!novoItem){
            return;
        }
        var datA = ('. (( ' +  now.getDate ()  + "/" + monName [now.getMonth() ]   +  "/"  +     now.getFullYear () + ' - ' + hourDay[now.getHours()] + ":" + minuteDay[now.getMinutes()] + 'h ))')
        setLista([...lista, { text: novoItem, isCompleted: false, data: datA}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou (index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta (index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo (){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id="input-entrada" type="text" value={novoItem} onChange={(e)=>{setNovoItem(e.target.value)}} placeholder="Adicione uma tarefa"/>
                <button className="add" type="submit">Add</button>
            </form>
            <div className="ListaTarefas">
                <div style={{textAlign: 'center'}}>
                {
                    lista.length < 1
                    ?
                    <img className="icone-central" src={Icone}/>
                    :
                    lista.map((item, index)=>(
                    <div key={index} className={item.isCompleted ? "item completo" : "item"}> 
                        <span onClick={() => {clicou(index) }}>{item.text + item.data}</span>
                        <button onClick={() => { deleta(index) }} className="del">Deletar</button>
                    </div>
                    ))
                    
                }
                {
                    lista.length > 0 && 
                    <button onClick={() => { deletaTudo() }} className="deleteAll">Deletar todas</button>

                }
                </div>
            </div>
        </div>
    )

}

export default TodoList

//https://www.youtube.com/watch?v=vcCKywPfQGs