import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft, FiAlertOctagon} from 'react-icons/fi'

import api from '../../Services/api'

import './styles.css'

import logoImg from '../../Assets/logo.svg';

export default function NewIncident(){


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');



     async function handleNewIncident(e){
        e.preventDefault(); //previnindo o comportaamento padrao do formulario
    


     const data = {
        title,
        description,
        value,
        };


        try{

            await api.post('incidents',data,{
                headers:
                {
                    Authorization: ongId,
                }
            })

            history.push('/profile'); //movendo o usuario pra rota de profile dps de realizar o registro do caso

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }

    }


    return(
        <div className="new-incident-container">
           
           <div className = "content">

                <section>
                    
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={24} color="#E02041"/> 
                        Voltar para home
                    </Link>

                </section>


                <form onSubmit={handleNewIncident} >

                    <input 
                        placeholder= "Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />


                    <button className="button" type = "submit"> CADASTRAR</button>

                </form>


            </div>

        </div>
    );
}