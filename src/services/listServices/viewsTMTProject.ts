//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from './columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
	cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity } from './columnTypes';
	
import { IMyView, Eq, Ne, Lt, Gt, Leq, Geq, IsNull, IsNotNull, Contains } from './viewTypes';

//Standard Queries
import { queryValueCurrentUser } from './viewTypes';


import { statusChoices, defStatus }  from '../../webparts/trackMyTime7/components/TrackMyTime7';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from './columnsOOTB';

//SHARED Columns
import {Leader, Team, Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, StatusTMT, StatusNumber, StatusText,
    DueDateTMT, CompletedDateTMT, CompletedByTMT, CCList, CCEmail} from './columnsTMT';

//PROJECT columns
import { SortOrder, Everyone, Active, ActivityType, ActivityTMT, ActivtyURLCalc, OptionsTMT, OptionsTMTCalc,
    EffectiveStatus, IsOpen,
    ProjectEditOptions, HistoryTMT, TimeTarget} from './columnsTMT';
//let checks = StepChecks(0,5);  //Project

/**
 * 
export interface IViewOrder {
    f: string | IMyFieldTypes; //Static Name
    o: '+' | '-';
}

export interface IViewWhere {
    f: string | IMyFieldTypes; // Static Name
    c: '||' | '&&'; //
    o: MyOperator ; //Operator
    v: string; //Value
}

export interface IViewGroupBy {
    fields?: IViewOrder[];
    collapse?: boolean;
    limit?: number;
}
 */


export const stdViewFields = [ootbID, Active, StatusTMT, SortOrder,ootbTitle, Everyone, Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, Leader, Team];

export const testProjectView : IMyView = {

    ServerRelativeUrl: 'TestQuery',
	iFields: 	stdViewFields,
	wheres: 	[ 	{f: StatusTMT, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: Everyone, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: ootbAuthor, c:'OR', 	o: IsNull, 	v: "1" },
					{f: Leader, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: Team, 		c:'OR', 	o: Eq, 		v: queryValueCurrentUser },
				],
    orders: [ {f: ootbID, o: 'asc'}],
    groups: { fields: [
		{f: ootbAuthor, o: ''},
		{f: ootbCreated, o: 'asc'},
	],
	collapse: false, limit: 25},

};

export const projectViews : IMyView[] = [ testProjectView ];






/**  Sample schema
 * <Where>
	<And>
		<Or>
			<Or>
				<Eq>
					<FieldRef Name="Author" />
					<Value Type="Integer">
						<UserID Type="Integer" />
					</Value>
				</Eq>
				<Eq>
					<FieldRef Name="zzzApprover1" />
					<Value Type="Integer">
						<UserID Type="Integer" />
					</Value>
				</Eq>
			</Or>
			<Eq>
				<FieldRef Name="zzzApprover2" />
				<Value Type="Integer">
					<UserID Type="Integer" />
				</Value>
			</Eq>
		</Or>
		<Eq>
			<FieldRef Name="zzzEffectiveStatus" />
			<Value Type="Text">4</Value>
		</Eq>
	</And>
</Where>
<Where>
	<Or>
		<Or>
			<Or>
				<Or>
					<Eq>
						<FieldRef Name="ID" />
						<Value Type="Counter">1</Value>
					</Eq>
					<Eq>
						<FieldRef Name="Everyone" />
						<Value Type="Boolean">1</Value>
					</Eq>
				</Or>
				<IsNull>
					<FieldRef Name="Author" />
				</IsNull>
			</Or>
			<Eq>
				<FieldRef Name="Leader" />
				<Value Type="User">Clicky McClickster</Value>
			</Eq>
		</Or>
		<Eq>
			<FieldRef Name="Team" />
			<Value Type="Integer">
				<UserID Type="Integer" />
			</Value>
		</Eq>
	</Or>
</Where>
<GroupBy Collapse="TRUE" GroupLimit="30">
	<FieldRef Name="Author" />
	<FieldRef Name="Created" Ascending="FALSE" />
</GroupBy>
 */