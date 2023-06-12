(self.webpackChunkangular=self.webpackChunkangular||[]).push([[416],{3416:(e,r,t)=>{"use strict";t.r(r),t.d(r,{CurrencyModule:()=>_});var n=t(2057),c=t(6633),i=t(6090),s=t(7988),o=t(5551),a=t(9765);class u{constructor(){this.currencyName="",this.currencyFactor=.1,this.currencySymbol="",this.status=1}}class l{constructor(){this.currencyName="",this.currencyFactor="",this.currencySymbol=""}}var d=t(4395),h=t(793),g=t(9866),y=t(9699),Z=t(3738),b=t(337),f=t(3358),m=t(6355),p=t(5921);const A=["showAddEditCurrencyModal"],T=["deleteCurrencyModal"];function q(e,r){if(1&e){const e=h.EpF();h.TgZ(0,"tr"),h.TgZ(1,"th",42),h._uU(2),h.qZA(),h.TgZ(3,"td"),h._uU(4),h.qZA(),h.TgZ(5,"td"),h._uU(6),h.qZA(),h.TgZ(7,"td"),h._uU(8),h.qZA(),h.TgZ(9,"td"),h._uU(10),h.ALo(11,"date"),h.qZA(),h.TgZ(12,"td"),h.TgZ(13,"ui-switch",43),h.NdJ("change",function(){const r=h.CHM(e).$implicit;return h.oxw().changeCurrencyStatus(r)})("ngModelChange",function(r){return h.CHM(e).$implicit.status=r}),h.qZA(),h.qZA(),h.TgZ(14,"td",9),h.TgZ(15,"div",44),h.TgZ(16,"button",45),h.NdJ("click",function(){const r=h.CHM(e).$implicit;return h.oxw().showAddEditModal(r)}),h._UZ(17,"i",46),h.qZA(),h.TgZ(18,"button",47),h.NdJ("click",function(){const r=h.CHM(e).$implicit;return h.oxw().showCurrencyDeleteModal(r)}),h._UZ(19,"i",48),h.qZA(),h.qZA(),h.qZA(),h.qZA()}if(2&e){const e=r.$implicit,t=r.index;h.xp6(2),h.Oqu(t+1),h.xp6(2),h.Oqu(e.currencyName),h.xp6(2),h.Oqu(e.currencyFactor),h.xp6(2),h.Oqu(e.currencySymbol),h.xp6(2),h.Oqu(h.xi3(11,6,e.createdAt,"d/M/yyyy")),h.xp6(3),h.Q6J("ngModel",e.status)}}function C(e,r){1&e&&(h.TgZ(0,"p",49),h._uU(1," This Currency Symbol Already Exists, please try another one. "),h.qZA())}const x=function(){return{backdrop:"static",keyboard:!1,animated:!0}},M=[{path:"",component:(()=>{class e{constructor(e,r,t,n,c){this.currenciesService=e,this.alertService=r,this.spinner=t,this.toastr=n,this.globalService=c,this.subject=new a.xQ,this.title="Manage Currencies | Estimation Calculator",this.currenciesInfo=new u,this.currenciesList=[],this.currencySymbolExists=!1,this.datatableElement=s.G,this.dtOptions={},this.dtTrigger=new a.xQ,this.showAddEditCurrencyModal=o.oB,this.deleteCurrencyModal=o.oB,this.requiredValidation=new l,this.getCurrenciesList()}ngOnInit(){this.dtOptions={responsive:!0,scrollX:!0,scrollY:"350px",scrollCollapse:!0,columnDefs:[{targets:5,orderable:!1,searchable:!1},{targets:6,orderable:!1,searchable:!1}]},this.globalService.getPageTitle(this.title),this.subject.pipe((0,d.b)(1500)).subscribe(()=>{console.log("test",this.currenciesInfo),this.currenciesInfo.currencyFactor=this.currenciesInfo.currencyFactor&&this.currenciesInfo.currencyFactor>0&&this.currenciesInfo.currencyFactor<=100?this.currenciesInfo.currencyFactor:.1})}ngAfterViewInit(){this.dtTrigger.next()}getCurrenciesList(){this.currenciesService.getCurrenciesList().subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.datatableElement.dtInstance.then(r=>{r.destroy(),this.dtTrigger.next(),this.currenciesList=e.data,this.spinner.hide()}))},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}closeModel(){this.showAddEditCurrencyModal.hide(),this.deleteCurrencyModal.hide()}showAddEditModal(e){this.alertService.clear(),this.currencySymbolExists=!1,this.currenciesInfo=e&&e._id?Object.assign({},e):new u,this.showAddEditCurrencyModal.show()}showCurrencyDeleteModal(e){this.currenciesInfo=e,this.deleteCurrencyModal.show()}checkvalidation(e){return Object.assign({},this.currenciesInfo)[e]?"text-primary":"text-danger"}factorValidation(){this.subject.next()}currencySymbolExist(e){e?this.currenciesService.currencyAlreadyExists(e).subscribe(e=>{this.currencySymbolExists=200===e.status},e=>{this.currencySymbolExists=!1}):this.currencySymbolExists=!1}addCurrency(){const e=Object.keys(this.requiredValidation);let r=JSON.parse(JSON.stringify(this.currenciesInfo));const t=e.filter(e=>!r[e]);if(this.spinner.show(),t.length||this.currencySymbolExists)return this.alertService.clear(),this.alertService.error("*Please Fill All Fields are mandatory."),this.spinner.hide(),!1;let n=JSON.parse(JSON.stringify(this.currenciesInfo));this.currenciesService.saveCurrencyInfo(n).subscribe(e=>{200===e.status&&(this.spinner.hide(),this.toastr.success(e.message,"Success!"),e=e.data,this.closeModel(),this.getCurrenciesList())},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}changeCurrencyStatus(e){this.currenciesService.saveCurrencyInfo({_id:e._id,status:e.status?0:1}).subscribe(e=>{if(200===e.status){e=e.data,this.spinner.hide(),this.toastr.success("Currency status has been changed successfully.","Success!");let r=this.currenciesList.findIndex(r=>r._id===e._id);r&&(this.currenciesList[r].status=e.status)}},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}deleteCurrency(){this.spinner.show(),this.currenciesService.deleteCurrency(this.currenciesInfo).subscribe(e=>{200===e.status&&(this.closeModel(),this.spinner.hide(),this.getCurrenciesList(),this.toastr.success("Currency deleted successfully.","Success"))},e=>{this.closeModel(),this.spinner.hide(),this.toastr.error("There are some server error.Please check connection.","Error")})}}return e.\u0275fac=function(r){return new(r||e)(h.Y36(c.tw),h.Y36(c.c9),h.Y36(g.t2),h.Y36(y._W),h.Y36(c.Uh))},e.\u0275cmp=h.Xpm({type:e,selectors:[["app-currency"]],viewQuery:function(e,r){if(1&e&&(h.Gf(s.G,5),h.Gf(A,5),h.Gf(T,5)),2&e){let e;h.iGM(e=h.CRH())&&(r.datatableElement=e.first),h.iGM(e=h.CRH())&&(r.showAddEditCurrencyModal=e.first),h.iGM(e=h.CRH())&&(r.deleteCurrencyModal=e.first)}},decls:95,vars:20,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","app-currency","bg-white","py-3","dataDisplaySection"],[1,"d-flex","justify-content-end","mb-3"],[1,"btn","btn-sm","btn-primary","ms-3",3,"click"],[1,"fas","fa-plus","me-2"],["datatable","",1,"table","table-bordered","table-hover","table-striped",3,"dtOptions","dtTrigger"],[1,"text-nowrap"],[1,"text-center"],[1,"text-wrap"],[4,"ngFor","ngForOf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["showAddEditCurrencyModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"row","row-xs","align-items-center","mg-b-20"],[1,"mb-3"],["for","currencyName",1,"form-label"],[3,"ngClass"],[1,"fas","fa-star","fa-xs"],["type","text","id","currencyName","placeholder","Enter Currency Name","name","currencyName","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-text"],["for","currencyFactor",1,"form-label"],["type","text","id","currencyFactor","maxlength","4","numbersOnly","","placeholder","Enter Currency Factor","name","currencyFactor",1,"form-control",3,"ngModel","ngModelChange","keydown"],["for","currencySymbol",1,"form-label"],["type","text","id","currencySymbol","placeholder","Enter Currency Symbol","name","currencySymbol",1,"form-control",3,"ngModel","ngModelChange"],["class","alert alert-danger mt-1 mb-0","role","alert",4,"ngIf"],[1,"modal-footer","border-top-0","justify-content-start"],["type","submit",1,"btn","btn-primary",3,"click"],[3,"innerHtml"],["deleteCurrencyModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"fa","fa-trash"],[1,"modal-footer","border-top-0","d-flex","justify-content-start"],["type","button",1,"btn","btn-default","me-1",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],["scope","row"],["color","#4285F4","defaultBgColor","#d9d9d9","labelOn","Active","labelOff","Inactive",3,"ngModel","change","ngModelChange"],[1,"d-flex","justify-content-center"],["type","button",1,"btn","btn-sm","edit","me-1",3,"click"],[1,"far","fa-edit"],["type","button",1,"btn","btn-sm","delete",3,"click"],[1,"far","fa-trash-alt"],["role","alert",1,"alert","alert-danger","mt-1","mb-0"]],template:function(e,r){1&e&&(h.TgZ(0,"div",0),h.TgZ(1,"div",1),h.TgZ(2,"h4",2),h._uU(3,"Manage Currency"),h.qZA(),h._UZ(4,"hr"),h.qZA(),h.qZA(),h.TgZ(5,"div",3),h.TgZ(6,"div",4),h.TgZ(7,"div"),h.TgZ(8,"button",5),h.NdJ("click",function(){return r.showAddEditModal()}),h._UZ(9,"i",6),h._uU(10,"Add New"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(11,"table",7),h.TgZ(12,"thead"),h.TgZ(13,"tr",8),h.TgZ(14,"th"),h._uU(15,"S.No"),h.qZA(),h.TgZ(16,"th"),h._uU(17,"Currency Name"),h.qZA(),h.TgZ(18,"th"),h._uU(19,"Currency Factor"),h.qZA(),h.TgZ(20,"th"),h._uU(21,"Currency Symbol"),h.qZA(),h.TgZ(22,"th"),h._uU(23,"Created At"),h.qZA(),h.TgZ(24,"th"),h._uU(25,"Status"),h.qZA(),h.TgZ(26,"th",9),h._uU(27,"Actions"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(28,"tbody",10),h.YNc(29,q,20,9,"tr",11),h.qZA(),h.qZA(),h.qZA(),h.TgZ(30,"div",12,13),h.TgZ(32,"div",14),h.TgZ(33,"div",15),h.TgZ(34,"div",16),h.TgZ(35,"h4",17),h._uU(36),h.qZA(),h.TgZ(37,"button",18),h.NdJ("click",function(){return r.closeModel()}),h.TgZ(38,"span",19),h._uU(39,"\xd7"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(40,"div",20),h.TgZ(41,"div",21),h.TgZ(42,"div",22),h.TgZ(43,"label",23),h._uU(44," Currency Name "),h.TgZ(45,"sup",24),h._UZ(46,"i",25),h.qZA(),h.qZA(),h.TgZ(47,"input",26),h.NdJ("ngModelChange",function(e){return r.currenciesInfo.currencyName=e}),h.qZA(),h.TgZ(48,"div",27),h._uU(49,'"Currency Name" length must be at least 2 characters long'),h.qZA(),h.qZA(),h.TgZ(50,"div",22),h.TgZ(51,"label",28),h._uU(52,"Currency Factor "),h.TgZ(53,"sup",24),h._UZ(54,"i",25),h.qZA(),h.qZA(),h.TgZ(55,"input",29),h.NdJ("ngModelChange",function(e){return r.currenciesInfo.currencyFactor=e})("keydown",function(){return r.factorValidation()}),h.qZA(),h.TgZ(56,"div",27),h._uU(57,'"Factor" must be a number and it should be greater than 0 or less than equal to 1000. '),h.qZA(),h.qZA(),h.TgZ(58,"div",22),h.TgZ(59,"label",30),h._uU(60," Currency Symbol "),h.TgZ(61,"sup",24),h._UZ(62,"i",25),h.qZA(),h.qZA(),h.TgZ(63,"input",31),h.NdJ("ngModelChange",function(e){return r.currenciesInfo.currencySymbol=e})("ngModelChange",function(){return r.currencySymbolExist(r.currenciesInfo)}),h.qZA(),h.YNc(64,C,2,0,"p",32),h.qZA(),h.qZA(),h.qZA(),h._UZ(65,"app-alert"),h.TgZ(66,"div",33),h.TgZ(67,"button",34),h.NdJ("click",function(){return r.addCurrency()}),h._uU(68),h.qZA(),h.qZA(),h._UZ(69,"pre",35),h.ALo(70,"json"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(71,"div",12,36),h.TgZ(73,"div",37),h.TgZ(74,"div",15),h.TgZ(75,"div",16),h.TgZ(76,"h4",17),h._UZ(77,"i",38),h._uU(78," Delete Currency"),h.qZA(),h.TgZ(79,"button",18),h.NdJ("click",function(){return r.closeModel()}),h.TgZ(80,"span",19),h._uU(81,"\xd7"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(82,"div",20),h.TgZ(83,"h4"),h._uU(84,"Are you sure want to delete this Currency?"),h.qZA(),h.TgZ(85,"p"),h.TgZ(86,"b"),h._uU(87,"Currency :"),h.qZA(),h._uU(88),h._UZ(89,"br"),h.qZA(),h.qZA(),h.TgZ(90,"div",39),h.TgZ(91,"button",40),h.NdJ("click",function(){return r.closeModel()}),h._uU(92,"Close"),h.qZA(),h.TgZ(93,"button",41),h.NdJ("click",function(){return r.deleteCurrency()}),h._uU(94,"Delete"),h.qZA(),h.qZA(),h.qZA(),h.qZA(),h.qZA()),2&e&&(h.xp6(11),h.Q6J("dtOptions",r.dtOptions)("dtTrigger",r.dtTrigger),h.xp6(18),h.Q6J("ngForOf",r.currenciesList),h.xp6(1),h.Q6J("config",h.DdM(18,x)),h.xp6(6),h.hij("",r.currenciesInfo._id?"Edit":"Add"," Currency"),h.xp6(9),h.Q6J("ngClass",r.checkvalidation("currencyName")),h.xp6(2),h.Q6J("ngModel",r.currenciesInfo.currencyName),h.xp6(6),h.Q6J("ngClass",r.checkvalidation("currencyFactor")),h.xp6(2),h.Q6J("ngModel",r.currenciesInfo.currencyFactor),h.xp6(6),h.Q6J("ngClass",r.checkvalidation("currencySymbol")),h.xp6(2),h.Q6J("ngModel",r.currenciesInfo.currencySymbol),h.xp6(1),h.Q6J("ngIf",r.currencySymbolExists),h.xp6(4),h.hij("",r.currenciesInfo._id?"Update":"Add"," "),h.xp6(1),h.Q6J("innerHtml",h.lcZ(70,16,r.currenciesInfo),h.oJD),h.xp6(2),h.Q6J("config",h.DdM(19,x)),h.xp6(17),h.hij(" ",r.currenciesInfo.currencyName," "))},directives:[s.G,n.sg,o.oB,n.mk,Z.Fj,b.y,Z.JJ,Z.On,Z.nD,f.Y,n.O5,m.w,p.o],pipes:[n.Ts,n.uU],styles:[""]}),e})(),pathMatch:"full"}];let v=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[i.Bz.forChild(M)],i.Bz]}),e})(),_=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[n.ez,c.eY,v]]}),e})()}}]);