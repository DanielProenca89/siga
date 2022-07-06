
import React, {Component, useEffect, useState} from 'react';
import { Text, Center} from '@mantine/core';
import { getTicket, getUser } from "../../api/schedule";
import { Session } from '../../api/session';







export default class Confirmar extends Component{

    state = {
        usedata:"",
        run:false

    }

vars =async ()=>{
    if(typeof window !== 'undefined') {
        if(getUser().ticket!=null){     
            this.setState({
            usedata:getUser(),
            run:true
            })
    

        }
    }

}


    render(){
 
        !this.state.run?this.vars():null

        return(
        <>
    <Center><div>
    <Text color="white" size = 'xl'>Sua visita foi solicitada e um email foi enviado para</Text>
    <Text align='center' color='#ffffffb3' style={{ textDecoration: 'underline' }}>{this.state.usedata?this.state.usedata.email:null}</Text>
    <p><Text style={{ textAlign: "center" }} size="xl" color="#e9bd6d">Tiket: {getTicket().ticket?getTicket().ticket:null}</Text></p>
    </div></Center>
        </>
    )
}
}