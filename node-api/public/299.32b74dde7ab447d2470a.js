(self.webpackChunkangular=self.webpackChunkangular||[]).push([[299],{4299:(e,t,i)=>{"use strict";i.r(t),i.d(t,{BundlesModule:()=>_});var s=i(6090),n=i(5551),a=i(8525),r=i(6633),o=i(2340);class l extends r.HA{constructor(){super(...arguments),this.type=o.N.calculationType.bundle,this.filterBundlesList=[],this.timeFrameId="",this.timeFrame="",this.finalPriceWithDiscount=0}}var c=i(793),d=i(9866),g=i(9699),u=i(2057),h=i(3738),p=i(5484),f=i(337),m=i(643),v=i(6355),Z=i(2443);const b=["hourlyTemplate"],I=["saveCalculationModal"],T=["estimatorPdfModal"];function y(e,t){if(1&e&&(c.TgZ(0,"option",54),c._uU(1),c.qZA()),2&e){const e=t.$implicit;c.Q6J("ngValue",e._id),c.xp6(1),c.hij(" ",e.countryName," ")}}function A(e,t){if(1&e&&(c.TgZ(0,"option",55),c._uU(1),c.qZA()),2&e){const e=t.$implicit;c.Q6J("value",e._id),c.xp6(1),c.hij(" ",e.serviceName," ")}}function x(e,t){1&e&&(c.TgZ(0,"li",56),c._uU(1,"Please select any service."),c.qZA())}function M(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"li",56),c.TgZ(1,"input",57),c.NdJ("ngModelChange",function(t){return c.CHM(e).$implicit.isSelected=t})("ngModelChange",function(){return c.CHM(e),c.oxw().calculation()}),c.qZA(),c.TgZ(2,"label",58),c._uU(3),c.qZA(),c.qZA()}if(2&e){const e=t.$implicit,i=t.index,s=c.oxw();c.xp6(1),c.MGl("id","filterBundles",i,""),c.Q6J("ngModel",e.isSelected),c.xp6(1),c.MGl("for","filterBundles",i,""),c.xp6(1),c.AsE(" ",e.serviceBundle," - ",s.showType(e.type)," ")}}function q(e,t){if(1&e&&(c.TgZ(0,"option",54),c._uU(1),c.qZA()),2&e){const e=t.$implicit;c.Q6J("ngValue",e.id),c.xp6(1),c.hij(" ",e.label," ")}}const S=function(){return{backdrop:"static",keyboard:!1,animated:!0}},C=function(){return{isAnimated:!0,dateInputFormat:"DD/MM/YYYY",showWeekNumbers:!1,adaptivePosition:!0}};let D=(()=>{class e{constructor(e,t,i,s,a,o,c,d,g,u,h,p){this.activatedRoute=e,this.router=t,this.savedProposalService=i,this.manageService=s,this.subRegionsService=a,this.regionsService=o,this.bundlesService=c,this.jwtService=d,this.alertService=g,this.spinner=u,this.toastr=h,this.globalService=p,this.title="Bundles Calculation | Estimation Calculator",this.serviceInfo=new l,this.manageServicesList=[],this.subRegionsList=[],this.timeFrameBundleValues=[],this.typeList=[],this.Selectedbundles=[],this.requiredValidation=new r.NZ,this.saveCalculationModal=n.oB,this.estimatorPdfModal=n.oB,this.DateRange={minDate:new Date,maxDate:new Date},this.DateRange.minDate.setDate(this.DateRange.minDate.getDate()),this.DateRange.maxDate.setDate(this.DateRange.minDate.getDate()+20),this.getManageServicesList(),this.getSubRegionsList();let f=this.activatedRoute.snapshot.params.id;f&&(this.serviceInfoIdData(f),this.getRegionDetail())}ngOnInit(){this.globalService.getPageTitle(this.title),this.timeFrameBundleValues=this.jwtService.getConfig().timeFrameBundle,this.typeList=this.jwtService.getConfig().type}serviceInfoIdData(e){this.savedProposalService.getProposal({_id:e}).subscribe(e=>{200===e.status&&(e=e.data[0],this.serviceInfo=JSON.parse(e.estimationData),this.spinner.hide())},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getManageServicesList(){this.manageService.getManageServices({status:1}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.manageServicesList=e=e.data)},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getSubRegionsList(){this.subRegionsService.getSubRegionsList().subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.subRegionsList=e=e.data,this.spinner.hide())},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}getRegionDetail(e){if(e){const t=this.subRegionsList.find(t=>t._id===e);this.regionsService.getRegionsList({_id:t.regionId,status:1}).subscribe(e=>{this.spinner.show(),200===e.status&&(this.spinner.hide(),this.serviceInfo.region=(e=e.data).length?Object.assign({},...e):{}),this.calculation()},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}else this.serviceInfo.region={},this.calculation()}filterListByService(e){this.spinner.show(),e?(this.serviceInfo.selectedService=this.manageServicesList.find(t=>t._id===e),this.bundlesService.getBundlesList({serviceId:e}).subscribe(t=>{this.serviceInfo.serviceId=e,200===t.status&&(this.spinner.hide(),(t=t.data).length?(t.map(e=>{e.isSelected=!1}),this.serviceInfo.filterBundlesList=t):(this.serviceInfo.filterBundlesList=[],this.toastr.warning("There are not bundles of this service.","Warning!"))),this.calculation()},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})):(this.serviceInfo.filterBundlesList=[],this.calculation(),this.toastr.warning("Please select any service.","Warning!"))}showType(e){if(this.typeList&&this.typeList.length){let t=this.typeList.find(t=>t.value===e);return t?t.label:""}return""}onChangeofOptions(e){e&&this.timeFrameBundleValues.length&&(this.serviceInfo.timeFrame=this.timeFrameBundleValues.find(t=>t.id===e)),this.calculation()}calculation(e){e&&(this.serviceInfo.selectedService=this.manageServicesList.find(t=>e===t._id));let t=this.serviceInfo.filterBundlesList.filter(e=>e.isSelected&&2===Number(e.type)),i=this.serviceInfo.filterBundlesList.filter(e=>e.isSelected&&1===Number(e.type)),s=0,n=0;t.map(e=>s+=Number(e.servicePrice)),i.map(e=>n+=Number(e.servicePrice));const a=s*this.serviceInfo.timeFrame.label*this.serviceInfo.timeFrame.factor+n;this.serviceInfo.finalPriceWithDiscount=(a-a*this.serviceInfo.discount/100)*this.serviceInfo.currencies.currencyFactor*this.serviceInfo.region.regionFactor,this.serviceInfo.finalPriceWithDiscount=(Math.round(100*this.serviceInfo.finalPriceWithDiscount)/100).toFixed(2),this.serviceInfo.validate=this.validateForm()}validateForm(){return this.Selectedbundles=this.serviceInfo.filterBundlesList.filter(e=>e.isSelected),!!(this.serviceInfo.regionId&&this.serviceInfo.region._id&&this.serviceInfo.selectedService&&this.serviceInfo.filterBundlesList.length&&this.Selectedbundles.length&&this.serviceInfo.timeFrameId)}calculationModal(){this.alertService.clear(),this.saveCalculationModal.show()}closeModel(){this.saveCalculationModal.hide(),this.estimatorPdfModal.hide()}showCalculationInPdf(){let e=JSON.parse(JSON.stringify(this.serviceInfo));if(Object.keys(this.requiredValidation).filter(t=>!e[t]).length)return this.alertService.clear(),this.alertService.error("*Please Fill All Fields are mandatory."),this.spinner.hide(),!1;this.alertService.clear(),this.saveCalculationModal.hide(),this.estimatorPdfModal.show()}downloadAsPDF(){this.spinner.show();const e=document.getElementById("hourlyTemplate"),t=new a.ZP("p","mm","a4");t.html(e,{html2canvas:{scale:.198}}).then(()=>{t.save("download.pdf"),this.closeModel(),this.saveProposal(),this.router.navigate(["/saved-proposal"])})}saveProposal(){this.spinner.show();let e=JSON.parse(JSON.stringify(this.serviceInfo)),t={projectName:e.projectName,prospectName:e.prospectName,type:e.type,tags:e.tags,expiryDate:e.expiryDate,status:e.status,estimationData:JSON.stringify(e)};delete t.prospectName,delete t.expiryDate,this.savedProposalService.saveProposal(t).subscribe(e=>{200===e.status&&(this.spinner.hide(),this.toastr.success(e.message,"Success!"),e=e.data)},e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")})}}return e.\u0275fac=function(t){return new(t||e)(c.Y36(s.gz),c.Y36(s.F0),c.Y36(r.cC),c.Y36(r.sp),c.Y36(r.p9),c.Y36(r.EY),c.Y36(r.i6),c.Y36(r.Tj),c.Y36(r.c9),c.Y36(d.t2),c.Y36(g._W),c.Y36(r.Uh))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-bundles"]],viewQuery:function(e,t){if(1&e&&(c.Gf(b,5),c.Gf(I,5),c.Gf(T,5)),2&e){let e;c.iGM(e=c.CRH())&&(t.hourlyTemplate=e.first),c.iGM(e=c.CRH())&&(t.saveCalculationModal=e.first),c.iGM(e=c.CRH())&&(t.estimatorPdfModal=e.first)}},decls:103,vars:30,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","bg-white","py-3","dataDisplaySection"],[1,"row","g-3","mb-3"],[1,"col-lg-6"],[1,"mb-3"],["for","countryId",1,"form-label"],[3,"ngClass"],[1,"fas","fa-star","fa-xs"],["id","countryId","name","countryId",1,"form-select",3,"ngModel","ngModelChange"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["for","serviceId",1,"form-label"],["id","serviceId","name","serviceId",1,"form-select",3,"ngModel","ngModelChange","change"],[3,"value",4,"ngFor","ngForOf"],[1,"list-group"],["class","list-group-item",4,"ngIf"],["class","list-group-item",4,"ngFor","ngForOf"],["for","timeFrame",1,"form-label"],["id","timeFrame","name","timeFrame",1,"form-select",3,"ngModel","ngModelChange"],[1,"align-items-start","col-lg-6"],[3,"calculationData","callParentCalculation","calculationModal"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["saveCalculationModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"row","row-xs","align-items-center","mg-b-20"],["for","projectName",1,"form-label"],["type","text","id","projectName","placeholder","Type Here","name","projectName","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],["for","prospectName",1,"form-label"],["type","text","id","prospectName","placeholder","Type Here","name","prospectName",1,"form-control",3,"ngModel","ngModelChange"],["for","tags",1,"form-label"],["type","text","id","tags","placeholder","Type Tags Here","name","tags","characterOnly","",1,"form-control",3,"ngModel","ngModelChange"],[1,"row"],["for","expiryDate",1,"col-auto","col-form-label"],[1,"col-auto"],[1,"input-group"],["type","text","id","expiryDate","name","daterange","autocomplete","off","bsDatepicker","","placeholder","Select Date","onkeypress","return false",1,"form-control",3,"bsConfig","ngModel","minDate","maxDate","ngModelChange"],["dp","bsDatepicker"],[1,"input-group-text",3,"click"],[1,"icon-calendar"],[1,"modal-footer","border-top-0","justify-content-start"],["type","submit",1,"btn","btn-primary",3,"click"],["estimatorPdfModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable","modal-xl"],[1,"modal-body",2,"overflow","auto","max-height","555px"],[3,"calculationData"],[1,"modal-footer","border-top-0","justify-content-center"],[3,"ngValue"],[3,"value"],[1,"list-group-item"],["type","checkbox","aria-label","...",1,"form-check-input","me-1",3,"id","ngModel","ngModelChange"],[1,"form-check-label",3,"for"]],template:function(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"h4",2),c.TgZ(3,"h4"),c._uU(4,"Bundle Wise Calculation"),c.qZA(),c.qZA(),c._UZ(5,"hr"),c.qZA(),c.qZA(),c.TgZ(6,"div",3),c.TgZ(7,"div",4),c.TgZ(8,"div",5),c.TgZ(9,"div",6),c.TgZ(10,"label",7),c._uU(11,"Country "),c.TgZ(12,"sup",8),c._UZ(13,"i",9),c.qZA(),c.qZA(),c.TgZ(14,"select",10),c.NdJ("ngModelChange",function(e){return t.serviceInfo.regionId=e})("ngModelChange",function(){return t.getRegionDetail(t.serviceInfo.regionId)}),c.TgZ(15,"option",11),c._uU(16,"Select Region"),c.qZA(),c.YNc(17,y,2,2,"option",12),c.qZA(),c.qZA(),c.TgZ(18,"div",6),c.TgZ(19,"label",13),c._uU(20,"Choose Service "),c.TgZ(21,"sup",8),c._UZ(22,"i",9),c.qZA(),c.qZA(),c.TgZ(23,"select",14),c.NdJ("ngModelChange",function(e){return t.serviceInfo.serviceId=e})("change",function(){return t.filterListByService(t.serviceInfo.serviceId)}),c.TgZ(24,"option",11),c._uU(25,"Select Service"),c.qZA(),c.YNc(26,A,2,2,"option",15),c.qZA(),c.qZA(),c.TgZ(27,"div",6),c.TgZ(28,"label",13),c._uU(29,"Service Bundle "),c.TgZ(30,"sup",8),c._UZ(31,"i",9),c.qZA(),c.qZA(),c.TgZ(32,"ul",16),c.YNc(33,x,2,0,"li",17),c.YNc(34,M,4,5,"li",18),c.qZA(),c.qZA(),c.TgZ(35,"div",6),c.TgZ(36,"label",19),c._uU(37,"Time Frame "),c.TgZ(38,"sup",8),c._UZ(39,"i",9),c.qZA(),c.qZA(),c.TgZ(40,"select",20),c.NdJ("ngModelChange",function(e){return t.serviceInfo.timeFrameId=e})("ngModelChange",function(e){return t.onChangeofOptions(e)}),c.TgZ(41,"option",11),c._uU(42,"Select"),c.qZA(),c.YNc(43,q,2,2,"option",12),c.qZA(),c.qZA(),c.qZA(),c.TgZ(44,"div",21),c.TgZ(45,"app-estimator-card",22),c.NdJ("callParentCalculation",function(){return t.calculation()})("calculationModal",function(){return t.calculationModal()}),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(46,"div",23,24),c.TgZ(48,"div",25),c.TgZ(49,"div",26),c.TgZ(50,"div",27),c.TgZ(51,"h4",28),c._uU(52,"Save Calculation"),c.qZA(),c.TgZ(53,"button",29),c.NdJ("click",function(){return t.closeModel()}),c.TgZ(54,"span",30),c._uU(55,"\xd7"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(56,"div",31),c.TgZ(57,"div",32),c.TgZ(58,"div",6),c.TgZ(59,"label",33),c._uU(60," Project Name "),c.TgZ(61,"sup",8),c._UZ(62,"i",9),c.qZA(),c.qZA(),c.TgZ(63,"input",34),c.NdJ("ngModelChange",function(e){return t.serviceInfo.projectName=e}),c.qZA(),c.qZA(),c.TgZ(64,"div",6),c.TgZ(65,"label",35),c._uU(66,"Prospect Name "),c.TgZ(67,"sup",8),c._UZ(68,"i",9),c.qZA(),c.qZA(),c.TgZ(69,"input",36),c.NdJ("ngModelChange",function(e){return t.serviceInfo.prospectName=e}),c.qZA(),c.qZA(),c.TgZ(70,"div",6),c.TgZ(71,"label",37),c._uU(72," Tags "),c.TgZ(73,"sup",8),c._UZ(74,"i",9),c.qZA(),c.qZA(),c.TgZ(75,"input",38),c.NdJ("ngModelChange",function(e){return t.serviceInfo.tags=e}),c.qZA(),c.qZA(),c.qZA(),c.TgZ(76,"div",39),c.TgZ(77,"label",40),c._uU(78,"Expiry Date "),c.TgZ(79,"sup",8),c._UZ(80,"i",9),c.qZA(),c.qZA(),c.TgZ(81,"div",41),c.TgZ(82,"div",42),c.TgZ(83,"input",43,44),c.NdJ("ngModelChange",function(e){return t.serviceInfo.expiryDate=e}),c.qZA(),c.TgZ(85,"span",45),c.NdJ("click",function(){return c.CHM(e),c.MAs(84).toggle()}),c._UZ(86,"i",46),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c._UZ(87,"app-alert"),c.TgZ(88,"div",47),c.TgZ(89,"button",48),c.NdJ("click",function(){return t.showCalculationInPdf()}),c._uU(90,"Enter "),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(91,"div",23,49),c.TgZ(93,"div",50),c.TgZ(94,"div",26),c.TgZ(95,"div",51),c._UZ(96,"app-estimator-pdf",52),c.qZA(),c._UZ(97,"app-alert"),c.TgZ(98,"div",53),c.TgZ(99,"button",48),c.NdJ("click",function(){return t.downloadAsPDF()}),c._uU(100,"Save PDF "),c.qZA(),c.TgZ(101,"button",48),c.NdJ("click",function(){return t.closeModel()}),c._uU(102,"cancel "),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()}2&e&&(c.xp6(12),c.Q6J("ngClass",t.serviceInfo.regionId?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.regionId),c.xp6(3),c.Q6J("ngForOf",t.subRegionsList),c.xp6(4),c.Q6J("ngClass",t.serviceInfo.serviceId?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.serviceId),c.xp6(3),c.Q6J("ngForOf",t.manageServicesList),c.xp6(4),c.Q6J("ngClass",t.Selectedbundles.length?"text-primary":"text-danger"),c.xp6(3),c.Q6J("ngIf",!t.serviceInfo.filterBundlesList.length),c.xp6(1),c.Q6J("ngForOf",t.serviceInfo.filterBundlesList),c.xp6(4),c.Q6J("ngClass",t.serviceInfo.timeFrameId?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.timeFrameId),c.xp6(3),c.Q6J("ngForOf",t.timeFrameBundleValues),c.xp6(2),c.Q6J("calculationData",t.serviceInfo),c.xp6(1),c.Q6J("config",c.DdM(27,S)),c.xp6(15),c.Q6J("ngClass",t.serviceInfo.projectName?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.projectName),c.xp6(4),c.Q6J("ngClass",t.serviceInfo.prospectName?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.prospectName),c.xp6(4),c.Q6J("ngClass",t.serviceInfo.tags?"text-primary":"text-danger"),c.xp6(2),c.Q6J("ngModel",t.serviceInfo.tags),c.xp6(4),c.Q6J("ngClass",t.serviceInfo.expiryDate?"text-primary":"text-danger"),c.xp6(4),c.Q6J("bsConfig",c.DdM(28,C))("ngModel",t.serviceInfo.expiryDate)("minDate",t.DateRange.minDate)("maxDate",t.DateRange.maxDate),c.xp6(8),c.Q6J("config",c.DdM(29,S)),c.xp6(5),c.Q6J("calculationData",t.serviceInfo))},directives:[u.mk,h.EJ,h.JJ,h.On,h.YN,h.Kr,u.sg,u.O5,p._,n.oB,h.Fj,f.y,m.Y5,m.Np,v.w,Z.I,h.Wl],styles:[""]}),e})();const N=[{path:"",component:D,pathMatch:"full"},{path:":id",component:D,pathMatch:"full"}];let J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[s.Bz.forChild(N)],s.Bz]}),e})(),_=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[r.eY,J]]}),e})()}}]);