(self.webpackChunkangular=self.webpackChunkangular||[]).push([[971],{2971:(e,t,i)=>{"use strict";i.r(t),i.d(t,{SubRegionsModule:()=>M});var s=i(2057),o=i(6633),n=i(6090),r=i(7988),d=i(5551),a=i(9765);class u{constructor(){this.countryName="",this.countryCode="",this.regionId="",this.status=1}}class g{constructor(){this.countryName="",this.countryCode="",this.regionId=""}}var l=i(4390),c=i(793),h=i(9866),b=i(9699),Z=i(3738),f=i(337),p=i(6355),m=i(5921);const A=["AddEditSubRegionModal"],y=["deleteSubRegionModal"];function T(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"tr"),c.TgZ(1,"th",43),c._uU(2),c.qZA(),c.TgZ(3,"td"),c._uU(4),c.qZA(),c.TgZ(5,"td"),c._uU(6),c.qZA(),c.TgZ(7,"td"),c._uU(8),c.qZA(),c.TgZ(9,"td"),c._uU(10),c.ALo(11,"date"),c.qZA(),c.TgZ(12,"td"),c.TgZ(13,"ui-switch",44),c.NdJ("change",function(){const t=c.CHM(e).$implicit;return c.oxw().changeRegionStatus(t)})("ngModelChange",function(t){return c.CHM(e).$implicit.status=t}),c.qZA(),c.qZA(),c.TgZ(14,"td",9),c.TgZ(15,"div",45),c.TgZ(16,"button",46),c.NdJ("click",function(){const t=c.CHM(e).$implicit;return c.oxw().showAddEditModal(t)}),c._UZ(17,"i",47),c.qZA(),c.TgZ(18,"button",48),c.NdJ("click",function(){const t=c.CHM(e).$implicit;return c.oxw().subRegionDeleteModal(t)}),c._UZ(19,"i",49),c.qZA(),c.qZA(),c.qZA(),c.qZA()}if(2&e){const e=t.$implicit,i=t.index,s=c.oxw();c.xp6(2),c.Oqu(i+1),c.xp6(2),c.Oqu(e.countryName),c.xp6(2),c.Oqu(e.countryCode),c.xp6(2),c.Oqu(s.showRegionName(e.regionId)),c.xp6(2),c.Oqu(c.xi3(11,6,e.createdAt,"d/M/yyyy")),c.xp6(3),c.Q6J("ngModel",e.status)}}function q(e,t){1&e&&(c.TgZ(0,"p",50),c._uU(1," This Country Code Already Exists, please try another one. "),c.qZA())}function R(e,t){if(1&e&&(c.TgZ(0,"option",51),c._uU(1),c.qZA()),2&e){const e=t.$implicit;c.Q6J("ngValue",e._id),c.xp6(1),c.hij(" ",e.regionName," ")}}const S=function(){return{backdrop:"static",keyboard:!1,animated:!0}},x=[{path:"",component:(()=>{class e{constructor(e,t,i,s,o,n){this.subRegionsService=e,this.regionsService=t,this.alertService=i,this.spinner=s,this.toastr=o,this.globalService=n,this.title="Manage Sub-Regions | Estimation Calculator",this.regionsInfo=new l.U,this.subRegionsInfo=new u,this.subRegionsList=[],this.regionsList=[],this.countryCodeExists=!1,this.datatableElement=r.G,this.dtOptions={},this.dtTrigger=new a.xQ,this.AddEditSubRegionModal=d.oB,this.deleteSubRegionModal=d.oB,this.requiredValidation=new g,this.getRegionsList(),this.getSubRegionsList()}ngOnInit(){this.dtOptions={responsive:!0,scrollX:!0,scrollY:"350px",scrollCollapse:!0,columnDefs:[{targets:5,orderable:!1,searchable:!1},{targets:6,orderable:!1,searchable:!1}]},this.globalService.getPageTitle(this.title)}ngAfterViewInit(){this.dtTrigger.next()}getRegionsList(){this.regionsService.getRegionsList({status:1}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.regionsList=e=e.data)},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}showRegionName(e){if(this.regionsList&&this.regionsList.length){let t=this.regionsList.find(t=>t._id===e);return t?t.regionName:""}return""}getSubRegionsList(){this.subRegionsService.getSubRegionsList().subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.datatableElement.dtInstance.then(t=>{t.destroy(),this.dtTrigger.next(),this.subRegionsList=e.data,this.spinner.hide()}))},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}closeModel(){this.AddEditSubRegionModal.hide(),this.deleteSubRegionModal.hide()}showAddEditModal(e){this.alertService.clear(),this.countryCodeExists=!1,this.subRegionsInfo=e&&e._id?Object.assign({},e):new u,this.AddEditSubRegionModal.show()}subRegionDeleteModal(e){this.subRegionsInfo=e,this.deleteSubRegionModal.show()}checkvalidation(e){return Object.assign({},this.subRegionsInfo)[e]?"text-primary":"text-danger"}countryCodeExist(e){e?this.subRegionsService.countryCodeExists(e).subscribe(e=>{this.countryCodeExists=200===e.status},e=>{this.countryCodeExists=!1}):this.countryCodeExists=!1}addSubRegion(){const e=Object.keys(this.requiredValidation);let t=JSON.parse(JSON.stringify(this.subRegionsInfo));const i=e.filter(e=>!t[e]);if(this.spinner.show(),i.length||this.countryCodeExists)return this.alertService.clear(),this.alertService.error("*Please Fill All Fields are mandatory."),this.spinner.hide(),!1;let s=JSON.parse(JSON.stringify(this.subRegionsInfo));this.subRegionsService.saveSubRegionInfo(s).subscribe(e=>{200===e.status&&(this.spinner.hide(),this.toastr.success(e.message,"Success!"),e=e.data,this.closeModel(),this.getSubRegionsList())},e=>{this.closeModel(),this.spinner.hide(),this.toastr.error(e.message,"Error!")})}changeRegionStatus(e){this.subRegionsService.saveSubRegionInfo({_id:e._id,status:e.status?0:1}).subscribe(e=>{if(200===e.status){e=e.data,this.spinner.hide(),this.toastr.success("Sub Region status has been changed successfully.","Success!");let t=this.subRegionsList.findIndex(t=>t._id===e._id);t&&(this.subRegionsList[t].status=e.status)}},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}deleteSubRegion(){this.spinner.show(),this.subRegionsService.deleteSubRegion(this.subRegionsInfo).subscribe(e=>{200===e.status&&(this.closeModel(),this.spinner.hide(),this.getSubRegionsList(),this.toastr.success("Sub Region deleted successfully.","Success"))},e=>{this.closeModel(),this.spinner.hide(),this.toastr.error("There are some server error.Please check connection.","Error")})}}return e.\u0275fac=function(t){return new(t||e)(c.Y36(o.p9),c.Y36(o.EY),c.Y36(o.c9),c.Y36(h.t2),c.Y36(b._W),c.Y36(o.Uh))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-sub-regions"]],viewQuery:function(e,t){if(1&e&&(c.Gf(r.G,5),c.Gf(A,5),c.Gf(y,5)),2&e){let e;c.iGM(e=c.CRH())&&(t.datatableElement=e.first),c.iGM(e=c.CRH())&&(t.AddEditSubRegionModal=e.first),c.iGM(e=c.CRH())&&(t.deleteSubRegionModal=e.first)}},decls:92,vars:17,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","app-region","bg-white","py-3","dataDisplaySection"],[1,"d-flex","justify-content-end","mb-3"],[1,"btn","btn-sm","btn-primary","ms-3",3,"click"],[1,"fas","fa-plus","me-2"],["datatable","",1,"table","table-bordered","table-hover","table-striped",3,"dtOptions","dtTrigger"],[1,"text-nowrap"],[1,"text-center"],[1,"text-wrap"],[4,"ngFor","ngForOf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["AddEditSubRegionModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"row","row-xs","align-items-center","mg-b-20"],[1,"mb-3"],["for","countryName",1,"form-label"],[3,"ngClass"],[1,"fas","fa-star","fa-xs"],["type","text","id","countryName","placeholder","Enter Country Name","name","countryName","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-text"],["for","countryCode",1,"form-label"],["type","text","id","countryCode","placeholder","Enter Country code","name","countryCode",1,"form-control",3,"ngModel","ngModelChange"],["class","alert alert-danger mt-1 mb-0","role","alert",4,"ngIf"],["for","region",1,"form-label"],["id","region","name","region",1,"form-select",3,"ngModel","ngModelChange"],["value","","selected",""],[3,"ngValue",4,"ngFor","ngForOf"],[1,"modal-footer","border-top-0","justify-content-start"],["type","submit",1,"btn","btn-primary",3,"click"],["deleteSubRegionModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"fa","fa-trash"],[1,"modal-footer","border-top-0","d-flex","justify-content-start"],["type","button",1,"btn","btn-default","me-1",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],["scope","row"],["color","#4285F4","defaultBgColor","#d9d9d9","labelOn","Active","labelOff","Inactive",3,"ngModel","change","ngModelChange"],[1,"d-flex","justify-content-center"],["type","button",1,"btn","btn-sm","edit","me-1",3,"click"],[1,"far","fa-edit"],["type","button",1,"btn","btn-sm","delete",3,"click"],[1,"far","fa-trash-alt"],["role","alert",1,"alert","alert-danger","mt-1","mb-0"],[3,"ngValue"]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"h4",2),c._uU(3,"Manage Sub Regions"),c.qZA(),c._UZ(4,"hr"),c.qZA(),c.qZA(),c.TgZ(5,"div",3),c.TgZ(6,"div",4),c.TgZ(7,"div"),c.TgZ(8,"button",5),c.NdJ("click",function(){return t.showAddEditModal()}),c._UZ(9,"i",6),c._uU(10,"Add New"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(11,"table",7),c.TgZ(12,"thead"),c.TgZ(13,"tr",8),c.TgZ(14,"th"),c._uU(15,"S.No"),c.qZA(),c.TgZ(16,"th"),c._uU(17,"Country Name"),c.qZA(),c.TgZ(18,"th"),c._uU(19,"Country Code"),c.qZA(),c.TgZ(20,"th"),c._uU(21,"Region Name"),c.qZA(),c.TgZ(22,"th"),c._uU(23,"Created At"),c.qZA(),c.TgZ(24,"th"),c._uU(25,"Status"),c.qZA(),c.TgZ(26,"th",9),c._uU(27,"Actions"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(28,"tbody",10),c.YNc(29,T,20,9,"tr",11),c.qZA(),c.qZA(),c.qZA(),c.TgZ(30,"div",12,13),c.TgZ(32,"div",14),c.TgZ(33,"div",15),c.TgZ(34,"div",16),c.TgZ(35,"h4",17),c._uU(36),c.qZA(),c.TgZ(37,"button",18),c.NdJ("click",function(){return t.closeModel()}),c.TgZ(38,"span",19),c._uU(39,"\xd7"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(40,"div",20),c.TgZ(41,"div",21),c.TgZ(42,"div",22),c.TgZ(43,"label",23),c._uU(44," Country Name "),c.TgZ(45,"sup",24),c._UZ(46,"i",25),c.qZA(),c.qZA(),c.TgZ(47,"input",26),c.NdJ("ngModelChange",function(e){return t.subRegionsInfo.countryName=e}),c.qZA(),c.TgZ(48,"div",27),c._uU(49,'"Country Name" must be at least 3 characters long.'),c.qZA(),c.qZA(),c.TgZ(50,"div",22),c.TgZ(51,"label",28),c._uU(52,"Country Code "),c.TgZ(53,"sup",24),c._UZ(54,"i",25),c.qZA(),c.qZA(),c.TgZ(55,"input",29),c.NdJ("ngModelChange",function(e){return t.subRegionsInfo.countryCode=e})("ngModelChange",function(){return t.countryCodeExist(t.subRegionsInfo)}),c.qZA(),c.YNc(56,q,2,0,"p",30),c.qZA(),c.TgZ(57,"div",22),c.TgZ(58,"label",31),c._uU(59,"Region"),c.qZA(),c.TgZ(60,"select",32),c.NdJ("ngModelChange",function(e){return t.subRegionsInfo.regionId=e}),c.TgZ(61,"option",33),c._uU(62,"Please Select Region"),c.qZA(),c.YNc(63,R,2,2,"option",34),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c._UZ(64,"app-alert"),c.TgZ(65,"div",35),c.TgZ(66,"button",36),c.NdJ("click",function(){return t.addSubRegion()}),c._uU(67),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(68,"div",12,37),c.TgZ(70,"div",38),c.TgZ(71,"div",15),c.TgZ(72,"div",16),c.TgZ(73,"h4",17),c._UZ(74,"i",39),c._uU(75," Delete Sub Region"),c.qZA(),c.TgZ(76,"button",18),c.NdJ("click",function(){return t.closeModel()}),c.TgZ(77,"span",19),c._uU(78,"\xd7"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(79,"div",20),c.TgZ(80,"h4"),c._uU(81,"Are you sure want to delete this Sub Region?"),c.qZA(),c.TgZ(82,"p"),c.TgZ(83,"b"),c._uU(84,"Sub Region :"),c.qZA(),c._uU(85),c._UZ(86,"br"),c.qZA(),c.qZA(),c.TgZ(87,"div",40),c.TgZ(88,"button",41),c.NdJ("click",function(){return t.closeModel()}),c._uU(89,"Close"),c.qZA(),c.TgZ(90,"button",42),c.NdJ("click",function(){return t.deleteSubRegion()}),c._uU(91,"Delete"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e&&(c.xp6(11),c.Q6J("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),c.xp6(18),c.Q6J("ngForOf",t.subRegionsList),c.xp6(1),c.Q6J("config",c.DdM(15,S)),c.xp6(6),c.hij("",t.subRegionsInfo._id?"Edit":"Add"," Sub Region"),c.xp6(9),c.Q6J("ngClass",t.checkvalidation("countryName")),c.xp6(2),c.Q6J("ngModel",t.subRegionsInfo.countryName),c.xp6(6),c.Q6J("ngClass",t.checkvalidation("countryCode")),c.xp6(2),c.Q6J("ngModel",t.subRegionsInfo.countryCode),c.xp6(1),c.Q6J("ngIf",t.countryCodeExists),c.xp6(4),c.Q6J("ngModel",t.subRegionsInfo.regionId),c.xp6(3),c.Q6J("ngForOf",t.regionsList),c.xp6(4),c.hij("",t.subRegionsInfo._id?"Update":"Add"," "),c.xp6(1),c.Q6J("config",c.DdM(16,S)),c.xp6(17),c.hij(" ",t.subRegionsInfo.countryName," "))},directives:[r.G,s.sg,d.oB,s.mk,Z.Fj,f.y,Z.JJ,Z.On,s.O5,Z.EJ,Z.YN,Z.Kr,p.w,m.o],pipes:[s.uU],styles:[""]}),e})(),pathMatch:"full"}];let C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[n.Bz.forChild(x)],n.Bz]}),e})(),M=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[s.ez,o.eY,C]]}),e})()}}]);