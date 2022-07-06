import React, {Component} from 'react';
import { useState, useEffect } from 'react';

//import {  Link ,withRouter } from "react-router-dom";

import Link from 'next/link'
import Router from 'next/router'

import { useForm } from '@mantine/form';
import { LoadingOverlay, TextInput, Text, Button, Box, PasswordInput, Center, MantineProvider } from '@mantine/core';

import {apiGetUser, apiLogin} from '../api/api';
import {isAuthenticated, login} from '../api/auth';
import { setUser } from '../api/schedule';


class SignIn extends Component {

        
        state = {
          email: "",
          password: "",
          error: "",
          visible: false,
          loading:false
        };
      

        

        handleSignIn = async e => {
            e.preventDefault();
            
            this.setState({
                loading:true
                  
              });

            const { email, password, visible } = this.state;
            

          if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
          } else {
          
            try {
              const response = await apiLogin.post(`http://localhost:8080/api/login`,{email, password});
            
              console.log(response.data);
              
              if(JSON.parse(response.data[0].data).key !==null){
                const token =  JSON.parse(response.data[0].data).key 
                const data = await apiGetUser.post(`http://localhost:8080/api/client`,{token});
                login(token);
                setUser(data.data[0]);
                this.setState({
                  loading:false
                })
                if(isAuthenticated){   
                  Router.push('/agendamento')
          }else{

              this.setState({
                  loading:false,
                });

                  this.setState({
                    error: "Usuario ou senha incorretos"
                    
                });
  
         
              
          }
  
              }else{

              this.setState({
                  loading:false,
                });
                
                  this.setState({
                    error: "Usuario ou senha incorretos"
                    
                });
  
         
  
    
              }

          
              
          
          
            } catch (err) {
            console.log(err)
            this.setState({
                loading:false,
              });
              
                this.setState({
                error: "Algo deu errado. Atualize e tente nvamente"
                  
              });

            }
          }
        };

render(){

    return (


        <MantineProvider theme={{ colorScheme: 'light' }}>
         

            <Text
                style={{ lineHeight: 1, fontFamily: 'Greycliff CF, sans-serif', textAlign: 'center', fontSize: '100px', fontWeight: 'bold' }}
                mt={100}
                class='logo'>
                SIGA
            </Text>
            <p style={{ lineHeight: 1, fontFamily: 'Greycliff CF, sans-serif', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: 'rgba(0,0,0,0.5)' }}>SISITEMA DE GERENCIAMENTO E ACOMPANHAMENTO</p>

            <Box sx={(theme) => ({
                backgroundColor: '#F0F3F5',

                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                maxWidth: 340,
            })} mx="auto">

                <LoadingOverlay visible={this.state.loading} />
                <form onSubmit={this.handleSignIn}>
                    <TextInput
                        required
                        label="Login"
                        placeholder=""
                        onChange={e => this.setState({ email: e.target.value })} />

                    <PasswordInput
                        required
                        label="Senha"
                        placeholder="Senha"
                        mt="sm"
                        onChange={e => this.setState({ password: e.target.value })}/>
                    <Center>
                        <Button type='submit' variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} size="lg" mt="lg">
                            Acessar
                        </Button>

                    </Center>
                    <Center>{this.state.error && <p>{this.state.error}</p>}</Center>
                </form>
                <Center><Link href='/novo'><Text style={{fontSize:'70%', textDecoration:'underline'}}>Não tenho usuário</Text></Link></Center>
              
            </Box>
        </MantineProvider>

    );

        }
    }


    export default SignIn;