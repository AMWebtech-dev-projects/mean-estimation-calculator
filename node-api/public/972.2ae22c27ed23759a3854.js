(self.webpackChunkangular=self.webpackChunkangular||[]).push([[972],{972:(e,a,t)=>{"use strict";t.r(a),t.d(a,{PackagesModule:()=>S});var i=t(6090),s=t(5551),n=t(8525),o=t(6633),r=t(2340);class c extends o.HA{constructor(){super(...arguments),this.selectedPackageId="",this.selectedPackage="",this.filterPackagesList=[],this.type=r.N.calculationType.package,this.timeFrame="",this.finalPriceWithDiscount=0}}var l=t(793),g=t(9866),d=t(9699),p=t(2057),h=t(3738),u=t(5484),f=t(337),m=t(643),Z=t(6355),v=t(2443);const k=["hourlyTemplate"],I=["saveCalculationModal"],T=["estimatorPdfModal"];function b(e,a){if(1&e&&(l.TgZ(0,"option",52),l._uU(1),l.qZA()),2&e){const e=a.$implicit;l.Q6J("ngValue",e._id),l.xp6(1),l.hij(" ",e.countryName," ")}}function A(e,a){if(1&e&&(l.TgZ(0,"option",53),l._uU(1),l.qZA()),2&e){const e=a.$implicit;l.Q6J("value",e._id),l.xp6(1),l.hij(" ",e.serviceName," ")}}function M(e,a){1&e&&(l.TgZ(0,"li",54),l._uU(1,"Please select any service."),l.qZA())}function x(e,a){if(1&e){const e=l.EpF();l.TgZ(0,"li",54),l.TgZ(1,"input",55),l.NdJ("ngModelChange",function(a){return l.CHM(e),l.oxw().packageInfo.selectedPackageId=a})("ngModelChange",function(){return l.CHM(e),l.oxw().calculation()}),l.qZA(),l.TgZ(2,"label",56),l._uU(3),l.qZA(),l.qZA()}if(2&e){const e=a.$implicit,t=a.index,i=l.oxw();l.xp6(1),l.MGl("id","package_",t,""),l.Q6J("ngModel",i.packageInfo.selectedPackageId)("value",e._id),l.xp6(1),l.MGl("for","package_",t,""),l.xp6(1),l.hij(" ",e.servicePackage,"")}}const q=function(){return{backdrop:"static",keyboard:!1,animated:!0}},y=function(){return{isAnimated:!0,dateInputFormat:"DD/MM/YYYY",showWeekNumbers:!1,adaptivePosition:!0}};let P=(()=>{class e{constructor(e,a,t,i,n,r,l,g,d,p,h){this.activatedRoute=e,this.router=a,this.savedProposalService=t,this.manageService=i,this.subRegionsService=n,this.regionsService=r,this.servicePackagesService=l,this.alertService=g,this.spinner=d,this.toastr=p,this.globalService=h,this.title="Packages Calculation | Estimation Calculator",this.packageInfo=new c,this.manageServicesList=[],this.subRegionsList=[],this.servicePackagesList=[],this.requiredValidation=new o.NZ,this.saveCalculationModal=s.oB,this.estimatorPdfModal=s.oB,this.DateRange={minDate:new Date,maxDate:new Date},this.DateRange.minDate.setDate(this.DateRange.minDate.getDate()),this.DateRange.maxDate.setDate(this.DateRange.minDate.getDate()+20),this.getManageServicesList(),this.getSubRegionsList();let u=this.activatedRoute.snapshot.params.id;u&&(this.packageInfoIdData(u),this.getRegionDetail())}ngOnInit(){this.globalService.getPageTitle(this.title)}packageInfoIdData(e){this.savedProposalService.getProposal({_id:e}).subscribe(e=>{200===e.status&&(e=e.data[0],this.packageInfo=JSON.parse(e.estimationData),this.spinner.hide()),this.getSelecteditem()},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getSelecteditem(){this.radioSelected=this.packageInfo.filterPackagesList.find(e=>e._id===this.packageInfo.selectedPackage._id),this.calculation()}getManageServicesList(){this.manageService.getManageServices({status:1}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.manageServicesList=e=e.data)},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getSubRegionsList(){this.subRegionsService.getSubRegionsList().subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.subRegionsList=e=e.data,this.spinner.hide())},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getRegionDetail(e){if(e){const a=this.subRegionsList.find(a=>a._id===e);this.regionsService.getRegionsList({_id:a.regionId,status:1}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.packageInfo.region=(e=e.data).length?Object.assign({},...e):{}),this.calculation()},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}else this.packageInfo.region={},this.calculation()}filterPackagesByService(e){e?(this.packageInfo.selectedService=this.manageServicesList.find(a=>e===a._id),this.servicePackagesService.getservicePackages({serviceId:e}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),(e=e.data).length?this.packageInfo.filterPackagesList=e:(this.packageInfo.filterPackagesList=[],this.packageInfo.selectedPackage="",this.toastr.warning("There are no packages of this service.","Warning!"))),this.calculation()},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})):(this.packageInfo.filterPackagesList=[],this.packageInfo.selectedPackage="",this.calculation(),this.toastr.warning("Please select any service.","Warning!"))}calculation(e){e&&(this.packageInfo.selectedService=this.manageServicesList.find(a=>e===a._id)),this.packageInfo.selectedPackageId&&this.packageInfo.filterPackagesList.length&&(this.packageInfo.selectedPackage=this.packageInfo.filterPackagesList.find(e=>this.packageInfo.selectedPackageId===e._id)),this.packageInfo.validate=this.validateForm()}validateForm(){return!!(this.packageInfo.regionId&&this.packageInfo.region._id&&this.packageInfo.selectedPackage&&this.packageInfo.serviceId)}calculationModal(){this.alertService.clear(),this.saveCalculationModal.show()}closeModel(){this.saveCalculationModal.hide(),this.estimatorPdfModal.hide()}showCalculationInPdf(){let e=JSON.parse(JSON.stringify(this.packageInfo));if(Object.keys(this.requiredValidation).filter(a=>!e[a]).length)return this.alertService.clear(),this.alertService.error("*Please Fill All Fields are mandatory."),this.spinner.hide(),!1;this.alertService.clear(),this.saveCalculationModal.hide(),this.estimatorPdfModal.show()}downloadAsPDF(){this.spinner.show();const e=document.getElementById("hourlyTemplate"),a=new n.ZP("p","mm","a4");a.html(e,{html2canvas:{scale:.198}}).then(()=>{a.save("download.pdf"),this.closeModel(),this.saveProposal(),this.router.navigate(["/saved-proposal"])})}saveProposal(){this.spinner.show();let e=JSON.parse(JSON.stringify(this.packageInfo)),a={projectName:e.projectName,prospectName:e.prospectName,type:e.type,tags:e.tags,expiryDate:e.expiryDate,status:e.status,estimationData:JSON.stringify(e)};delete a.prospectName,delete a.expiryDate,this.savedProposalService.saveProposal(a).subscribe(e=>{200===e.status&&(this.spinner.hide(),this.toastr.success(e.message,"Success!"),e=e.data)},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}}return e.\u0275fac=function(a){return new(a||e)(l.Y36(i.gz),l.Y36(i.F0),l.Y36(o.cC),l.Y36(o.sp),l.Y36(o.p9),l.Y36(o.EY),l.Y36(o.mt),l.Y36(o.c9),l.Y36(g.t2),l.Y36(d._W),l.Y36(o.Uh))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-packages"]],viewQuery:function(e,a){if(1&e&&(l.Gf(k,5),l.Gf(I,5),l.Gf(T,5)),2&e){let e;l.iGM(e=l.CRH())&&(a.hourlyTemplate=e.first),l.iGM(e=l.CRH())&&(a.saveCalculationModal=e.first),l.iGM(e=l.CRH())&&(a.estimatorPdfModal=e.first)}},decls:94,vars:27,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","bg-white","py-3","dataDisplaySection"],[1,"row","g-3","mb-3"],[1,"col-lg-6"],[1,"mb-3"],["for","countryId",1,"form-label"],[3,"ngClass"],[1,"fas","fa-star","fa-xs"],["id","countryId","name","countryId",1,"form-select",3,"ngModel","ngModelChange"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["for","serviceId",1,"form-label"],["id","serviceId","name","serviceId",1,"form-select",3,"ngModel","ngModelChange","change"],[3,"value",4,"ngFor","ngForOf"],[1,"list-group"],["class","list-group-item",4,"ngIf"],["class","list-group-item",4,"ngFor","ngForOf"],[1,"align-items-start","col-lg-6"],[3,"calculationData","callParentCalculation","calculationModal"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["saveCalculationModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"row","row-xs","align-items-center","mg-b-20"],["for","projectName",1,"form-label"],["type","text","id","projectName","placeholder","Type Here","name","projectName","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],["for","prospectName",1,"form-label"],["type","text","id","prospectName","placeholder","Type Here","name","prospectName",1,"form-control",3,"ngModel","ngModelChange"],["for","tags",1,"form-label"],["type","text","id","tags","placeholder","Type Tags Here","name","tags","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],[1,"row"],["for","expiryDate",1,"col-auto","col-form-label"],[1,"col-auto"],[1,"input-group"],["type","text","id","expiryDate","name","daterange","autocomplete","off","bsDatepicker","","placeholder","Select Date","onkeypress","return false",1,"form-control",3,"bsConfig","ngModel","minDate","maxDate","ngModelChange"],["dp","bsDatepicker"],[1,"input-group-text",3,"click"],[1,"icon-calendar"],[1,"modal-footer","border-top-0","justify-content-start"],["type","submit",1,"btn","btn-primary",3,"click"],["estimatorPdfModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable","modal-xl"],[1,"modal-body",2,"overflow","auto","max-height","555px"],[3,"calculationData"],[1,"modal-footer","border-top-0","justify-content-center"],[3,"ngValue"],[3,"value"],[1,"list-group-item"],["type","radio","name","selectedPackage","aria-label","...",1,"form-check-input","me-1",3,"id","ngModel","value","ngModelChange"],[1,"form-check-label",3,"for"]],template:function(e,a){if(1&e){const e=l.EpF();l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"h4",2),l.TgZ(3,"h4"),l._uU(4,"Package Wise Calculation"),l.qZA(),l.qZA(),l._UZ(5,"hr"),l.qZA(),l.qZA(),l.TgZ(6,"div",3),l.TgZ(7,"div",4),l.TgZ(8,"div",5),l.TgZ(9,"div",6),l.TgZ(10,"label",7),l._uU(11,"Country "),l.TgZ(12,"sup",8),l._UZ(13,"i",9),l.qZA(),l.qZA(),l.TgZ(14,"select",10),l.NdJ("ngModelChange",function(e){return a.packageInfo.regionId=e})("ngModelChange",function(){return a.getRegionDetail(a.packageInfo.regionId)}),l.TgZ(15,"option",11),l._uU(16,"Select Region"),l.qZA(),l.YNc(17,b,2,2,"option",12),l.qZA(),l.qZA(),l.TgZ(18,"div",6),l.TgZ(19,"label",13),l._uU(20,"Choose Service "),l.TgZ(21,"sup",8),l._UZ(22,"i",9),l.qZA(),l.qZA(),l.TgZ(23,"select",14),l.NdJ("ngModelChange",function(e){return a.packageInfo.serviceId=e})("change",function(){return a.filterPackagesByService(a.packageInfo.serviceId)}),l.TgZ(24,"option",11),l._uU(25,"Select Service"),l.qZA(),l.YNc(26,A,2,2,"option",15),l.qZA(),l.qZA(),l.TgZ(27,"div",6),l.TgZ(28,"label",13),l._uU(29,"Service Packages "),l.TgZ(30,"sup",8),l._UZ(31,"i",9),l.qZA(),l.qZA(),l.TgZ(32,"ul",16),l.YNc(33,M,2,0,"li",17),l.YNc(34,x,4,5,"li",18),l.qZA(),l.qZA(),l.qZA(),l.TgZ(35,"div",19),l.TgZ(36,"app-estimator-card",20),l.NdJ("callParentCalculation",function(){return a.calculation()})("calculationModal",function(){return a.calculationModal()}),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.TgZ(37,"div",21,22),l.TgZ(39,"div",23),l.TgZ(40,"div",24),l.TgZ(41,"div",25),l.TgZ(42,"h4",26),l._uU(43,"Save Calculation"),l.qZA(),l.TgZ(44,"button",27),l.NdJ("click",function(){return a.closeModel()}),l.TgZ(45,"span",28),l._uU(46,"\xd7"),l.qZA(),l.qZA(),l.qZA(),l.TgZ(47,"div",29),l.TgZ(48,"div",30),l.TgZ(49,"div",6),l.TgZ(50,"label",31),l._uU(51," Project Name "),l.TgZ(52,"sup",8),l._UZ(53,"i",9),l.qZA(),l.qZA(),l.TgZ(54,"input",32),l.NdJ("ngModelChange",function(e){return a.packageInfo.projectName=e}),l.qZA(),l.qZA(),l.TgZ(55,"div",6),l.TgZ(56,"label",33),l._uU(57,"Prospect Name "),l.TgZ(58,"sup",8),l._UZ(59,"i",9),l.qZA(),l.qZA(),l.TgZ(60,"input",34),l.NdJ("ngModelChange",function(e){return a.packageInfo.prospectName=e}),l.qZA(),l.qZA(),l.TgZ(61,"div",6),l.TgZ(62,"label",35),l._uU(63," Tags "),l.TgZ(64,"sup",8),l._UZ(65,"i",9),l.qZA(),l.qZA(),l.TgZ(66,"input",36),l.NdJ("ngModelChange",function(e){return a.packageInfo.tags=e}),l.qZA(),l.qZA(),l.qZA(),l.TgZ(67,"div",37),l.TgZ(68,"label",38),l._uU(69,"Expiry Date "),l.TgZ(70,"sup",8),l._UZ(71,"i",9),l.qZA(),l.qZA(),l.TgZ(72,"div",39),l.TgZ(73,"div",40),l.TgZ(74,"input",41,42),l.NdJ("ngModelChange",function(e){return a.packageInfo.expiryDate=e}),l.qZA(),l.TgZ(76,"span",43),l.NdJ("click",function(){return l.CHM(e),l.MAs(75).toggle()}),l._UZ(77,"i",44),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l._UZ(78,"app-alert"),l.TgZ(79,"div",45),l.TgZ(80,"button",46),l.NdJ("click",function(){return a.showCalculationInPdf()}),l._uU(81,"Enter "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.TgZ(82,"div",21,47),l.TgZ(84,"div",48),l.TgZ(85,"div",24),l.TgZ(86,"div",49),l._UZ(87,"app-estimator-pdf",50),l.qZA(),l._UZ(88,"app-alert"),l.TgZ(89,"div",51),l.TgZ(90,"button",46),l.NdJ("click",function(){return a.downloadAsPDF()}),l._uU(91,"Save PDF "),l.qZA(),l.TgZ(92,"button",46),l.NdJ("click",function(){return a.closeModel()}),l._uU(93,"cancel "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}2&e&&(l.xp6(12),l.Q6J("ngClass",a.packageInfo.regionId?"text-primary":"text-danger"),l.xp6(2),l.Q6J("ngModel",a.packageInfo.regionId),l.xp6(3),l.Q6J("ngForOf",a.subRegionsList),l.xp6(4),l.Q6J("ngClass",a.packageInfo.serviceId?"text-primary":"text-danger"),l.xp6(2),l.Q6J("ngModel",a.packageInfo.serviceId),l.xp6(3),l.Q6J("ngForOf",a.manageServicesList),l.xp6(4),l.Q6J("ngClass",a.packageInfo.selectedPackage?"text-primary":"text-danger"),l.xp6(3),l.Q6J("ngIf",!a.packageInfo.filterPackagesList.length),l.xp6(1),l.Q6J("ngForOf",a.packageInfo.filterPackagesList),l.xp6(2),l.Q6J("calculationData",a.packageInfo),l.xp6(1),l.Q6J("config",l.DdM(24,q)),l.xp6(15),l.Q6J("ngClass",a.packageInfo.projectName?"text-primary":"text-danger"),l.xp6(2),l.Q6J("ngModel",a.packageInfo.projectName),l.xp6(4),l.Q6J("ngClass",a.packageInfo.prospectName?"text-primary":"text-danger"),l.xp6(2),l.Q6J("ngModel",a.packageInfo.prospectName),l.xp6(4),l.Q6J("ngClass",a.packageInfo.tags?"text-primary":"text-danger"),l.xp6(2),l.Q6J("ngModel",a.packageInfo.tags),l.xp6(4),l.Q6J("ngClass",a.packageInfo.expiryDate?"text-primary":"text-danger"),l.xp6(4),l.Q6J("bsConfig",l.DdM(25,y))("ngModel",a.packageInfo.expiryDate)("minDate",a.DateRange.minDate)("maxDate",a.DateRange.maxDate),l.xp6(8),l.Q6J("config",l.DdM(26,q)),l.xp6(5),l.Q6J("calculationData",a.packageInfo))},directives:[p.mk,h.EJ,h.JJ,h.On,h.YN,h.Kr,p.sg,p.O5,u._,s.oB,h.Fj,f.y,m.Y5,m.Np,Z.w,v.I,h._],styles:[""]}),e})();const D=[{path:"",component:P,pathMatch:"full"},{path:":id",component:P,pathMatch:"full"}];let C=(()=>{class e{}return e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[i.Bz.forChild(D)],i.Bz]}),e})(),S=(()=>{class e{}return e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[o.eY,C]]}),e})()}}]);