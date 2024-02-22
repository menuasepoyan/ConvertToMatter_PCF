import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './appConfig';
import IButtonProperty from './IButtonProperty';

export class converttomatter implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container:HTMLDivElement;
	private _context:ComponentFramework.Context<IInputs>;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._container = container;
		this._context = context;
	
		this.renderComponent(context);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._context = context;
	
		this.renderComponent(context);
	}

	public ConvertToMatter(){	
		var matterData={};
		var intakeId = this._context.parameters.EntityRecordId.raw;
		const entityTypeName = (this._context.mode as any).contextInfo.entityTypeName;
	
		if (entityTypeName == "lt_intake") {
			// @ts-ignore
			var matterType = Xrm.Page.getAttribute("lt_mattertype").getValue();
			// @ts-ignore
			var intaketype = Xrm.Page.getAttribute("lt_intaketype").getValue();
			// @ts-ignore
			var requester = Xrm.Page.getAttribute("lt_requester").getValue();
			if (requester) {
				requester = requester[0].id.replace(/[{}]/g, "")
			}
	
			// @ts-ignore
			var counterPartyCompany = Xrm.Page.getAttribute("lt_counterpartycompany").getValue();
			if (counterPartyCompany) {
				counterPartyCompany = counterPartyCompany[0].id.replace(/[{}]/g, "")
			}
	
			// @ts-ignore
			var counterPartyContact = Xrm.Page.getAttribute("lt_counterpartycontact").getValue();
			if (counterPartyContact) {
				counterPartyContact = counterPartyContact[0].id.replace(/[{}]/g, "")
			}
	
			// @ts-ignore
			var entityref = Xrm.Page.getAttribute("lt_entity").getValue();
			if (entityref) {
				entityref = entityref[0].id.replace(/[{}]/g, "")
			}
	
			// @ts-ignore
			var premiselocation = Xrm.Page.getAttribute("lt_premiselocation").getValue();
			if (premiselocation) {
				premiselocation = premiselocation[0].id.replace(/[{}]/g, "")
			}
			
			if (matterType == 692340000) {
				matterData = {
					// @ts-ignore
					"lt_mattername": Xrm.Page.getAttribute("lt_name").getValue(),
					"lt_comm_mattertype": 206420005,
					// @ts-ignore
					"lt_cont_typeofcontract": Xrm.Page.getAttribute("lt_contracttype").getValue(),
					"lt_Comm_InternalContactRequester@odata.bind": "/contacts(" + requester + ")",
					// @ts-ignore
					"lt_cont_commentsbyrequester": Xrm.Page.getAttribute("lt_notes").getValue(),
					// @ts-ignore
					"lt_cont_deadlinedate": Xrm.Page.getAttribute("lt_duedate").getValue(),
					"lt_OriginatingIntake@odata.bind": "/lt_intakes(" + intakeId + ")"
				}
			}
			else if (matterType == 692340001)
			{
				matterData = {
					// @ts-ignore
					"lt_mattername": Xrm.Page.getAttribute("lt_name").getValue(),
					"lt_comm_mattertype": 206420003,
					// @ts-ignore
					"lt_Comm_InternalContactRequester@odata.bind": "/contacts(" + requester + ")",
					"lt_Prop_Entity@odata.bind": "/accounts(" + entityref + ")",
					"lt_Location@odata.bind": "/lt_addresses(" + premiselocation + ")",
					// @ts-ignore
					"lt_prop_leaseopendate": Xrm.Page.getAttribute("lt_duedate").getValue(),
	
					// @ts-ignore
					"lt_cont_commentsbyrequester": Xrm.Page.getAttribute("lt_notes").getValue(),
					// @ts-ignore
					"lt_OriginatingIntake@odata.bind": "/lt_intakes(" + intakeId + ")"
				}
			}
			else if (matterType == 206420002) {
				matterData = {
					// @ts-ignore
					"lt_mattername": Xrm.Page.getAttribute("lt_name").getValue(),
					"lt_comm_mattertype": 206420001,
					// @ts-ignore
					"lt_cont_typeofcontract": Xrm.Page.getAttribute("lt_contracttype").getValue(),
					"lt_Comm_InternalContactRequester@odata.bind": "/contacts(" + requester + ")",
					"lt_Comm_CounterpartyCompany@odata.bind": "/accounts(" + counterPartyCompany + ")",
					"lt_Cont_CounterpartyContact@odata.bind": "/contacts(" + counterPartyContact + ")",
					// @ts-ignore
					"lt_cont_commentsbyrequester": Xrm.Page.getAttribute("lt_notes").getValue(),
					// @ts-ignore
					"lt_cont_deadlinedate": Xrm.Page.getAttribute("lt_duedate").getValue(),
					"lt_OriginatingIntake@odata.bind": "/lt_intakes(" + intakeId + ")",
					// @ts-ignore
					"lt_cont_contractvalue":Xrm.Page.getAttribute("lt_contractvalue").getValue(),
				//	"lt_jobtype":1
				}
			}
		}
		else if (entityTypeName == "lt_claim")
		{
			matterData = {  
			// @ts-ignore
				"lt_mattername": Xrm.Page.getAttribute("lt_name").getValue(),  
				"lt_comm_mattertype": 692340001,
				"lt_Claim@odata.bind": "/lt_claims("+ intakeId +")"								
			}  
		}
		// @ts-ignore
			Xrm.WebApi.createRecord("lt_matter", matterData).then(  
			// @ts-ignore
				function success(result) {  
					var matterId = result.id;  				
					
					if (entityTypeName == "lt_claim")
					{
						// @ts-ignore
						Xrm.Page.getAttribute("lt_claimstatus").setValue(3);
					}
					// @ts-ignore
					Xrm.Page.data.save();			
					var entityFormOptions ={};
						entityFormOptions = {  
							"entityName": "lt_matter",
							"entityId" : matterId.replace(/[{}]/g, ""),
							"openInNewWindow" : false
						}
		
						
						// @ts-ignore
						Xrm.Navigation.openForm(entityFormOptions);
				},  
				// @ts-ignore
				function(error) {  
					alert("Error: " + error.message);  
				}  
			);
			// @ts-ignore
			Xrm.Page.data.save();			
		}

		private renderComponent(context: ComponentFramework.Context<IInputs>){

			let buttonsProperies = Array<IButtonProperty>();
			
			if(context.parameters.ConvertToMatterButton.raw != null)
				buttonsProperies.push(this.parsePropertyButtonToJson(context.parameters.ConvertToMatterButton.raw.toString()))
		
			let type = context.parameters.buttonType.raw
			let showDescription = context.parameters.showButtonDescription.raw  == "Yes";
			ReactDOM.render(
				React.createElement(
					App,
					{ 
						type, 
						enable: true,
						elements: buttonsProperies, 
						buttonSize: context.parameters.buttonSize.raw, 
						ConvertToMatter: this.ConvertToMatter.bind(this), 
						showDescription
					}
				),
				this._container
			)
		}
	
		private  parsePropertyButtonToJson(property:string): IButtonProperty{
			try {
				return JSON.parse(property) as IButtonProperty;
			} catch (error) {
				let button : IButtonProperty ={
					icon:"Picture",
					title:"json error",					
					background:"#e93a1e"
				}
				return button;
			}
		}
	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
