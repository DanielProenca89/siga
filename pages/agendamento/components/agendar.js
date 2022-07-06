import React, {Component, useEffect, useState} from 'react';
import {Modal,Container, Grid, Select, Text, Button,  Skeleton, LoadingOverlay,TextInput, NumberInput, Center} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import 'dayjs/locale/pt-br';

import { setTicket ,getTicket, getUser, setUser } from "../../api/schedule";
import { isAuthenticated } from "../../api/auth";
import { apiAgendar,apiMail } from "../../api/api";
//import {sendmail} from "../../api/mail"




export default class Agendar extends Component{

    
   
            
    state = {
        setor: "",
        data: "",
        hora: "",
        error: "",
        usedata:"",
        run: false,      
        loading:false
      };
    
      vars = async ()=>{
        
        if(typeof window !== 'undefined') {       
        const usedata = await getUser();        
        if(typeof window !== 'undefined') {
        if(usedata !== null){
            this.setState({
            usedata:usedata,
            run:true
        })
        
    }
    }
}
}


    handleAgendar = async e => {
        e.preventDefault();
        this.setState({loading:true});

        const { setor, data, hora, id, usedata} = this.state;
        
      try {
        
        
          const response = await apiAgendar.post(`http://localhost:8080/api/agendar`,{data, hora ,setor ,id:usedata.id});
          console.log(this.state)

          if(response.data[0].data){
            setTicket(response.data[0].data);
            this.setState({ticket:getTicket().ticket});
            const user = this.state.usedata;
            user.ticket = this.state.ticket;
            this.setState({usedata:user});
            setUser(this.state.usedata);
          
            const mailres = await apiMail.post(`http://localhost:8080/api/email`,{email:this.state.usedata.email, nome:this.state.usedata.nome, ticket:getTicket().ticket});
            console.log(mailres)
           
            
            

            
           
            
            
            
                this.setState({loading:false});
        


            
            
        }else{
            
            this.setState({
            error:
              "Algo deu errado."
          });
          }
                    
        } catch (err) {
        console.log(err)
            this.setState({
            error:
              "Algo deu errado."
          });
        }
      
    };
 




    render(){
    
        //this.Setloading(false)
        !this.state.run?this.vars():null
        //this.loading = this.state.loading

        return(

<>
    <Text
              style={{ lineHeight: 1, fontFamily: 'Greycliff CF, sans-serif', textAlign: 'center', fontSize: '3vh', fontWeight: 'bold' }}

              class='logo'>
                  Solicite a sua visita
              </Text><Container style={{ display: "flex", flexGrow: "inherit", maxWidth: "70vh", maxHeight: "100vh" }}>


                  <LoadingOverlay visible={this.state.loading} />


                  <form onSubmit={this.handleAgendar} style={{
                      backgroundColor: "#F0F3F5",
                      padding: "20px 30px",
                      borderRadius: "10px"
                  }}
                  >
                      <Grid columns={1} style={{ textAlign: "center" }}>
                          <Grid.Col span={1}>
                              <Skeleton visible={this.state.loading}>

                                  <Select data={[{value:1,label:"Almoxarifado"},{value:2,label:"Fábrica"}]}
                                      placeholder="Setor"
                                      size='md'
                                      label="Setor"
                                      align='center'
                                      onChange={e => this.setState({ setor: e })}
                                     >
                                        </Select>
                              </Skeleton>
                          </Grid.Col>
                          <Grid.Col span={1}>
                              <Skeleton visible={this.state.loading}>

                                  <DatePicker
                                      locale="pt-br"
                                   
                                      label="Data"
                                      size="md"
                                      align='center'
                                      onChange={e => this.setState({ data: Date.parse(e, "yyyy-mm-dd") })}
                                      required
                                       />
                 <TimeInput

                                      label="Hora da visita"
                                      //icon={<Clock size={16} />}
                                      required
                                      align='center'
                                      onChange={e => this.setState({hora: Date.parse(e, "hh:mm:ss")})}
                                      size='md'
                />
                                              </Skeleton>
                          </Grid.Col>
                          <Grid.Col span={1}>
                              <Skeleton visible={this.state.loading}>
                              <Button type='submit'  variant="gradient" gradient={{ from: 'red', to: 'orange', deg: 60 }} size="lg" mt="lg">
                            Agendar
                        </Button>
                              </Skeleton>
                          </Grid.Col>
                      </Grid>
                  </form>
              </Container></>
    )
}
}    
                

