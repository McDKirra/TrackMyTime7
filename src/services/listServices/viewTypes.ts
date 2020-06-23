
import { sp, Views, IViews, IViewInfo } from "@pnp/sp/presets/all";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from './columnTypes';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from './columnsOOTB';

export interface MyOperator {
    q: string;
    o: string;
}

export const queryValueCurrentUser = '<Value Type="Integer"><UserID Type="Integer" /></Value>';

export const Eq : MyOperator = { q:'Eq' , o: '='};
export const Ne : MyOperator = { q:'Ne' , o: '<>'};
export const Gt : MyOperator = { q:'Gt' , o: '>'};
export const Geq : MyOperator = { q:'Geq' , o: '>='};
export const Lt : MyOperator = { q:'Lt' , o: '<'};
export const Leq : MyOperator = { q:'Leq' , o: '<='};
export const IsNull : MyOperator = { q:'IsNull' , o: 'IsNull'};
export const IsNotNull : MyOperator = { q:'IsNotNull' , o: 'IsNotNull'};
export const Contains : MyOperator = { q:'Contains' , o: 'Contains'};

export interface IViewOrder {
    f: string | IBaseField | ITextField | IMultiLineTextField | INumberField | IXMLField | 
    IBooleanField | ICalculatedField | IDateTimeField | ICurrencyField | IUserField | ILookupField | IChoiceField | 
    IMultiChoiceField | IDepLookupField | ILocationField;
    o: 'asc' | 'dec' | '';
}

export interface IViewWhere {
    f: string | IBaseField | ITextField | IMultiLineTextField | INumberField | IXMLField | 
    IBooleanField | ICalculatedField | IDateTimeField | ICurrencyField | IUserField | ILookupField | IChoiceField | 
    IMultiChoiceField | IDepLookupField | ILocationField; // Static Name
    c: 'OR' | 'AND'; //
    o: MyOperator ; //Operator
    v: string; //Value
}

export interface IViewGroupBy {
    fields?: IViewOrder[];
    collapse?: boolean;
    limit?: number;
}

export type IViewField = IMyFieldTypes | string;

export interface IMyView extends Partial<IViewInfo> {
    Title?: string;
    ServerRelativeUrl: string;  //For creating views, just partial URL with no .aspx
    sFields?: string[]; //Static Names of ViewFields in array
    iFields?: IViewField[]; //Interface Objects of ViewFields in array (from columnTypes)
    wheres?: IViewWhere[];
    orders?: IViewOrder[];
    groups?: IViewGroupBy;
}
