"use strict";(globalThis["webpackChunkadmin_panel_vue_webclient"]=globalThis["webpackChunkadmin_panel_vue_webclient"]||[]).push([[3442],{3442:(a,e,t)=>{t.r(e),t.d(e,{default:()=>s});t(9665);var n=t(4409),o=t.n(n),i=t(3203);const l=a=>{o().isArray(a.oauthConnectorsData)||(a.oauthConnectorsData=[]),a.oauthConnectorsData.push({name:"Gmail",type:"gmail",iconUrl:"static/styles/images/modules/GMailConnector/logo_gmail.png"})},s={moduleName:"GMailConnector",requiredModules:["MailWebclient"],initSubscriptions(a){i.Z.$off("MailWebclient::GetOauthConnectorsData",l),i.Z.$on("MailWebclient::GetOauthConnectorsData",l)}}}}]);