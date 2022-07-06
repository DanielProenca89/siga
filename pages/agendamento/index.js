import { useState, useEffect } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {Navigate, useNavigate,Link} from 'react-router-dom'
import Agendar from './components/agendar';
import Confirmar  from './components/confirmar';
import { getTicket, getUser } from '../api/schedule';
import {isAuthenticated, getToken} from '../api/auth';
import { useRouter } from 'next/router'
import {Session} from '../api/session';
function Agendamento(){

    const router = useRouter();
    
    const [active, setActive] = useState(1);
    const nextStep = (number) => setActive(number);
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
   

useEffect(()=>{
    
 
   async ()=>{
        const session =new Session(getToken());    
        await session.set();  
        const res = await session.get()

    if(res.data[0].ticket !== null){

    nextStep(2);
    
    }
   
  }
    
   })

   useEffect(()=>{
    if(typeof window !== 'undefined' && active !=2) {
    
    
    const interval = setInterval(()=>{
      
      if(getTicket()!==null){
        nextStep(2)
      }
        
    },1000)
  }
   },[])

   useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [isAuthenticated])


  return (
    <>
 
  <Stepper active={active} breakpoint='md'>
    <Stepper.Step label="Cadastro"/>
    <Stepper.Step label="Pré-agendamento" >
<Agendar ></Agendar>
    </Stepper.Step>

    <Stepper.Step label="Confirmação" loading={active===2?true:false}>
        <Confirmar></Confirmar>
        </Stepper.Step>
    <Stepper.Step label="Integração" />
    <Stepper.Step label="Liberação"/ >
  </Stepper>

    
    </>
  );
  
    

  }


export default Agendamento;