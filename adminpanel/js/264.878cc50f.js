"use strict";(globalThis["webpackChunkadmin_panel_vue_webclient"]=globalThis["webpackChunkadmin_panel_vue_webclient"]||[]).push([[264],{264:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});var a=s(236);const i={moduleName:"Facebook",requiredModules:[],init(e){a.Z.init(e)},getAdminSystemTabs(){return[{tabName:"facebook",tabTitle:"FACEBOOK.LABEL_SETTINGS_TAB",tabRouteChildren:[{path:"facebook",component:()=>Promise.all([s.e(4736),s.e(361)]).then(s.bind(s,361))}]}]}}},236:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(4409),i=s.n(a),n=s(4089);class o{constructor(e){const t=n.Z.pObject(e.Facebook);i().isEmpty(t)||(this.displayName=n.Z.pString(t.DisplayName),this.enableModule=n.Z.pBool(t.EnableModule),this.id=n.Z.pString(t.Id),this.name=n.Z.pString(t.Name),this.scopes=n.Z.pArray(t.Scopes),this.secret=n.Z.pString(t.Secret))}saveFacebookSettings({EnableModule:e,Id:t,Scopes:s,Secret:a}){this.enableModule=e,this.id=t,this.scopes=s,this.secret=a}}let l=null;const c={init(e){l=new o(e)},saveFacebookSettings(e){l.saveFacebookSettings(e)},getFacebookSettings(){return{displayName:l.displayName,enableModule:l.enableModule,id:l.id,name:l.name,scopes:l.scopes,secret:l.secret}}}}}]);