"use strict";(globalThis["webpackChunkadmin_panel_vue_webclient"]=globalThis["webpackChunkadmin_panel_vue_webclient"]||[]).push([[4669],{4669:(e,t,a)=>{a.r(t),a.d(t,{default:()=>H});var l=a(9835),s=a(1957);const o={class:"q-pa-lg"},i={class:"row q-mb-md"},m={class:"col text-h5"},n={class:"row q-mb-md"},u={class:"col-2 q-my-sm"},g={class:"col-5"},d={key:0,class:"row q-mb-md"},h={class:"col-2 q-my-sm"},c={class:"col-5"},r={key:1,class:"row q-mb-md"},E={class:"col-2 q-my-sm"},p={class:"col-5"},L={key:2,class:"row q-mb-md"},T={class:"col-2 q-my-sm"},_={class:"col-5"},v={class:"row"},b={class:"col-2 q-my-sm"},C={class:"col-5"},N={class:"q-my-sm"},w={class:"q-pt-md text-right"};function A(e,t,a,A,q,I){const R=(0,l.up)("q-input"),O=(0,l.up)("q-select"),S=(0,l.up)("q-radio"),W=(0,l.up)("q-card-section"),B=(0,l.up)("q-card"),y=(0,l.up)("q-btn"),V=(0,l.up)("q-linear-progress"),Z=(0,l.up)("q-inner-loading"),F=(0,l.up)("q-scroll-area"),f=(0,l.Q2)("t");return(0,l.wg)(),(0,l.j4)(F,{class:"full-height full-width"},{default:(0,l.w5)((()=>[(0,l._)("div",o,[(0,l._)("div",i,[(0,l.wy)((0,l._)("div",m,null,512),[[f,"COREWEBCLIENT.HEADING_COMMON_SETTINGS"]])]),(0,l.Wm)(B,{flat:"",bordered:"",class:"card-edit-settings"},{default:(0,l.w5)((()=>[(0,l.Wm)(W,null,{default:(0,l.w5)((()=>[(0,l._)("div",n,[(0,l.wy)((0,l._)("div",u,null,512),[[f,"COREWEBCLIENT.LABEL_SITENAME"]]),(0,l._)("div",g,[(0,l.Wm)(R,{outlined:"",dense:"","bg-color":"white",modelValue:q.siteName,"onUpdate:modelValue":t[0]||(t[0]=e=>q.siteName=e),onKeyup:(0,s.D2)(I.save,["enter"])},null,8,["modelValue","onKeyup"])])]),q.themeList.length>1?((0,l.wg)(),(0,l.iD)("div",d,[(0,l.wy)((0,l._)("div",h,null,512),[[f,"COREWEBCLIENT.LABEL_THEME"]]),(0,l._)("div",c,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",modelValue:q.theme,"onUpdate:modelValue":t[1]||(t[1]=e=>q.theme=e),"emit-value":"","map-options":"",options:q.themeList,"option-label":"name"},null,8,["modelValue","options"])])])):(0,l.kq)("",!0),q.mobileThemeList.length>1?((0,l.wg)(),(0,l.iD)("div",r,[(0,l.wy)((0,l._)("div",E,null,512),[[f,"COREWEBCLIENT.LABEL_MOBILE_THEME"]]),(0,l._)("div",p,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",modelValue:q.mobileTheme,"onUpdate:modelValue":t[2]||(t[2]=e=>q.mobileTheme=e),"emit-value":"","map-options":"",options:q.mobileThemeList,"option-label":"name"},null,8,["modelValue","options"])])])):(0,l.kq)("",!0),q.languageOptions.length>1?((0,l.wg)(),(0,l.iD)("div",L,[(0,l.wy)((0,l._)("div",T,null,512),[[f,"COREWEBCLIENT.LABEL_LANGUAGE"]]),(0,l._)("div",_,[(0,l.Wm)(O,{outlined:"",dense:"","bg-color":"white",modelValue:q.language,"onUpdate:modelValue":t[3]||(t[3]=e=>q.language=e),"emit-value":"","map-options":"",options:q.languageOptions,"option-label":"name"},null,8,["modelValue","options"])])])):(0,l.kq)("",!0),(0,l._)("div",v,[(0,l.wy)((0,l._)("div",b,null,512),[[f,"COREWEBCLIENT.LABEL_TIME_FORMAT"]]),(0,l._)("div",C,[(0,l._)("div",N,[(0,l.Wm)(S,{dense:"",modelValue:q.timeFormat,"onUpdate:modelValue":t[4]||(t[4]=e=>q.timeFormat=e),val:"1",label:e.$t("COREWEBCLIENT.LABEL_TIME_FORMAT_12")},null,8,["modelValue","label"]),(0,l.Wm)(S,{class:"q-ml-md",dense:"",modelValue:q.timeFormat,"onUpdate:modelValue":t[5]||(t[5]=e=>q.timeFormat=e),val:"0",label:e.$t("COREWEBCLIENT.LABEL_TIME_FORMAT_24")},null,8,["modelValue","label"])])])])])),_:1})])),_:1}),(0,l._)("div",w,[(0,l.Wm)(y,{unelevated:"","no-caps":"",dense:"",class:"q-px-sm",ripple:!1,color:"primary",onClick:I.save,label:e.$t("COREWEBCLIENT.ACTION_SAVE")},null,8,["onClick","label"])])]),(0,l.Wm)(Z,{style:{"justify-content":"flex-start"},showing:q.saving},{default:(0,l.w5)((()=>[(0,l.Wm)(V,{query:""})])),_:1},8,["showing"])])),_:1})}a(6890);var q=a(9336),I=a(1427),R=a(2456),O=a(4409),S=a.n(O),W=a(1088);const B={name:"CommonAdminSetting",data(){return{language:"",savedLanguage:"",theme:"",mobileTheme:"",siteName:"",timeFormat:0,saving:!1,languageOptions:[],themeList:[],mobileThemeList:[],commonSettings:{},autodetectLanguage:!1}},mounted(){this.populate(),this.languageOptions=S().cloneDeep(W.Z.getLanguageList()),this.languageOptions.unshift({name:"Autodetect",value:"AutodetectLanguage"}),this.themeList=W.Z.getThemeList(),this.mobileThemeList=W.Z.getMobileThemeList()},beforeRouteLeave(e,t,a){this.$root.doBeforeRouteLeave(e,t,a)},methods:{populate(){const e=W.Z.getCommonSettingData();this.autodetectLanguage=e.autodetectLanguage,this.language=this.autodetectLanguage?"AutodetectLanguage":e.language,this.savedLanguage=this.autodetectLanguage?"AutodetectLanguage":e.language,this.theme=e.theme,this.mobileTheme=e.mobileTheme,this.siteName=e.siteName,this.timeFormat=e.timeFormat},hasChanges(){const e=W.Z.getCommonSettingData();return this.language!==this.savedLanguage||this.theme!==e.theme||this.mobileTheme!==e.mobileTheme||this.siteName!==e.siteName||this.timeFormat!==e.timeFormat},revertChanges(){this.populate()},save(){if(!this.saving){this.saving=!0;const e={Theme:this.theme,MobileTheme:this.mobileTheme,TimeFormat:this.timeFormat,SiteName:this.siteName};"AutodetectLanguage"===this.language?e.AutodetectLanguage=!0:(e.AutodetectLanguage=!1,e.Language=this.language),R.Z.sendRequest({moduleName:"Core",methodName:"UpdateSettings",parameters:e}).then((e=>{this.saving=!1,!0===e?(W.Z.saveCommonSettingData({siteName:this.siteName,theme:this.theme,mobileTheme:this.mobileTheme,language:this.language,timeFormat:this.timeFormat,autodetectLanguage:"AutodetectLanguage"===this.language}),this.populate(),I.Z.showReport(this.$t("COREWEBCLIENT.REPORT_SETTINGS_UPDATE_SUCCESS"))):I.Z.showError(this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED"))}),(e=>{this.saving=!1,I.Z.showError(q.Z.getTextFromResponse(e,this.$t("COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED")))}))}}}};var y=a(1639),V=a(6663),Z=a(4458),F=a(3190),f=a(6611),M=a(8401),k=a(1480),D=a(8879),Q=a(854),U=a(8289),G=a(9984),$=a.n(G);const x=(0,y.Z)(B,[["render",A]]),H=x;$()(B,"components",{QScrollArea:V.Z,QCard:Z.Z,QCardSection:F.Z,QInput:f.Z,QSelect:M.Z,QRadio:k.Z,QBtn:D.Z,QInnerLoading:Q.Z,QLinearProgress:U.Z})}}]);