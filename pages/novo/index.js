import React, {Component} from 'react';
import { useState, useEffect } from 'react';

//import {  Link ,withRouter } from "react-router-dom";

import Link from 'next/link'
import Router from 'next/router'

import { useForm } from '@mantine/form';
import { LoadingOverlay, TextInput, Text, Button, Box, PasswordInput, Center, MantineProvider, NumberInput, Modal } from '@mantine/core';

import {apiGetUser, apiLogin} from '../api/api';
import {isAuthenticated, login} from '../api/auth';
import { setUser } from '../api/schedule';
import { ThemeProvider } from '@emotion/react';


class SignUp extends Component {

        
        state = {
          nome:"",
          email:"",
          cpf:"",
          password: "",
          telefone:"",
          error: "",
          visible: false,
          loading:false
        };
      
        
        

        handleSignIn = async e => {
            e.preventDefault();
            
            this.setState({
                loading:true
                  
              });

            const { nome, cpf , password, email,telefone} = this.state;
            console.log(this.state)

          if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
          } else {
          
            try {
              const response = await apiLogin.post(`http://localhost:8080/api/novo`,{nome, cpf, password, email, telefone });
            
              console.log(response.data);
                this.setState({
                opened:true,
                loading:false})
            if(response.data.serverStatus==2){
               this.setState({
                modalmsg:"Usuario criado com sucesso, feche para ser direcionado para o login",
                redirect:Router.push('/')
            })
            }else{
                this.setState({
                    modalmsg:"Algo deu errado. Revise os dados e tente novamente",
                    redirect:()=>false
                })  
            }
                
            }catch (err) {
            console.log(err)
                this.setState({
                error:
                  "Algo deu errado."
              });
            }
          }
        };

render(){

    return (


        <MantineProvider theme={{ colorScheme: 'light' }}>
         
         <Modal
                opened={this.state.opened}
                onClose={()=>this.state.redirect }
               
              >
            <Text>{this.state.modalmsg}</Text>
              </Modal>

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
                        label="Nome"
                        placeholder=""
                        onChange={e => this.setState({ nome: e.target.value })} />

                    <NumberInput
                        required
                        label="CPF"
                        placeholder="CPF"
                        mt="sm"
                        onChange={e => this.setState({ cpf: e })}/>
      
                    <TextInput
                        required
                        label="Email"
                        placeholder="Email"
                        mt="sm"
                        onChange={e => this.setState({ email: e.target.value })}/>
      
      
                    <NumberInput
                        required
                        label="Telefone"
                        placeholder="Telefone"
                        mt="sm"
                        onChange={e => this.setState({ telefone: e })}/>
      
      
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


    export default SignUp;