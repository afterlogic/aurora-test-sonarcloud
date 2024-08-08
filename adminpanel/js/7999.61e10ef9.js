"use strict";(globalThis["webpackChunkadmin_panel_vue_webclient"]=globalThis["webpackChunkadmin_panel_vue_webclient"]||[]).push([[7999],{7999:(e,s,t)=>{t.r(s),t.d(s,{default:()=>re});var o=t(9835),a=t(1957),l=t(6970);const i={class:"full-height full-width"},n={class:"q-pa-lg"},d={class:"row q-mb-md"},r={class:"col text-h5"},E={class:"row q-mb-md"},c={class:"col-2 q-my-sm"},m={class:"col-5"},u={class:"row q-mb-md"},N={class:"col-2 q-my-sm"},h={class:"col-5"},_={class:"row q-mb-md"},b={class:"col-2 q-my-sm"},C={class:"col-5"},T={class:"row q-mb-md"},p={class:"col-2 q-my-sm"},g={class:"col-5"},L={class:"row q-mb-xl"},A=(0,o._)("div",{class:"col-2 q-my-sm"},null,-1),D={class:"col-5"},I={class:"row q-mb-sm"},w=(0,o._)("div",{class:"col-2 q-my-sm"},null,-1),v={class:"col-10"},R={class:"row q-mb-md"},B=(0,o._)("div",{class:"col-2 q-my-sm"},null,-1),P={class:"col-5"},W={class:"row q-mb-sm"},S=(0,o._)("div",{class:"col-2 q-my-sm"},null,-1),q={class:"col-10"},O={class:"row"},f=(0,o._)("div",{class:"col-2 q-my-sm"},null,-1),y={class:"col-5"},Z={class:"q-mt-md text-right"};function U(e,s,t,U,$,F){const M=(0,o.up)("q-input"),k=(0,o.up)("q-btn"),H=(0,o.up)("q-item-label"),V=(0,o.up)("q-card-section"),G=(0,o.up)("q-card"),x=(0,o.up)("q-scroll-area"),Q=(0,o.up)("q-card-actions"),K=(0,o.up)("q-dialog"),j=(0,o.up)("ConfirmDialog"),z=(0,o.up)("q-linear-progress"),J=(0,o.up)("q-inner-loading"),X=(0,o.Q2)("t"),Y=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(x,{class:"full-height full-width"},{default:(0,o.w5)((()=>[(0,o._)("div",n,[(0,o._)("div",d,[(0,o.wy)((0,o._)("div",r,null,512),[[X,"ADMINPANELWEBCLIENT.HEADING_DB_SETTINGS"]])]),(0,o.Wm)(G,{flat:"",bordered:"",class:"card-edit-settings"},{default:(0,o.w5)((()=>[(0,o.Wm)(V,null,{default:(0,o.w5)((()=>[(0,o._)("div",E,[(0,o.wy)((0,o._)("div",c,null,512),[[X,"ADMINPANELWEBCLIENT.LABEL_DB_LOGIN"]]),(0,o._)("div",m,[(0,o.Wm)(M,{outlined:"",dense:"","bg-color":"white","border-radius":"",modelValue:$.dbLogin,"onUpdate:modelValue":s[0]||(s[0]=e=>$.dbLogin=e),onKeyup:(0,a.D2)(F.save,["enter"])},null,8,["modelValue","onKeyup"])])]),(0,o._)("div",u,[(0,o.wy)((0,o._)("div",N,null,512),[[X,"ADMINPANELWEBCLIENT.LABEL_DB_PASSWORD"]]),(0,o._)("div",h,[(0,o.Wm)(M,{outlined:"",dense:"","bg-color":"white",type:"password",autocomplete:"new-password",modelValue:$.dbPassword,"onUpdate:modelValue":s[1]||(s[1]=e=>$.dbPassword=e),onKeyup:(0,a.D2)(F.save,["enter"])},null,8,["modelValue","onKeyup"])])]),(0,o._)("div",_,[(0,o.wy)((0,o._)("div",b,null,512),[[X,"ADMINPANELWEBCLIENT.LABEL_DN_NAME"]]),(0,o._)("div",C,[(0,o.Wm)(M,{outlined:"",dense:"","bg-color":"white",modelValue:$.dbName,"onUpdate:modelValue":s[2]||(s[2]=e=>$.dbName=e),onKeyup:(0,a.D2)(F.save,["enter"])},null,8,["modelValue","onKeyup"])])]),(0,o._)("div",T,[(0,o.wy)((0,o._)("div",p,null,512),[[X,"ADMINPANELWEBCLIENT.LABEL_DB_HOST"]]),(0,o._)("div",g,[(0,o.Wm)(M,{outlined:"",dense:"","bg-color":"white",modelValue:$.dbHost,"onUpdate:modelValue":s[3]||(s[3]=e=>$.dbHost=e),onKeyup:(0,a.D2)(F.save,["enter"])},null,8,["modelValue","onKeyup"])])]),(0,o._)("div",L,[A,(0,o._)("div",D,[(0,o.Wm)(k,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("ADMINPANELWEBCLIENT.BUTTON_DB_TEST_CONNECTION"),onClick:F.testDbConnection},null,8,["label","onClick"])])]),(0,o._)("div",I,[w,(0,o._)("div",v,[(0,o.wy)((0,o.Wm)(H,{caption:""},null,512),[[X,"ADMINPANELWEBCLIENT.HINT_DB_CREATE_TABLES"]])])]),(0,o._)("div",R,[B,(0,o._)("div",P,[$.creatingTables?((0,o.wg)(),(0,o.j4)(k,{key:1,unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("ADMINPANELWEBCLIENT.BUTTON_DB_CREATING_TABLES")},null,8,["label"])):((0,o.wg)(),(0,o.j4)(k,{key:0,unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("ADMINPANELWEBCLIENT.BUTTON_DB_CREATE_TABLES"),onClick:F.askCreateTables},null,8,["label","onClick"]))])]),(0,o._)("div",W,[S,(0,o._)("div",q,[(0,o.wy)((0,o.Wm)(H,{caption:""},null,512),[[X,"ADMINPANELWEBCLIENT.HINT_UPDATE_CONFIG"]])])]),(0,o._)("div",O,[f,(0,o._)("div",y,[(0,o.Wm)(k,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("ADMINPANELWEBCLIENT.BUTTON_UPDATE_CONFIG"),onClick:F.updateConfig},null,8,["label","onClick"])])])])),_:1})])),_:1}),(0,o._)("div",Z,[(0,o.Wm)(k,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("COREWEBCLIENT.ACTION_SAVE"),onClick:F.save},null,8,["label","onClick"])])])])),_:1}),(0,o.Wm)(K,{modelValue:$.showDialog,"onUpdate:modelValue":s[4]||(s[4]=e=>$.showDialog=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(G,null,{default:(0,o.w5)((()=>[(0,o.Wm)(V,null,{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.$t("ADMINPANELWEBCLIENT.INFO_AUTHTOKEN_DB_STORED")),1)])),_:1}),(0,o.Wm)(Q,{align:"right"},{default:(0,o.w5)((()=>[(0,o.wy)((0,o.Wm)(k,{flat:"",label:e.$t("COREWEBCLIENT.ACTION_OK"),color:"primary"},null,8,["label"]),[[Y]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,o.Wm)(j,{ref:"confirmDialog"},null,512),(0,o.Wm)(J,{style:{"justify-content":"flex-start"},showing:$.saving},{default:(0,o.w5)((()=>[(0,o.Wm)(z,{query:""})])),_:1},8,["showing"])])}var $=t(2456),F=t(1088),M=t(1427),k=t(9336),H=t(4409),V=t.n(H),G=t(3517);const x="      ",Q={name:"DbAdminSettingsView",data(){return{dbPassword:x,savedPass:x,dbLogin:"",dbName:"",dbHost:"",saving:!1,showDialog:!1,creatingTables:!1,testingConnection:!1,updatingConfiguration:!1}},components:{ConfirmDialog:G.Z},beforeRouteLeave(e,s,t){this.$root.doBeforeRouteLeave(e,s,t)},mounted(){this.populate()},computed:{storeAuthTokenInDB(){return F.Z.getStoreAuthTokenInDB()}},methods:{hasChanges(){const e=F.Z.getDatabaseSettingsData();return this.dbLogin!==e.dbLogin||this.dbName!==e.dbName||this.dbHost!==e.dbHost||this.dbPassword!==this.savedPass},revertChanges(){this.populate(),this.dbPassword=this.savedPass},populate(){const e=F.Z.getDatabaseSettingsData();this.dbLogin=e.dbLogin,this.dbName=e.dbName,this.dbHost=e.dbHost,this.dbPassword=x},save(e=!1){if(!this.saving){this.saving=!0;const s={DbLogin:this.dbLogin,DbName:this.dbName,DbHost:this.dbHost};x!==this.dbPassword&&(s.DbPassword=this.dbPassword),$.Z.sendRequest({moduleName:"Core",methodName:"UpdateSettings",parameters:s}).then((s=>{this.saving=!1,!0===s?(F.Z.saveDatabaseSetting({dbName:this.dbName,dbLogin:this.dbLogin,dbHost:this.dbHost}),this.savedPass=this.dbPassword,this.storeAuthTokenInDB&&(this.showDialog=!0),!0===e?this.createTables():this.$store.dispatch("tenants/requestTenants"),M.Z.showReport(this.$t("COREWEBCLIENT.REPORT_SETTINGS_UPDATE_SUCCESS"))):M.Z.showError(this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED"))}),(e=>{this.saving=!1,M.Z.showError(k.Z.getTextFromResponse(e,this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED")))}))}},testDbConnection(){if(!this.testingConnection){this.testingConnection=!0;const e={DbLogin:this.dbLogin,DbName:this.dbName,DbHost:this.dbHost};x!==this.dbPassword&&(e.DbPassword=this.dbPassword),$.Z.sendRequest({moduleName:"Core",methodName:"TestDbConnection",parameters:e}).then((e=>{this.testingConnection=!1,!0===e?M.Z.showReport(this.$t("ADMINPANELWEBCLIENT.REPORT_DB_CONNECT_SUCCESSFUL")):M.Z.showError(this.$t("ADMINPANELWEBCLIENT.ERROR_DB_CONNECT_FAILED"))}),(e=>{this.testingConnection=!1,M.Z.showError(k.Z.getTextFromResponse(e,this.$t("ADMINPANELWEBCLIENT.ERROR_DB_CONNECT_FAILED")))}))}},askCreateTables(){this.hasChanges()&&V().isFunction(this?.$refs?.confirmDialog?.openDialog)?this.$refs.confirmDialog.openDialog({title:"",message:this.$t("ADMINPANELWEBCLIENT.CONFIRM_SAVE_CHANGES_BEFORE_CREATE_TABLES"),okHandler:()=>{this.save(!0)}}):this.createTables()},createTables(){if(!this.creatingTables){const e={};this.creatingTables=!0,$.Z.sendRequest({moduleName:"Core",methodName:"CreateTables",parameters:e}).then((e=>{this.creatingTables=!1,!0===e?(this.$store.dispatch("tenants/requestTenants"),M.Z.showReport(this.$t("ADMINPANELWEBCLIENT.REPORT_CREATE_TABLES_SUCCESSFUL"))):M.Z.showError(this.$t("ADMINPANELWEBCLIENT.ERROR_CREATE_TABLES_FAILED"))}),(e=>{this.creatingTables=!1,M.Z.showError(k.Z.getTextFromResponse(e,this.$t("ADMINPANELWEBCLIENT.ERROR_CREATE_TABLES_FAILED")))}))}},updateConfig(){this.updatingConfiguration||(this.updatingConfiguration=!0,$.Z.sendRequest({moduleName:"Core",methodName:"UpdateConfig"}).then((e=>{this.updatingConfiguration=!1,!0===e?M.Z.showReport(this.$t("ADMINPANELWEBCLIENT.REPORT_UPDATE_CONFIG_SUCCESSFUL")):M.Z.showError(this.$t("ADMINPANELWEBCLIENT.ERROR_UPDATE_CONFIG_FAILED"))}),(e=>{this.updatingConfiguration=!1,M.Z.showError(k.Z.getTextFromResponse(e,this.$t("ADMINPANELWEBCLIENT.ERROR_UPDATE_CONFIG_FAILED")))})))}}};var K=t(1639),j=t(6663),z=t(4458),J=t(3190),X=t(6611),Y=t(8879),ee=t(3115),se=t(7743),te=t(1821),oe=t(854),ae=t(8289),le=t(2146),ie=t(9984),ne=t.n(ie);const de=(0,K.Z)(Q,[["render",U]]),re=de;ne()(Q,"components",{QScrollArea:j.Z,QCard:z.Z,QCardSection:J.Z,QInput:X.Z,QBtn:Y.Z,QItemLabel:ee.Z,QDialog:se.Z,QCardActions:te.Z,QInnerLoading:oe.Z,QLinearProgress:ae.Z}),ne()(Q,"directives",{ClosePopup:le.Z})}}]);