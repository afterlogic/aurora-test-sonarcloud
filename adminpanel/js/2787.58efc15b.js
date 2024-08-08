"use strict";(globalThis["webpackChunkadmin_panel_vue_webclient"]=globalThis["webpackChunkadmin_panel_vue_webclient"]||[]).push([[2787],{2787:(e,t,s)=>{s.r(t),s.d(t,{default:()=>te});var a=s(9982),n=s(8936),l=s(9835);const i={class:"full-height full-width"},o={class:"q-pa-lg"},r={class:"row q-mb-md"},d={class:"col text-h5"},c={class:"row q-mb-md"},h={class:"col-2 q-mt-sm"},C={class:"col-5"},m={class:"row q-mb-md"},p={class:"col-2 q-mt-sm"},u={class:"col-5"},E={class:"row"},T={class:"col-2 q-mt-sm"},g={class:"col-5"},_={class:"q-pt-md text-right"},I={class:"q-pa-lg"},R={class:"row q-mb-md"},A={class:"col text-h5"},w={class:"row q-mb-sm"},N={class:"col-10"},S={class:"row q-mb-md"},W={class:"col-5"},L={class:"row q-mb-sm"},b={class:"col-10"},P={class:"row"},v={class:"col-5"};function y(e,t,s,a,n,y){const O=(0,l.up)("q-input"),f=(0,l.up)("q-card-section"),q=(0,l.up)("q-card"),B=(0,l.up)("q-btn"),U=(0,l.up)("SystemSettings"),k=(0,l.up)("q-item-label"),Z=(0,l.up)("q-scroll-area"),H=(0,l.up)("q-card-actions"),D=(0,l.up)("q-dialog"),G=(0,l.up)("q-linear-progress"),K=(0,l.up)("q-inner-loading"),x=(0,l.Q2)("t"),$=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.iD)("div",i,[(0,l.Wm)(Z,{class:"full-height full-width"},{default:(0,l.w5)((()=>[(0,l._)("div",o,[(0,l._)("div",r,[(0,l.wy)((0,l._)("div",d,null,512),[[x,"ROCKETCHATWEBCLIENT.HEADING_SETTINGS_TAB"]])]),(0,l.Wm)(q,{flat:"",bordered:"",class:"card-edit-settings"},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l._)("div",c,[(0,l.wy)((0,l._)("div",h,null,512),[[x,"ROCKETCHATWEBCLIENT.ADMIN_CHAT_URL_LABEL"]]),(0,l._)("div",C,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",modelValue:n.chatUrl,"onUpdate:modelValue":t[0]||(t[0]=e=>n.chatUrl=e)},null,8,["modelValue"])])]),(0,l._)("div",m,[(0,l.wy)((0,l._)("div",p,null,512),[[x,"ROCKETCHATWEBCLIENT.ADMIN_USERNAME_LABEL"]]),(0,l._)("div",u,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",modelValue:n.adminUsername,"onUpdate:modelValue":t[1]||(t[1]=e=>n.adminUsername=e)},null,8,["modelValue"])])]),(0,l._)("div",E,[(0,l.wy)((0,l._)("div",T,null,512),[[x,"ROCKETCHATWEBCLIENT.ADMIN_PASSWORD_LABEL"]]),(0,l._)("div",g,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",type:"password",autocomplete:"new-password",modelValue:n.adminPassword,"onUpdate:modelValue":t[2]||(t[2]=e=>n.adminPassword=e)},null,8,["modelValue"])])])])),_:1})])),_:1}),(0,l._)("div",_,[(0,l.Wm)(B,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",label:e.$t("COREWEBCLIENT.ACTION_SAVE"),onClick:y.save},null,8,["label","onClick"])])]),(0,l.Wm)(U,{tenantId:y.tenantId,hasChanges:y.hasChanges,onAttemptToApplyRequiredChanges:y.attemptToApplyRequiredChanges},null,8,["tenantId","hasChanges","onAttemptToApplyRequiredChanges"]),(0,l._)("div",I,[(0,l._)("div",R,[(0,l.wy)((0,l._)("div",A,null,512),[[x,"ROCKETCHATWEBCLIENT.HEADING_APPEARANCE_SETTINGS_TAB"]])]),(0,l.Wm)(q,{flat:"",bordered:"",class:"card-edit-settings"},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l._)("div",w,[(0,l._)("div",N,[(0,l.wy)((0,l.Wm)(k,{caption:""},null,512),[[x,"ROCKETCHATWEBCLIENT.HINT_APPLY_TEXTS"]])])]),(0,l._)("div",S,[(0,l._)("div",W,[(0,l.Wm)(B,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",loading:n.applyTextChangesInProgress,label:e.$t("ROCKETCHATWEBCLIENT.ACTION_APPLY_TEXTS"),onClick:y.applyTextChanges},null,8,["loading","label","onClick"])])]),(0,l._)("div",L,[(0,l._)("div",b,[(0,l.wy)((0,l.Wm)(k,{caption:""},null,512),[[x,"ROCKETCHATWEBCLIENT.HINT_APPLY_CSS"]])])]),(0,l._)("div",P,[(0,l._)("div",v,[(0,l.Wm)(B,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",loading:n.applyCssChangesInProgress,label:e.$t("ROCKETCHATWEBCLIENT.ACTION_APPLY_CSS"),onClick:y.applyCssChanges},null,8,["loading","label","onClick"])])])])),_:1})])),_:1})])])),_:1}),(0,l.Wm)(D,{modelValue:n.showSaveBeforeApplyWarning,"onUpdate:modelValue":t[3]||(t[3]=e=>n.showSaveBeforeApplyWarning=e)},{default:(0,l.w5)((()=>[(0,l.Wm)(q,null,{default:(0,l.w5)((()=>[(0,l.wy)((0,l.Wm)(f,null,null,512),[[x,"ROCKETCHATWEBCLIENT.WARNING_SAVE_BEFORE_APPLY"]]),(0,l.Wm)(H,{align:"right"},{default:(0,l.w5)((()=>[(0,l.wy)((0,l.Wm)(B,{flat:"",label:e.$t("COREWEBCLIENT.ACTION_OK"),color:"primary"},null,8,["label"]),[[$]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,l.Wm)(K,{style:{"justify-content":"flex-start"},showing:n.loading||n.saving},{default:(0,l.w5)((()=>[(0,l.Wm)(G,{query:""})])),_:1},8,["showing"])])}var O=s(9336),f=s(1427),q=s(4089),B=s(2456),U=s(3510);const k="      ",Z={name:"RocketChatAdminSettingPerTenant",components:{SystemSettings:U.Z},data(){return{chatUrl:"",adminUsername:"",adminPassword:k,savedPassword:k,saving:!1,loading:!1,tenant:null,showSaveBeforeApplyWarning:!1,applyTextChangesInProgress:!1,applyCssChangesInProgress:!1}},computed:{tenantId(){return this.$store.getters["tenants/getCurrentTenantId"]}},watch:{"$store.state.tenants.tenants":{handler:function(){this.populate()},deep:!0}},mounted(){this.loading=!1,this.saving=!1,this.populate()},beforeRouteLeave(e,t,s){this.$root.doBeforeRouteLeave(e,t,s)},methods:{hasChanges(){if(this.loading)return!1;const e=q.Z.pObject(this.tenant?.completeData);return this.chatUrl!==e["RocketChatWebclient::ChatUrl"]||this.adminUsername!==e["RocketChatWebclient::AdminUsername"]||this.adminPassword!==this.savedPassword},revertChanges(){this.populate()},populate(){const e=this.$store.getters["tenants/getTenant"](this.tenantId);e&&(void 0!==e.completeData["RocketChatWebclient::ChatUrl"]?(this.tenant=e,this.chatUrl=e.completeData["RocketChatWebclient::ChatUrl"],this.adminUsername=e.completeData["RocketChatWebclient::AdminUsername"],this.adminPassword=k,this.savedPassword=k):this.getSettings())},save(){if(!this.saving){this.saving=!0;const e={ChatUrl:this.chatUrl,AdminUsername:this.adminUsername,TenantId:this.tenantId};k!==this.adminPassword&&(e.AdminPassword=this.adminPassword),B.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"UpdateSettings",parameters:e}).then((t=>{if(this.saving=!1,!0===t){this.savedPassword=this.adminPassword;const t={"RocketChatWebclient::ChatUrl":e.ChatUrl,"RocketChatWebclient::AdminUsername":e.AdminUsername};this.$store.commit("tenants/setTenantCompleteData",{id:this.tenantId,data:t}),f.Z.showReport(this.$t("COREWEBCLIENT.REPORT_SETTINGS_UPDATE_SUCCESS"))}else f.Z.showError(this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED"))}),(e=>{this.saving=!1,f.Z.showError(O.Z.getTextFromResponse(e,this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED")))}))}},getSettings(){if(!this.loading){this.loading=!0;const e={TenantId:this.tenantId};B.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"GetSettings",parameters:e}).then((e=>{if(this.loading=!1,e){const t={"RocketChatWebclient::ChatUrl":q.Z.pString(e.ChatUrl),"RocketChatWebclient::AdminUsername":q.Z.pString(e.AdminUsername)};this.$store.commit("tenants/setTenantCompleteData",{id:this.tenantId,data:t})}}))}},attemptToApplyRequiredChanges(){this.hasChanges()&&(this.showSaveBeforeApplyWarning=!0)},applyTextChanges(){this.applyTextChangesInProgress||(this.hasChanges()?this.showSaveBeforeApplyWarning=!0:(this.applyTextChangesInProgress=!0,B.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"ApplyRocketChatTextChanges",parameters:{TenantId:this.tenantId}}).then((e=>{this.applyTextChangesInProgress=!1,!0===e?f.Z.showReport(this.$t("ROCKETCHATWEBCLIENT.REPORT_APPLY_CONFIGS_SUCCESS")):f.Z.showError(this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS"))}),(e=>{this.applyTextChangesInProgress=!1,f.Z.showError(O.Z.getTextFromResponse(e,this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS")))}))))},applyCssChanges(){this.applyCssChangesInProgress||(this.hasChanges()?this.showSaveBeforeApplyWarning=!0:(this.applyCssChangesInProgress=!0,B.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"ApplyRocketChatCssChanges",parameters:{TenantId:this.tenantId}}).then((e=>{this.applyCssChangesInProgress=!1,!0===e?f.Z.showReport(this.$t("ROCKETCHATWEBCLIENT.REPORT_APPLY_CONFIGS_SUCCESS")):f.Z.showError(this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS"))}),(e=>{this.applyCssChangesInProgress=!1,f.Z.showError(O.Z.getTextFromResponse(e,this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS")))}))))}}};var H=s(1639),D=s(6663),G=s(4458),K=s(3190),x=s(6611),$=s(8879),F=s(3115),Q=s(7743),V=s(1821),Y=s(854),M=s(8289),j=s(2146),X=s(9984),z=s.n(X);const J=(0,H.Z)(Z,[["render",y],["__scopeId","data-v-bb30ac9a"]]),ee=J;z()(Z,"components",{QScrollArea:D.Z,QCard:G.Z,QCardSection:K.Z,QInput:x.Z,QBtn:$.Z,QItemLabel:F.Z,QDialog:Q.Z,QCardActions:V.Z,QInnerLoading:Y.Z,QLinearProgress:M.Z}),z()(Z,"directives",{ClosePopup:j.Z});const te={moduleName:"RocketChatWebclient",requiredModules:[],init(e){a.Z.init(e)},getAdminSystemTabs(){return[{tabName:"chat",tabTitle:"ROCKETCHATWEBCLIENT.ADMIN_SETTINGS_TAB_LABEL",tabRouteChildren:[{path:"chat",component:()=>s.e(8924).then(s.bind(s,8924))}]}]},getAdminTenantTabs(){const e=n["default"].getters["user/isUserSuperAdmin"];return e?[{tabName:"chat",tabTitle:"ROCKETCHATWEBCLIENT.ADMIN_SETTINGS_TAB_LABEL",tabRouteChildren:[{path:"id/:id/chat",component:ee},{path:"search/:search/id/:id/chat",component:ee},{path:"page/:page/id/:id/chat",component:ee},{path:"search/:search/page/:page/id/:id/chat",component:ee}]}]:[]}}},9982:(e,t,s)=>{s.d(t,{Z:()=>r});var a=s(4409),n=s.n(a),l=s(4089);class i{constructor(e){const t=l.Z.pObject(e.RocketChatWebclient);n().isEmpty(t)||(this.chatUrl=t.ChatUrl,this.adminUsername=t.AdminUsername)}saveRocketChatWebclientSettings({chatUrl:e,adminUsername:t,adminPassword:s}){this.chatUrl=e,this.adminUsername=t}}let o=null;const r={init(e){o=new i(e)},saveRocketChatWebclientSettings(e){o.saveRocketChatWebclientSettings(e)},getRocketChatWebclientSettings(){return{chatUrl:o?.chatUrl,adminUsername:o?.adminUsername}}}},3510:(e,t,s)=>{s.d(t,{Z:()=>W});var a=s(9835);const n={class:"q-px-lg q-pb-lg q-pt-none"},l={class:"row q-mb-md"},i={class:"col text-h5"},o={class:"row q-mb-sm"},r={class:"col-10"},d={key:0,class:"row q-mb-sm"},c={class:"col-10"},h={class:"row"},C={class:"col-5"};function m(e,t,s,m,p,u){const E=(0,a.up)("q-item-label"),T=(0,a.up)("q-btn"),g=(0,a.up)("q-card-section"),_=(0,a.up)("q-card"),I=(0,a.Q2)("t");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a._)("div",l,[(0,a.wy)((0,a._)("div",i,null,512),[[I,"ROCKETCHATWEBCLIENT.HEADING_SYSTEM_SETTINGS_TAB"]])]),(0,a.Wm)(_,{flat:"",bordered:"",class:"card-edit-settings"},{default:(0,a.w5)((()=>[(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a._)("div",o,[(0,a._)("div",r,[(0,a.wy)((0,a.Wm)(E,{caption:""},null,512),[[I,"ROCKETCHATWEBCLIENT.HINT_CONFIGS_NEEDED_VALUES"]]),(0,a._)("ul",null,[(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(" Accounts->Registration->Password Reset:"),(0,a.wy)((0,a._)("span",null,null,512),[[I,"ROCKETCHATWEBCLIENT.LABEL_STATE_DISABLED"]])])),_:1})]),(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(' Accounts->Registration->Registration Form: "Disabled" ')])),_:1})]),(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(" General->Restrict access inside any Iframe: "),(0,a.wy)((0,a._)("span",null,null,512),[[I,"ROCKETCHATWEBCLIENT.LABEL_STATE_DISABLED"]])])),_:1})]),(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(" General->Iframe Integration->Enable Send:"),(0,a.wy)((0,a._)("span",null,null,512),[[I,"ROCKETCHATWEBCLIENT.LABEL_STATE_ENABLED"]])])),_:1})]),(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(" General->Iframe Integration->Enable Receive: "),(0,a.wy)((0,a._)("span",null,null,512),[[I,"ROCKETCHATWEBCLIENT.LABEL_STATE_ENABLED"]])])),_:1})]),(0,a._)("li",null,[(0,a.Wm)(E,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)(" Rate Limiter->API Rate Limiter->Enable Rate Limiter: "),(0,a.wy)((0,a._)("span",null,null,512),[[I,"ROCKETCHATWEBCLIENT.LABEL_STATE_DISABLED"]])])),_:1})])])])]),p.configsRequestIsInProgress?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("div",c,[p.configsAreCorrect?(0,a.wy)(((0,a.wg)(),(0,a.j4)(E,{key:0,caption:""},null,512)),[[I,"ROCKETCHATWEBCLIENT.HINT_CONFIGS_CORRECT"]]):(0,a.kq)("",!0),p.configsAreCorrect?(0,a.kq)("",!0):(0,a.wy)(((0,a.wg)(),(0,a.j4)(E,{key:1,caption:"",class:"text-red"},null,512)),[[I,"ROCKETCHATWEBCLIENT.HINT_CONFIGS_INCORRECT"]])])])),(0,a._)("div",h,[(0,a._)("div",C,[(0,a.Wm)(T,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",loading:p.applyRequiredChangesInProgress,label:e.$t("ROCKETCHATWEBCLIENT.ACTION_APPLY_CONFIGS"),onClick:u.applyRequiredChanges,disable:p.configsRequestIsInProgress||p.configsAreCorrect},null,8,["loading","label","onClick","disable"])])])])),_:1})])),_:1})])}var p=s(9336),u=s(1427),E=s(2456);const T={name:"SystemSettings",props:{tenantId:{type:Number,default:null},hasChanges:{type:Function}},data(){return{configsRequestIsInProgress:!0,configsAreCorrect:!1,applyRequiredChangesInProgress:!1}},mounted(){this.getRocketChatSettings()},methods:{getRocketChatSettings(){this.configsRequestIsInProgress=!0;const e={};null!==this.tenantId&&(e.TenantId=this.tenantId),E.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"GetRocketChatSettings",parameters:e}).then((e=>{this.configsRequestIsInProgress=!1;const t="0"===e.Accounts_PasswordReset||!1===e.Accounts_PasswordReset,s="Disabled"===e.Accounts_RegistrationForm,a="0"===e.Iframe_Restrict_Access||!1===e.Iframe_Restrict_Access,n="1"===e.Iframe_Integration_send_enable||!0===e.Iframe_Integration_send_enable,l="1"===e.Iframe_Integration_receive_enable||!0===e.Iframe_Integration_receive_enable,i="0"===e.API_Enable_Rate_Limiter||!1===e.API_Enable_Rate_Limiter;this.configsAreCorrect=!!(t&&s&&a&&n&&l&&i)}),(e=>{this.configsRequestIsInProgress=!1}))},applyRequiredChanges(){if(this.applyRequiredChangesInProgress)return;if(this.hasChanges())return void this.$emit("attemptToApplyRequiredChanges");this.applyRequiredChangesInProgress=!0;const e={};null!==this.tenantId&&(e.TenantId=this.tenantId),E.Z.sendRequest({moduleName:"RocketChatWebclient",methodName:"ApplyRocketChatRequiredChanges",parameters:e}).then((e=>{this.applyRequiredChangesInProgress=!1,!0===e?(this.configsAreCorrect=!0,u.Z.showReport(this.$t("ROCKETCHATWEBCLIENT.REPORT_APPLY_CONFIGS_SUCCESS"))):u.Z.showError(this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS"))}),(e=>{this.applyRequiredChangesInProgress=!1,u.Z.showError(p.Z.getTextFromResponse(e,this.$t("ROCKETCHATWEBCLIENT.ERROR_APPLY_CONFIGS")))}))}}};var g=s(1639),_=s(4458),I=s(3190),R=s(3115),A=s(8879),w=s(9984),N=s.n(w);const S=(0,g.Z)(T,[["render",m]]),W=S;N()(T,"components",{QCard:_.Z,QCardSection:I.Z,QItemLabel:R.Z,QBtn:A.Z})}}]);