(self.webpackChunkangular=self.webpackChunkangular||[]).push([[869],{6869:(e,t,i)=>{"use strict";i.r(t),i.d(t,{RegionsModule:()=>J});var o=i(2057),n=i(6633),r=i(6090),s=i(7988),a=i(5551),d=i(9765),l=i(4390),g=i(4395),c=i(8002),u=i(3738),h=i(793),Z=i(9866),m=i(9699),f=i(337),p=i(3358),b=i(6355),A=i(5921);const v=["showAddEditRegionModal"],q=["deleteRegionModal"];function T(e,t){if(1&e){const e=h.EpF();h.TgZ(0,"tr"),h.TgZ(1,"th",38),h._uU(2),h.qZA(),h.TgZ(3,"td"),h._uU(4),h.qZA(),h.TgZ(5,"td"),h._uU(6),h.qZA(),h.TgZ(7,"td"),h._uU(8),h.ALo(9,"date"),h.qZA(),h.TgZ(10,"td"),h.TgZ(11,"ui-switch",39),h.NdJ("change",function(){const t=h.CHM(e).$implicit;return h.oxw().changeRegionStatus(t)})("ngModelChange",function(t){return h.CHM(e).$implicit.status=t}),h.qZA(),h.qZA(),h.TgZ(12,"td",9),h.TgZ(13,"div",40),h.TgZ(14,"button",41),h.NdJ("click",function(){const t=h.CHM(e).$implicit;return h.oxw().showAddEditModal(t)}),h._UZ(15,"i",42),h.qZA(),h.TgZ(16,"button",43),h.NdJ("click",function(){const t=h.CHM(e).$implicit;return h.oxw().showRegionDeleteModal(t)}),h._UZ(17,"i",44),h.qZA(),h.qZA(),h.qZA(),h.qZA()}if(2&e){const e=t.$implicit,i=t.index;h.xp6(2),h.Oqu(i+1),h.xp6(2),h.Oqu(e.regionName),h.xp6(2),h.Oqu(e.regionFactor),h.xp6(2),h.Oqu(h.xi3(9,5,e.createdAt,"d/M/yyyy")),h.xp6(3),h.Q6J("ngModel",e.status)}}function x(e,t){1&e&&(h.TgZ(0,"span"),h._uU(1,"Region Name Required."),h.qZA())}function F(e,t){1&e&&(h.TgZ(0,"span"),h._uU(1,'"Region" length must be at least 3 characters long.'),h.qZA())}function _(e,t){1&e&&(h.TgZ(0,"span"),h._uU(1,"This Region Already Exists, please try another one."),h.qZA())}function R(e,t){if(1&e&&(h.TgZ(0,"p",45),h.YNc(1,x,2,0,"span",46),h.YNc(2,F,2,0,"span",46),h.YNc(3,_,2,0,"span",46),h.qZA()),2&e){const e=h.oxw();h.xp6(1),h.Q6J("ngIf",e.invalidform.regionName.errors.required),h.xp6(1),h.Q6J("ngIf",e.invalidform.regionName.errors.minlength),h.xp6(1),h.Q6J("ngIf",e.invalidform.regionName.errors.regionExists)}}function U(e,t){1&e&&(h.TgZ(0,"span"),h._uU(1,"Region Name Required."),h.qZA())}function y(e,t){1&e&&(h.TgZ(0,"span"),h._uU(1,'"Factor" must be a number and it should be greater than 0 or less than equal to 10. '),h.qZA())}function N(e,t){if(1&e&&(h.TgZ(0,"p",45),h.YNc(1,U,2,0,"span",46),h.YNc(2,y,2,0,"span",46),h.qZA()),2&e){const e=h.oxw();h.xp6(1),h.Q6J("ngIf",e.invalidform.regionFactor.errors.required),h.xp6(1),h.Q6J("ngIf",e.invalidform.regionFactor.errors.min||e.invalidform.regionFactor.errors.max)}}const w=function(){return{backdrop:"static",keyboard:!1,animated:!0}},M=[{path:"",component:(()=>{class e{constructor(e,t,i,o,n,r){this.regionsService=e,this.alertService=t,this.spinner=i,this.toastr=o,this.globalService=n,this.fb=r,this.subject=new d.xQ,this.title="Manage Regions | Estimation Calculator",this.regionsInfo=new l.U,this.regionsForm=new u.cw({}),this.regionsList=[],this.checkregionExists=!1,this.datatableElement=s.G,this.dtOptions={},this.dtTrigger=new d.xQ,this.showAddEditRegionModal=a.oB,this.deleteRegionModal=a.oB,this.requiredValidation=new l.N,this.getRegionsList()}ngOnInit(){this.dtOptions={responsive:!0,scrollX:!0,scrollY:"350px",scrollCollapse:!0,columnDefs:[{targets:4,orderable:!1,searchable:!1},{targets:5,orderable:!1,searchable:!1}]},this.globalService.getPageTitle(this.title),this.subject.pipe((0,g.b)(1500)).subscribe(()=>{this.regionsInfo.regionFactor=this.regionsInfo.regionFactor&&this.regionsInfo.regionFactor>0&&this.regionsInfo.regionFactor<=10?this.regionsInfo.regionFactor:.1}),this.validationForm()}ngAfterViewInit(){this.dtTrigger.next()}validationForm(e){this.regionsForm=this.fb.group({_id:"",regionName:["",[u.kI.required,u.kI.minLength(3)],[this.regionExistValidator()]],regionFactor:[.1,[u.kI.required,u.kI.min(0),u.kI.max(10)]],status:[1]})}regionExistValidator(){return e=>{var t,i;return this.regionsService.regionAlreadyExists({regionName:e.value,_id:null===(i=null===(t=this.regionsForm)||void 0===t?void 0:t.value)||void 0===i?void 0:i._id}).pipe((0,c.U)(e=>200===e.status?{regionExists:!0}:null))}}checkvalidation(e){return this.regionsForm.get(e)&&this.regionsForm.get(e).invalid?"text-danger":"text-success"}get invalidform(){return this.regionsForm.controls}getRegionsList(){this.regionsService.getRegionsList({}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.datatableElement.dtInstance.then(t=>{t.destroy(),this.dtTrigger.next(),this.regionsList=e.data,console.log("this.regionsList",this.regionsList),this.spinner.hide()}))},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}closeModel(){this.showAddEditRegionModal.hide(),this.deleteRegionModal.hide()}showAddEditModal(e){this.alertService.clear(),this.validationForm(),e&&(this.regionsForm.value=this.regionsForm.reset(e),this.regionsForm.controls.regionName.enable()),this.showAddEditRegionModal.show()}showRegionDeleteModal(e){this.regionsInfo=e,this.deleteRegionModal.show()}addRegion(){if(this.alertService.clear(),this.regionsForm.invalid)return this.alertService.error("*Please Fill All Fields are mandatory."),!1;let e=JSON.parse(JSON.stringify(this.regionsForm.value));e._id||delete e._id,this.regionsService.saveRegionInfo(e).subscribe(e=>{200===e.status&&(this.spinner.hide(),this.toastr.success(e.message,"Success!"),e=e.data,this.closeModel(),this.getRegionsList())},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}changeRegionStatus(e){this.regionsService.saveRegionInfo({_id:e._id,status:e.status?0:1}).subscribe(e=>{if(200===e.status){e=e.data,this.spinner.hide(),this.toastr.success("Region status has been changed successfully.","Success!");let t=this.regionsList.findIndex(t=>t._id===e._id);t&&(this.regionsList[t].status=e.status)}},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}deleteRegion(){this.spinner.show(),this.regionsService.deleteRegion(this.regionsInfo).subscribe(e=>{200===e.status&&(this.closeModel(),this.spinner.hide(),this.getRegionsList(),this.toastr.success("Region deleted successfully.","Success"))},e=>{this.closeModel(),this.spinner.hide(),this.toastr.error("There are some server error.Please check connection.","Error")})}}return e.\u0275fac=function(t){return new(t||e)(h.Y36(n.EY),h.Y36(n.c9),h.Y36(Z.t2),h.Y36(m._W),h.Y36(n.Uh),h.Y36(u.qu))},e.\u0275cmp=h.Xpm({type:e,selectors:[["app-regions"]],viewQuery:function(e,t){if(1&e&&(h.Gf(s.G,5),h.Gf(v,5),h.Gf(q,5)),2&e){let e;h.iGM(e=h.CRH())&&(t.datatableElement=e.first),h.iGM(e=h.CRH())&&(t.showAddEditRegionModal=e.first),h.iGM(e=h.CRH())&&(t.deleteRegionModal=e.first)}},decls:83,vars:18,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","app-region","bg-white","py-3","dataDisplaySection"],[1,"d-flex","justify-content-end","mb-3"],[1,"btn","btn-sm","btn-primary","ms-3",3,"click"],[1,"fas","fa-plus","me-2"],["datatable","",1,"table","table-bordered","table-hover","table-striped",3,"dtOptions","dtTrigger"],[1,"text-nowrap"],[1,"text-center"],[1,"text-wrap"],[4,"ngFor","ngForOf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["showAddEditRegionModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],["id","regionsForm","role","form","novalidate","",3,"formGroup","ngSubmit"],[1,"modal-body"],[1,"row","row-xs","align-items-center","mg-b-20"],[1,"mb-3"],["for","regionName",1,"form-label"],[1,"fas","fa-star","fa-xs"],["type","text","id","regionName","placeholder","Enter Region Name","name","regionName","characterOnly","","formControlName","regionName",1,"form-control"],["class","text-danger",4,"ngIf"],["for","regionFactor",1,"form-label"],["type","text","id","regionFactor","maxlength","4","numbersOnly","","placeholder","Enter Region Factor","name","regionFactor","formControlName","regionFactor",1,"form-control"],[1,"modal-footer","border-top-0","justify-content-start"],["type","submit",1,"btn","btn-primary",3,"disabled"],["deleteRegionModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"fa","fa-trash"],[1,"modal-footer","border-top-0","d-flex","justify-content-start"],["type","button",1,"btn","btn-default","me-1",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],["scope","row"],["color","#4285F4","defaultBgColor","#d9d9d9","labelOn","Active","labelOff","Inactive",3,"ngModel","change","ngModelChange"],[1,"d-flex","justify-content-center"],["type","button",1,"btn","btn-sm","edit","me-1",3,"click"],[1,"far","fa-edit"],["type","button",1,"btn","btn-sm","delete",3,"click"],[1,"far","fa-trash-alt"],[1,"text-danger"],[4,"ngIf"]],template:function(e,t){1&e&&(h.TgZ(0,"div",0),h.TgZ(1,"div",1),h.TgZ(2,"h4",2),h._uU(3,"Manage Regions"),h.qZA(),h._UZ(4,"hr"),h.qZA(),h.qZA(),h.TgZ(5,"div",3),h.TgZ(6,"div",4),h.TgZ(7,"div"),h.TgZ(8,"button",5),h.NdJ("click",function(){return t.showAddEditModal()}),h._UZ(9,"i",6),h._uU(10,"Add New"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(11,"table",7),h.TgZ(12,"thead"),h.TgZ(13,"tr",8),h.TgZ(14,"th"),h._uU(15,"S.No"),h.qZA(),h.TgZ(16,"th"),h._uU(17,"Region Name"),h.qZA(),h.TgZ(18,"th"),h._uU(19,"Region Factor"),h.qZA(),h.TgZ(20,"th"),h._uU(21,"Created At"),h.qZA(),h.TgZ(22,"th"),h._uU(23,"Status"),h.qZA(),h.TgZ(24,"th",9),h._uU(25,"Actions"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(26,"tbody",10),h.YNc(27,T,18,8,"tr",11),h.qZA(),h.qZA(),h.qZA(),h.TgZ(28,"div",12,13),h.TgZ(30,"div",14),h.TgZ(31,"div",15),h.TgZ(32,"div",16),h.TgZ(33,"h4",17),h._uU(34),h.qZA(),h.TgZ(35,"button",18),h.NdJ("click",function(){return t.closeModel()}),h.TgZ(36,"span",19),h._uU(37,"\xd7"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(38,"form",20),h.NdJ("ngSubmit",function(){return t.addRegion()}),h.TgZ(39,"div",21),h.TgZ(40,"div",22),h.TgZ(41,"div",23),h.TgZ(42,"label",24),h._uU(43," Region Name "),h.TgZ(44,"sup"),h._UZ(45,"i",25),h.qZA(),h.qZA(),h._UZ(46,"input",26),h.YNc(47,R,4,3,"p",27),h.qZA(),h.TgZ(48,"div",23),h.TgZ(49,"label",28),h._uU(50,"Region Factor "),h.TgZ(51,"sup"),h._UZ(52,"i",25),h.qZA(),h.qZA(),h._UZ(53,"input",29),h.YNc(54,N,3,2,"p",27),h.qZA(),h.qZA(),h.qZA(),h._UZ(55,"app-alert"),h.TgZ(56,"div",30),h.TgZ(57,"button",31),h._uU(58),h.qZA(),h.qZA(),h.qZA(),h.qZA(),h.qZA(),h.qZA(),h.TgZ(59,"div",12,32),h.TgZ(61,"div",33),h.TgZ(62,"div",15),h.TgZ(63,"div",16),h.TgZ(64,"h4",17),h._UZ(65,"i",34),h._uU(66," Delete Region"),h.qZA(),h.TgZ(67,"button",18),h.NdJ("click",function(){return t.closeModel()}),h.TgZ(68,"span",19),h._uU(69,"\xd7"),h.qZA(),h.qZA(),h.qZA(),h.TgZ(70,"div",21),h.TgZ(71,"h4"),h._uU(72,"Are you sure want to delete this Region?"),h.qZA(),h.TgZ(73,"p"),h.TgZ(74,"b"),h._uU(75,"Region :"),h.qZA(),h._uU(76),h._UZ(77,"br"),h.qZA(),h.qZA(),h.TgZ(78,"div",35),h.TgZ(79,"button",36),h.NdJ("click",function(){return t.closeModel()}),h._uU(80,"Close"),h.qZA(),h.TgZ(81,"button",37),h.NdJ("click",function(){return t.deleteRegion()}),h._uU(82,"Delete"),h.qZA(),h.qZA(),h.qZA(),h.qZA(),h.qZA()),2&e&&(h.xp6(11),h.Q6J("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),h.xp6(16),h.Q6J("ngForOf",t.regionsList),h.xp6(1),h.Q6J("config",h.DdM(16,w)),h.xp6(6),h.hij("",null!=t.regionsForm&&null!=t.regionsForm.value&&t.regionsForm.value._id?"Edit":"Add"," Region"),h.xp6(4),h.Q6J("formGroup",t.regionsForm),h.xp6(6),h.Tol(t.checkvalidation("regionName")),h.xp6(3),h.Q6J("ngIf",t.invalidform.regionName.invalid&&(t.invalidform.regionName.dirty||t.invalidform.regionName.touched)),h.xp6(4),h.Tol(t.checkvalidation("regionFactor")),h.xp6(3),h.Q6J("ngIf",t.invalidform.regionFactor.invalid&&(t.invalidform.regionFactor.dirty||t.invalidform.regionFactor.touched)),h.xp6(3),h.Q6J("disabled",!t.regionsForm.valid),h.xp6(1),h.hij("",null!=t.regionsForm&&null!=t.regionsForm.value&&t.regionsForm.value._id?"Update":"Add"," "),h.xp6(1),h.Q6J("config",h.DdM(17,w)),h.xp6(17),h.hij(" ",t.regionsInfo.regionName," "))},directives:[s.G,o.sg,a.oB,u._Y,u.JL,u.sg,u.Fj,f.y,u.JJ,u.u,o.O5,u.nD,p.Y,b.w,A.o,u.On],pipes:[o.uU],styles:[""]}),e})(),pathMatch:"full"}];let I=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[r.Bz.forChild(M)],r.Bz]}),e})(),J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[o.ez,n.eY,u.UX,I]]}),e})()}}]);